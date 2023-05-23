/*
------------------------
 * Title: Uptime Monitoring Application
 * Description: A RESTFul API to monitor up or down time of user defined links
 * Author: Abdul Aziz
 * Date: 19/05/2023
------------------------
 */

// dependencies
const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const { handleReqRes } = require('./helpers/handleReqRes');
const environment = require('./helpers/environments');
const data = require('./lib/data');

// app object - module scaffolding
const app = {};

// testing file system
// data.create('test', 'newFile', { name: 'Bangladesh', language: 'Bangla' }, (err) => {
//     console.log('error was', err);
// });

// data.read('test', 'newFile', (err, readData) => {
//     console.log(err, readData);
// });

// data.update('test', 'newFile', { name: 'England', language: 'English' }, (err) => {
//     console.log(err);
// });

// data.delete('test', 'newFile', { name: 'England', language: 'English' }, (err) => {
//     console.log(err);
// });

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);

    server.listen(environment.port, () => {
        console.log(`listening to port ${environment.port}`);
    });
};

// handle Request Response
app.handleReqRes = handleReqRes;

// start the server
app.createServer();
