const User = require('../models/dbUser')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        // create token
        const token = createToken(user._id)

        res.status(200).json({_id: user._id, name:user.name, email, con_number:user.con_number, role:user.role, token })

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// signup user
const signupUser = async (req, res) => {

    const {name, email, con_number, role, password} = req.body

    try {
        const user = await User.signup(name, email, con_number, role, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({name, email, con_number, role, token})

    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}

// get all student/teacher/admin(seperatlly)
const getAllUser = async (req, res) => {
    const {role} =  req.params
    const users = await User.find({role}).sort({createdAt: -1})

    res.status(200).json(users)
}

const getAll = async (req, res) => {
    const users = await User.find({}).sort({createdAt: -1})

    res.status(200).json(users)
}


// get a single student/teacher/admin
const getUser = async (req, res) => {
    const {id} =  req.body
    console.log(req.body)
    const users = await User.find({_id: req.body})

    res.status(200).json(users)
}


// delete a student/teacher/admin
const deleteUser = async (req, res) => {
    const { id } = req.params
    console.log(id)

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user'})
    }

    const user = await User.findOneAndDelete({_id: id})

    if (!user) {
        return res.status(404).json({error: 'No such user.'})
    } 
    res.status(200).json(user)
}


// update a student/teacher/admin
const updateUser = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such user'})
    }
  
    const user = await User.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!user) {
      return res.status(400).json({error: 'No such user'})
    }
  
    res.status(200).json(user)
  }


module.exports = {
    loginUser,
    signupUser,
    getAllUser,
    getUser,
    deleteUser,
    updateUser,
    getAll
}