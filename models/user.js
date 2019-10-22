const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const random = require("../util/randomId");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
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
});

userSchema.methods.generateAuthToken = function() {
    const obj = {
        _id: this._id,
        name: this.name,
        email: this.email,
        username: this.username,
        department: this.department
    };
    
    return jwt.sign(obj, process.env.JWT_KEY);
};

const getDepartment = function() {
    this.populate('department', "-__v");
};

userSchema.pre('find', getDepartment);
userSchema.pre('findOne', getDepartment);

const userModel = mongoose.model("User", userSchema);

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

function validateUserPatch(user) {
    //Joi Validation schema
    const schema = Joi.object({
        name: Joi.string().min(2),
        email: Joi.string().min(5).max(1024),
        username: Joi.string().min(5).max(1024),
        password: Joi.string().min(5),
        department: Joi.string().min(7).max(7)
    });
    
    return schema.validate(user);
}

exports.User = userModel;
exports.validateUser = validateUser;
exports.validateUserPatch = validateUserPatch;