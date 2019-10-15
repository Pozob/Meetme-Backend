const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const random = require("../util/randomId");

const userSchema = mongoose.model("User", new mongoose.Schema({
    _id: {
        type: String,
        default: () => random.generate()
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        trim: true,
        maxlength: 1024
    },
    username: {
        type: String,
        required: true,
        minlength: 5,
        trim: true,
        maxlength: 1024
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        select: false
    },
    department: {
        type: String,
        ref: "Department",
        required: true
    }
}));

function validateUser(user) {
    //Joi Validation schema
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().min(5).max(1024).required(),
        username: Joi.string().min(5).max(1024).required(),
        password: Joi.string().min(5).required(),
        department: Joi.string().min(7).max(7)
    });
    
    return schema.validate(user);
}

exports.User = userSchema;
exports.validateUser = validateUser;