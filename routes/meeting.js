const express = require("express");
const router = express.Router();
const valid = require("../middleware/validation");
const auth = require("../middleware/auth");
const {Meeting, validateMeeting} = require("../models/meeting");

router.get("/", (req, res) => {
    Meeting.find()
        .populate("user", "-__v")
        .populate("room", "-__v")
        .select("-__v")
        .then(meeting => res.send(meeting))
        .catch(err => {
            console.log(err);
            res.send("Could not get Meetings");
        });
});

router.get("/:id", (req, res) => {
    Meeting.findOne({_id: req.params.id})
        .populate("user", "-__v")
        .populate("room", "-__v")
        .select("-__v")
        .then(meeting => res.send(meeting));
});

router.post("/", [auth, valid(validateMeeting)], (req, res) => {
    const meeting = new Meeting(req.body);
    meeting.save().then(m => res.send(m));
});

router.put("/:id", [auth, valid(validateMeeting)], (req, res) => {
    Meeting.findByIdAndUpdate(req.params.id, req.body, {new: true, select: "-__v"})
        .then(meeting => res.send(meeting));
});

router.delete("/:id", [auth], (req, res) => {
    Meeting.findByIdAndRemove(req.params.id).then(meeting => res.send(meeting));
});

module.exports = router;