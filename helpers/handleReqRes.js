/*
------------------------
 * Title: Handle Request Response
 * Description: Handle Request and response
 * Author:Abdul Aziz
 * Date:22/05/2023
------------------------
 */

// dependencies
const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../routes');
const { notFoundHandler } = require('../handlers/routeHandlers/notFoundHandler');

// module scaffolidng
const handler = {};
handler.handleReqRes = (req, res) => {
    // get the full url with variables
    const parsedUrl = url.parse(req.url, true);

    // get pathname (example: about-us in www.wiki.com/about-us)
    const path = parsedUrl.pathname;

    // get the trimmed path without unnecessary characters
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // type of method (exaple: GET/POST)
    const method = req.method.toLowerCase();

    // variables in url as object
    const queryStringObject = parsedUrl.query;

    // Header or MetaData
    const headersObject = req.headers;

    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headersObject,
    };
    const decoder = new StringDecoder('utf-8');
    let realData = '';

    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();

        chosenHandler(requestProperties, (receivedStatusCode, receivedPayload) => {
            const statusCode = typeof receivedStatusCode === 'number' ? receivedStatusCode : 500;
            const payload = typeof receivedPayload === 'object' ? receivedPayload : {};

            const payloadString = JSON.stringify(payload);

            // return the final response
            res.writeHead(statusCode);
            res.end(payloadString);
        });

        res.end('Hello World');
    });
};

module.exports = handler;
