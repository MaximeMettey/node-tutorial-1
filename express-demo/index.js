/**
 * Demo for express
 * @author Maxime Mettey <contact@maxime-mettey.com>
 */

require('dotenv').config({ path: './.env' });
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const Joi = require('joi');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

// Comment, just keep track of this part
// const logger = require('./logger');
// const auth = require('./auth');

// Server
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet()); // Add headers to secure the app

if (app.get('env') === 'development') {
    app.use(morgan('tiny')); // Log every request
    startupDebugger('Morgan enabled...');
}

// Comment, just keep track of this part
// app.use(logger);
// app.use(auth);

// DB Work
dbDebugger('Connected to the database...');

// Port handling
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

// Data
const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
]

// Validate course refactor
const validateCourse = (course) => {
    // Schema
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    // Validation
    return schema.validate(course);
}

/**
 * GET
 */
// Test Hello World
app.get('/', (req, res) => {
    res.send('Hello world !');
});

// Get courses list
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// Get course by ID
app.get('/api/courses/:id', (req, res) => {
    // Look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // If not existing, return 404
    if (!course) return res.status(404).send('The course with the given ID was not found.');
    // Return the course
    res.send(course);

});

// Trying get parameters
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});

/**
 * POST
 */
// Add a course
app.post('/api/courses', (req, res) => {

    // Validate
    const { error } = validateCourse(req.body); // result.error

    // If invalid, return 400 - bad request
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);

});

/**
 * PUT
 */
// Update a course
app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // If not existing, return 404
    if (!course) return res.status(404).send('The course with the given ID was not found.');

    // Validate
    const { error } = validateCourse(req.body); // result.error

    // If invalid, return 400 - bad request
    if (error) return res.status(400).send(error.details[0].message);

    // Update the course
    course.name = req.body.name;

    // Return the updated course
    res.send(course);
});

/**
 * DELETE
 */
app.delete('/api/courses/:id', (req, res) => {
    // Look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // If not existing, return 404
    if (!course) res.status(404).send('The course with the given ID was not found.');

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the same course
    res.send(course);
});