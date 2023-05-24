/*
------------------------
 * Title: Routes
 * Description: Application Routes
 * Author: Abdul Aziz
 * Date: 22/05/2023
------------------------
 */

// dependencies
const { samplehandler } = require('./handlers/routeHandlers/sampleHandlers');
const { userhandler } = require('./handlers/routeHandlers/userHandler');

const routes = {
    sample: samplehandler,
    user: userhandler,
};

// exporting module
module.exports = routes;
