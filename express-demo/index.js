/**
 * Demo for express
 * @author Maxime Mettey <contact@maxime-mettey.com>
 */

require('dotenv').config({ path: './.env' });
const Joi = require('joi');
const express = require('express');

// Server
const app = express();
app.use(express.json());
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
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given ID was not found.');
    res.send(course);
});

// Trying get parameters
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});

// Add a course
app.post('/api/courses', (req, res) => {

    // Validate
    const { error } = validateCourse(req.body); // result.error

    // If invalid, return 400 - bad request
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);

});

// Update a course
app.put('/api/courses/:id', (req, res) => {

    // Look up the course
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given ID was not found.');

    // Validate
    const { error } = validateCourse(req.body); // result.error

    // If invalid, return 400 - bad request
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // Update the course
    course.name = req.body.name;

    // Return the updated course
    res.send(course);
});

// Validate course refactor
const validateCourse = (course) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}