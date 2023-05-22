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

const routes = {
    sample: samplehandler,
};

module.exports = routes;
