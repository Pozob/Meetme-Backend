const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const random = require("../util/randomId");

const meetingSchema =  new mongoose.Schema({
    _id: {
        type: String,
        default: () => random.generate(9)
    },
    room: {
        type: String,
        ref: "Room"
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    address: String,
    duration: String,
    timestart: Date,
    participants: [{
        type: String,
        ref: "User"
    }]
});

const meetingModel = mongoose.model("Meeting", meetingSchema);

function validateMeeting(meeting) {
    const schema = Joi.object({
        room: Joi.string().min(8).max(8),
        name: Joi.string().required(),
        description: Joi.string(),
        address: Joi.string().min(5),
        duration: Joi.string(),
        timestart: Joi.string(),
        participants: Joi.array()
    });
    
    return schema.validate(meeting);
}

exports.Meeting = meetingModel;
exports.validateMeeting = validateMeeting;