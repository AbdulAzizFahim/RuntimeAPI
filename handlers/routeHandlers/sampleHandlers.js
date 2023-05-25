/*
------------------------
 * Title: Sample Handler
 * Description:Sample Handler
 * Author: Abdul Aziz
 * Date: 22/05/2023
------------------------
 */
// module scaffolding
const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
    callback(200, {
        message: 'This is a sample url',
    });
};

module.exports = handler;
