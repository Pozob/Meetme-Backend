const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const random = require('../services/randomId');

const companySchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => random.generate(6)
    },
    name: {
        type: String,
        minlength: 3,
        trim: true,
        required: true
    },
    address: {
        type: String,
        minlength: 5,
        required: false
    }
});

const company = mongoose.model("Company", companySchema);

function validateCompany(company) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        address: Joi.string().min(5)
    });

    return schema.validate(company, {abortEarly: false});
}

exports.Company = company;
exports.validateCompany = validateCompany;