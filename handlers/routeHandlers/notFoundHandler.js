/*
------------------------
 * Title: Not Found Handler
 * Description:404 Not FOund Handler
 * Author: Abdul Aziz
 * Date: 22/05/2023
------------------------
 */
// module scaffolding
const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
    callback(404, {
        message: 'Your requested url was not Found',
    });
};

module.exports = handler;
