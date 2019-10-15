const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const random = require('../services/randomId');

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
        type: String,
        ref: "Company",
        required: true
    }
});

const department = mongoose.model("Department", departmentSchema);

function validateDepartment(department) {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        company: Joi.string().min(6).max(6).required()
    });

    return schema.validate(department);
}

exports.Department = department;
exports.validateDepartment = validateDepartment;