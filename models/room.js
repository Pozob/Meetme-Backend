const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const random = require("../services/randomId");

const room = mongoose.model("Room", new mongoose.Schema({
    _id: {
        type: String,
        default: () => random.generate(9)
    },
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    seatsize: {
        type: Number,
        required: false,
    },
    address: {
        type: String,
        minlength: 5,
        required: false
    },
    company: {
        type: String,
        ref: "Company",
        required: false
    }
}));

function validateRoom(room) {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        seatsize: Joi.number().integer().min(2),
        company: Joi.string().min(6).max(6)
    });
    
    return schema.validate(room);
}

exports.Room = room;
exports.validateRoom = validateRoom;