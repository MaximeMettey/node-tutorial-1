const path = require('node:path');
const os = require('node:os');
const fs = require('node:fs');
const EventEmitter = require('node:events');
const http = require ('node:http');

const log = require('./log');
const Logger = require('./logger');
const logger = new Logger();

// First function
function sayHello(name) {
    console.log('Hello ' + name + '!');
}

sayHello('Maxime');

// Use logger module
log('Welcome');

// Use path module
var pathObj = path.parse(__filename);
console.log(pathObj.dir);

// Use OS module
var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);

// File System module
// Synchronous
const files = fs.readdirSync('./');
console.log(files);

// Asynchronous
fs.readdir('./', (err, files) => {
    if(err) console.log('Error:', err);
    else console.log('Result:', files);
});

// Events module
const emitter = new EventEmitter();

// Register an event
emitter.on('messageLogged', (e) => {
    console.log('Listener called.', e)
});

// Raise an event
emitter.emit('messageLogged', { id: 1, url: 'http://test.org' });

// Exercise : raise and handle logging event 
// Raise: logging (data: message)

// 1. Register the event
emitter.on('logging', (e) => {
    console.log(e.message);
});

// 2. Emit the event
emitter.emit('logging', { message: 'This is my logging message.' })

// Call logger function
logger.on('messageLogged', (e) => {
    console.log('Message logged.', e);
});

logger.log('Message');

// http module usage
const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.write('Hello World !');
        res.end();
    }

    if(req.url === '/api/courses') {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});

server.on('connection', (socket) => {
    console.log('New connection...');
});

// Uncomment to launch server
server.listen(3000);

console.log('Listening on port 3000...');