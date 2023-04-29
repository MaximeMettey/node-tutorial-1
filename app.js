const path = require('node:path');
const os = require('node:os');
const logger = require('./logger');

// First function
function sayHello(name) {
    console.log('Hello ' + name + '!');
}

sayHello('Maxime');

// Use logger module
logger('Welcome');

// Use path module
var pathObj = path.parse(__filename);
console.log(pathObj.dir);

// Use OS module
var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);