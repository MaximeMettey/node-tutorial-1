const logger = require('./logger');

function sayHello(name) {
    console.log('Hello ' + name + '!');
}

sayHello('Maxime');

logger('Welcome.');