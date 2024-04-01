const express = require('express');
const router = express.Router();
const TeacherModel = require('../models/dbTeacher')


router.post('/register', (req, res) => {
    TeacherModel.create(req.body)
    .then(teacher => res.json(teacher))
    .catch(err => res.json(err))
})

router.post("/login", (req, res) => {
    const {email, password} = req.body;
    TeacherModel.findOne({email})
    .then(user => {
        if (user) {
            if (user.password === password) {
                res.json("Success")
            } else {
                res.json("Password is incorect")
            }
        } else {
            res.json("user not exist")
        }
    })
})

module.exports = router;