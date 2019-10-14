const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const random = require('../services/randomId');
const {Company} = require("./company");

const departmentSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => random.generate(7)
    },
    name: {
        type: String,
        minlength: 2,
        required: true
    },
    company: {
        type: Company,
        required: true
    }
});

function validateDepartment(department) {
    const schema = {
        name: Joi.string().min(2).required()
    };

    return Joi.validate(department, schema);
}

exports.Department = departmentSchema;
exports.validateDepartment = validateDepartment;