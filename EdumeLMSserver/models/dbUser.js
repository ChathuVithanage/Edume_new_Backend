const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, require: true},
    email: { type: String, require: true, unique: true},
    con_number: { type: Number, require: true},
    role: { type: String, require: true},
    password: { type: String, require: true, unique: true}
})

// static sihnup method
userSchema.statics.signup = async function (name, email, con_number, role, password) {
    
    // validation
    if (!name || !email || !con_number || !role || !password) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('password not strong enough')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ name, email, con_number, role, password: hash })

    return user
}

// static login method
userSchema.statics.login = async function (email, password) {
    
    if (!email || !password) {
        throw Error('All field must be filled')
    }

    const user = await this.findOne({email})

    if (!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}


module.exports = mongoose.model('dbUser', userSchema)