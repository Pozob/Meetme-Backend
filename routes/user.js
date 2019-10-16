const express = require("express");
const router = express.Router();
const valid = require("../middleware/validation");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
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
    User.findOne({_id: req.params.id})
        .select('-__v')
        .then(user => res.send(user))
        .catch(err => console.log(err));
});

//Create
router.post("/", [valid(validateUser)], async(req, res) => {
    //Check, if there is no user with the same username
    let user = await User.findOne({username: req.body.username});
    if (user) return res.status(400).send("User already registered");
    
    //Hash the password and save the User to the DB
    user = new User(req.body);
    user.password = bcrypt.hashSync(req.body.password, 10);
    user = await user.save();
    
    //Get the user from the DB with all populated field and create a JSON Web Token, used for auth
    user = await User.findOne({_id: user._id}).select('-__v');
    const token = user.generateAuthToken();
    
    //Send it
    res.header("x-webtoken", token) //Include the Token in the Header
        .header('Access-Control-Allow-Headers', 'x-webtoken') //Make the token available to the user
        .send(user);
});

//Update
router.put("/:id", [auth, valid(validateUser)], async(req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            select: "-__v -password -departments"
        });
        if (!user) return res.status(404).send("User not found");
        return res.send(user);
    } catch (e) {
        console.log(e);
        res.send("Error");
    }
});

//Delete
router.delete("/:id", [auth], (req, res) => {
    User.deleteOne({_id: req.params.id})
});

module.exports = router;