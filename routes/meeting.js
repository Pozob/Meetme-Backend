const express = require("express");
const router = express.Router();
const _ = require("lodash");
const valid = require("../middleware/validation");
const auth = require("../middleware/auth");
const timeConv = require("../middleware/timeConvert");
const {Meeting, validateMeeting} = require("../models/meeting");

const getAll = (req, res) => {
    Meeting.find()
        .populate("room", "-__v")
        .select("-__v -participants")
        .then(meeting => res.send(meeting))
        .catch(err => {
            console.log(err);
            res.send("Could not get Meetings");
        });
};

const getForUser = (req, res) => {
    Meeting.find({participants: req.query.user})
        .select("-__v -participants")
        .sort({timestart: "asc"})
        .then(meeting => res.send(meeting))
        .catch(err => {
            console.log(err);
            res.send("Could not get Meetings");
        });
};

router.get("/", (req, res) => {
    if(req.query.user) {
        return getForUser(req, res);
    } else {
        return getAll(req, res);
    }
});

router.get("/:id", (req, res) => {
    Meeting.findOne({_id: req.params.id})
        .populate("participants", "-__v")
        .populate("room", "-__v")
        .select("-__v")
        .then(meeting => res.send(meeting));
});

router.post("/", [auth, valid(validateMeeting), timeConv], (req, res) => {
    const meeting = new Meeting(req.body);
    meeting.save().then(m => res.send(m));
});

router.put("/:id", [auth, valid(validateMeeting), timeConv], (req, res) => {
    Meeting.findByIdAndUpdate(req.params.id, req.body, {new: true, select: "-__v"})
        .then(meeting => res.send(meeting));
});

router.patch("/:id", [auth], (req, res) => {
    const addUser = req.body.addUser;
    const removeUser = req.body.removeUser;
    
    Meeting.findOne({_id: req.params.id})
        .then(meeting => {
            //Add Users
            if(addUser) {
                addUser.forEach(userId => {
                    meeting.participants.push(userId);
                });
                meeting.participants = _.uniq(meeting.participants);
            }
            
            //Remove Users
            if(removeUser) {
                removeUser.forEach(userId => {
                    meeting.participants = meeting.participants.filter(user => user !== userId);
                });
            }
            return meeting.save()
        })
        .then(meeting => res.send(meeting));
});

router.delete("/:id", [auth], (req, res) => {
    Meeting.findByIdAndRemove(req.params.id).then(meeting => res.send(meeting));
});

module.exports = router;