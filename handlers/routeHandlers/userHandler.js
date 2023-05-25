/*
------------------------
 * Title: User Handler
 * Description: Handler to handle user related routes
 * Author: Abdul Aziz
 * Date: 24/05/2023
------------------------
 */

// dependencies
const data = require('../../lib/data');
const { hash } = require('../../helpers/utilities');
const { parseJSON } = require('../../helpers/utilities');
// module scaffolding
const handler = {};

handler.userhandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._users[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

// to handle user
handler._users = {};

handler._users.post = (requestProperties, callback) => {
    const firstName =
        typeof requestProperties.body.firstName === 'string' &&
        requestProperties.body.firstName.trim().length > 0
            ? requestProperties.body.firstName
            : false;

    const lastName =
        typeof requestProperties.body.lastName === 'string' &&
        requestProperties.body.lastName.trim().length > 0
            ? requestProperties.body.lastName
            : false;

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

    const tosAgreement =
        typeof requestProperties.body.tosAgreement === 'boolean' &&
        requestProperties.body.tosAgreement
            ? requestProperties.body.tosAgreement
            : false;

    if (firstName && lastName && phone && password && tosAgreement) {
        // make surer that the user doesn't already exists
        data.read('users', phone, (err, user) => {
            if (err) {
                const userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    tosAgreement,
                };

                // store the user to db
                data.create('users', phone, userObject, (err2) => {
                    if (!err2) {
                        callback(200, { message: 'User was created successfully' });
                    } else {
                        callback(500, { error: 'Could not create new user!' });
                    }
                });
            } else {
                callback(500, {
                    error: 'There was a problem in server side!',
                });
            }
        });
    } else {
        callback(400, {
            error: 'You have a problem in your request!',
        });
    }
};

handler._users.get = (requestProperties, callback) => {
    const phone =
        typeof requestProperties.queryStringObject.phone === 'string' &&
        requestProperties.queryStringObject.phone.trim().length === 11
            ? requestProperties.queryStringObject.phone
            : false;

    if (phone) {
        // lookup the user
        data.read('users', phone, (err, u) => {
            const user = { ...parseJSON(u) };

            if (!err && user) {
                delete user.password;

                console.log(user);
                callback(200, user);
            } else {
                callback(404, { error: 'Requested user not found!' });
            }
        });
    } else {
        callback(404, { error: 'Requested user not found!' });
    }
};

handler._users.put = (requestProperties, callback) => {
    const firstName =
        typeof requestProperties.body.firstName === 'string' &&
        requestProperties.body.firstName.trim().length > 0
            ? requestProperties.body.firstName
            : false;

    const lastName =
        typeof requestProperties.body.lastName === 'string' &&
        requestProperties.body.lastName.trim().length > 0
            ? requestProperties.body.lastName
            : false;

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

    if (phone) {
        if (firstName || lastName || password) {
            // lookup the user
            data.read('users', phone, (err, uData) => {
                const userData = { ...parseJSON(uData) };
                console.log(userData);
                if (!err && userData) {
                    if (firstName) {
                        userData.firstName = firstName;
                    }
                    if (lastName) {
                        userData.lastName = lastName;
                    }
                    if (password) {
                        userData.password = hash(password);
                    }

                    // store to database
                    data.update('users', phone, userData, (err2) => {
                        if (!err2) {
                            callback(200, { error: 'User was updated successfully!' });
                        } else {
                            callback(50, { error: 'You have problem in server side' });
                        }
                    });
                } else {
                    callback(404, { error: 'You have problem in your request!' });
                }
            });
        } else {
            callback(400, { error: 'You have problem in your request!' });
        }
    } else {
        callback(400, { error: 'Invalid phone number' });
    }
};

handler._users.delete = (requestProperties, callback) => {};

module.exports = handler;
