const path = require('node:path');
const logger = require('./logger');

function sayHello(name) {
    console.log('Hello ' + name + '!');
}

sayHello('Maxime');
logger('Welcome');

var pathObj = path.parse(__filename);
console.log(pathObj);