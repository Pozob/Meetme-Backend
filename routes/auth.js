const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");
const valid = require("../middleware/validation");
const bcrypt = require("bcryptjs");
const {User} = require("../models/user");

// Used for Login
router.post("/", [valid(validateLogin)], async (req, res) => {
    const {username, password} = req.body;
    // Find the user first
    const user = await User.findOne({username: username}).select("+password");
    if (!user) return res.status(400).send("Invalid Username or Password");
    
    // Validate the password
    const validPassword = await bcrypt.compareSync(password, user.password);
    if (!validPassword) return res.status(400).send("Invalid Username or Password");
    
    //Generate JSON Web Token, used for verification
    return res.send(user.generateAuthToken());
});

function validateLogin(req) {
    const schema = Joi.object({
        username: Joi.string().min(5).required(),
        password: Joi.string().min(5)
    });
    
    return schema.validate(req);
}

module.exports = router;