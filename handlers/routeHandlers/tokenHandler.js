/*
------------------------
 * Title: Token Handler
 * Description: Handler to handle token related routes
 * Author: Abdul Aziz
 * Date: 25/05/2023
------------------------
 */

// dependencies
const data = require('../../lib/data');
const { hash } = require('../../helpers/utilities');
const { createRandomString } = require('../../helpers/utilities');
const { parseJSON } = require('../../helpers/utilities');

// module scaffolding
const handler = {};

handler.tokenHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._token[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

// to handle token
handler._token = {};

handler._token.post = (requestProperties, callback) => {
    const phone =
        typeof requestProperties.body.phone === 'string' &&
        requestProperties.body.phone.trim().length === 11
            ? requestProperties.body.phone
            : false;

    const password =
        typeof requestProperties.body.password === 'string' &&
        requestProperties.body.password.length > 0
            ? requestProperties.body.password
            : false;
    if (phone && password) {
        data.read('users', phone, (err1, userData) => {
            const hashedpassword = hash(password);
            if (hashedpassword === parseJSON(userData).password) {
                const tokenId = createRandomString(20);
                const expires = Date.now() + 60 * 60 * 1000;
                const tokenObject = {
                    phone,
                    id: tokenId,
                    expires,
                };

                // store the token
                data.create('tokens', tokenId, tokenObject, (err2) => {
                    if (!err2) {
                        callback(200, tokenObject);
                    } else {
                        callback(500, { error: 'There was a server side problem' });
                    }
                });
            } else {
                callback(400, { error: 'Password is not valid' });
            }
        });
    } else {
        callback(400, { error: 'You have problem in your request!' });
    }
};

handler._token.get = (requestProperties, callback) => {
    const id =
        typeof requestProperties.queryStringObject.id === 'string' &&
        requestProperties.queryStringObject.id.trim().length === 20
            ? requestProperties.queryStringObject.id
            : false;
    if (id) {
        data.read('tokens', id, (err, tokenData) => {
            const tokenObject = { ...parseJSON(tokenData) };
            if (!err && tokenObject) {
                callback(200, tokenObject);
            } else {
                callback(404, { error: 'Requested token is not found' });
            }
        });
    } else {
        callback(404, { error: 'Requested user is not found' });
    }
};

handler._token.put = (requestProperties, callback) => {
    const id =
        typeof requestProperties.body.id === 'string' &&
        requestProperties.body.id.trim().length === 20
            ? requestProperties.body.id
            : false;
    const extend =
        typeof requestProperties.body.extend === 'boolean' && requestProperties.body.extend === true
            ? requestProperties.body.extend
            : false;
    if (id && extend) {
        data.read('tokens', id, (err, tokenData) => {
            const tokenObject = parseJSON(tokenData);
            if (tokenObject.expires > Date.now()) {
                tokenObject.expires = Date.now() + 60 * 60 * 1000;
                data.update('tokens', id, tokenObject, (err2) => {
                    if (!err2) {
                        callback(200, { message: 'Token updated successfully!' });
                    } else {
                        callback(500, { error: 'There was a server side error!' });
                    }
                });
            } else {
                callback(404, { error: 'Token already expired!' });
            }
        });
    } else {
        callback(404, { error: 'There was a problem in your request' });
    }
};

handler._token.delete = (requestProperties, callback) => {
    const id =
        typeof requestProperties.queryStringObject.id === 'string' &&
        requestProperties.queryStringObject.id.trim().length === 20
            ? requestProperties.queryStringObject.id
            : false;

    if (id) {
        // lookup the user
        data.read('tokens', id, (err, tokenData) => {
            if (!err && tokenData) {
                data.delete('tokens', id, (err2) => {
                    if (!err2) {
                        callback(200, { error: 'Token has been deleted' });
                    } else {
                        callback(500, { error: 'There was a server side error' });
                    }
                });
            } else {
                callback(500, { error: 'There was a server side error' });
            }
        });
    } else {
        callback(400, { error: 'There was a problem in your  request' });
    }
};

handler._token.verify = (id, phone, callback) => {
    data.read('tokens', id, (err, tokenData) => {
        if (!err && tokenData) {
            if (parseJSON(tokenData).phone === phone && parseJSON(tokenData).expires > Date.now()) {
                callback(true);
            } else callback(false);
        } else {
            callback(false);
        }
    });
};

module.exports = handler;
