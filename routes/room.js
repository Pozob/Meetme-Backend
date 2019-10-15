const express = require("express");
const router = express.Router();
const valid = require("../middleware/validation");
const auth = require("../middleware/auth");
const {Room, validateRoom} = require("../models/room");

//Returns all
router.get("/", (req, res) => {
    Room.find()
        .populate("company", "-__v")
        .select("-__v")
        .then(room => res.send(room));
});

//Returns specific
router.get("/:id", (req, res) => {
    Room.findOne({_id: req.params.id})
        .populate("company", "-__v")
        .select("-__v")
        .then(room => res.send(room));
});

//Create
router.post("/", [auth, valid(validateRoom)], (req, res) => {
    const room = new Room(req.body);
    room.save().then(r => res.send(r));
});

//Update
router.put("/:id", [auth, valid(validateRoom)], (req, res) => {
    Room.findByIdAndUpdate(req.params.id, req.body, {new: true, select: "-__v"})
        .then(room => {
            if(!room) return res.status(404).send("Room not found");
            res.send(room);
        })
        .catch(err => console.log(err));
});

//Delete
router.delete("/:id", [auth], (req, res) => {
    Room.findByIdAndRemove(req.params.id).then(room => res.send(room))
});

module.exports = router;