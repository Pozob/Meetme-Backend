const express = require("express");
const router = express.Router();
const valid = require("../middleware/validation");
const {User, validateUser} = require("../models/user");

//Returns all
router.get("/", (req, res) => {
    User.find()
        .select('-__v')
        .then(users => res.send(users))
        .catch(err => console.log(err));
});

//Returns specific
router.get("/:id", (req, res) => {
    User.find({_id: req.params.id})
        .populate("department", "-__v")
        .select('-__v')
        .then(user => res.send(user))
        .catch(err => console.log(err));
});

//Create
router.post("/", [valid(validateUser)], async (req, res) => {
    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send("User already registered");
    
    
});

//Update
router.put("/:id", [valid(validateUser)], async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, select: "-__v -password -departments"})
        if (!user) return res.status(404).send("User not found");
        return res.send(user);
    } catch (e) {
        console.log(e);
        res.send("Error");
    }
    
});

//Delete
router.delete("/:id", (req, res) => {
    User.deleteOne({_id: req.params.id})
});

module.exports = router;