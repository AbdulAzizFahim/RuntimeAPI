/*
------------------------
 * Title: Routes
 * Description: Application Routes
 * Author: Abdul Aziz
 * Date: 22/05/2023
------------------------
 */

// dependencies
const { sampleHandler } = require('./handlers/routeHandlers/sampleHandlers');
const { userHandler } = require('./handlers/routeHandlers/userHandler');
const { tokenHandler } = require('./handlers/routeHandlers/tokenHandler');

const routes = {
    sample: sampleHandler,
    user: userHandler,
    token: tokenHandler,
};

// exporting module
module.exports = routes;
