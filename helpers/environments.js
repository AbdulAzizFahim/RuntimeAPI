/*
------------------------
 * Title: Environments
 * Description: Handle all environments related things
 * Author: Abdul Aziz
 * Date: 22/05/2022
------------------------
 */

// module scaffolding
const environments = {};

environments.staging = {
    port: 3000,
    envName: 'staging',
    secretKey: '2aslJSao3jgsd0saj',
};

environments.production = {
    port: 5000,
    envName: 'production',
    secretKey: 'lgtuL2L23i510Oss0',
};

// determine which environment was passed
const currentEnvironment =
    typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'staging';

// export corresponding environment object
const environmentToExport =
    typeof environments[currentEnvironment] === 'object'
        ? environments[currentEnvironment]
        : environments.staging;

// export module
module.exports = environmentToExport;
