/*
------------------------
 * Title: Utilities
 * Description: Important utility functions
 * Author: Abdul Aziz
 * Date: 24/05/2022
------------------------
 */

// dependencies
const crypto = require('crypto');
const environments = require('./environments');

// module scaffolding
const utilities = {};

// parse JSON string to object
utilities.parseJSON = (jsonString) => {
    let output;

    try {
        output = JSON.parse(jsonString);
    } catch {
        output = {};
    }
    return output;
};

// hashing the string
utilities.hash = (str) => {
    if (typeof str === 'string' && str.length > 0) {
        const hash = crypto.createHmac('sha256', environments.secretKey).update(str).digest('hex');
        return hash;
    }

    return false;
};

// export module
module.exports = utilities;
