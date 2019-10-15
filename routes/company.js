const express = require("express");
const router = express.Router();
const {Company, validateCompany} = require("../models/company");
const valid = require("../middleware/validation");

//Returns all
router.get("/", (req, res) => {
    Company.find()
        .select('-__v')
        .then(companies => res.send(companies))
        .catch(err => console.log(err));
});

//Returns specific
router.get("/:id", (req, res) => {
    Company.find({_id: req.params.id})
        .select('-__v -_id')
        .then(companies => res.send(companies))
        .catch(err => console.log(err));
});

//Create
router.post("/", [valid(validateCompany)], (req, res) => {
    const company = new Company(req.body);
    company.save().then(e => res.send(e));
});

//Update
router.put("/:id", [valid(validateCompany)], (req, res) => {
    Company.findByIdAndUpdate(req.params.id, req.body, {new: true, select: "-__v"})
        .then(company => res.send(company))
        .catch(err => {
            console.log(err);
            res.status(404).send("Id not found");
        });
});

//Delete
router.delete("/:id", (req, res) => {
    Company.findByIdAndRemove(req.params.id)
        .then(() => res.send({}))
        .catch(err => {
            console.log(err);
            res.send(`Could not delete ${req.params.id}`)
        });
});

module.exports = router;