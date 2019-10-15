const express = require("express");
const router = express.Router();
const valid = require("../middleware/validation");
const auth = require("../middleware/auth");
const {Department, validateDepartment} = require("../models/department");

//Returns all
router.get("/", (req, res) => {
    Department.find()
        .select("-__v")
        .populate('company', "-__v")
        .then(departments => res.send(departments))
        .catch(err => console.log(err));
});

//Returns specific
router.get("/:id", (req, res) => {
    Department.findOne({_id: req.params.id})
        .select("-__v")
        .populate('company', '-__v')
        .then(departments => res.send(departments))
        .catch(err => console.log(err));
});

//Create
router.post("/", [auth, valid(validateDepartment)], (req, res) => {
    const department = new Department(req.body);
    department.save().then(dep => res.send(dep));
});

//Update
router.put("/:id", [auth, valid(validateDepartment)], (req, res) => {
    Department.findByIdAndUpdate(req.params.id, req.body, {new: true, select: "-__v"})
        .then(dep => res.send(dep));
});

//Delete
router.delete("/:id", [auth], (req, res) => {
    Department.findByIdAndRemove(req.params.id)
        .then(dep => res.send(dep))
        .catch(err => {
            res.send("Could not delete" + req.params.id);
        });
});

module.exports = router;