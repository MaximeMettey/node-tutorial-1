const logger = require('./logger');

function sayHello(name) {
    console.log('Hello ' + name + '!');
}

sayHello('Maxime');

console.log(logger);

logger.log('message');