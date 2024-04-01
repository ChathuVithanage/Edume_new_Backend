const express = require('express');

const {
    createCourse,
    getAllCourses,
    getCourse,
    updateCourse,
    deleteCourse
} = require('../controllers/coursesController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth)

// Add new course
router.post('/course', createCourse)

// get all course
router.get('/course', getAllCourses)

// get a single course
router.get('/:id', getCourse)

// Update course
router.patch('/:id', updateCourse)

// Delete course
router.delete('/:id', deleteCourse)

module.exports = router;