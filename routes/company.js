const express = require("express");
const router = express.Router();
const valid = require("../middleware/validation");
const auth = require("../middleware/auth");
const {Company, validateCompany} = require("../models/company");

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
router.post("/", [auth, valid(validateCompany)], (req, res) => {
    const company = new Company(req.body);
    company.save().then(e => res.send(e));
});

//Update
router.put("/:id", [auth, valid(validateCompany)], async (req, res) => {
    const {id} = req.params;
    try {
        const company = await Company.findByIdAndUpdate(id, req.body, {new: true, select: "-__v"});
        if (!company) return res.status(404).send(`${id} not found`);
        res.send(company);
    } catch (e) {
        console.log(e);
        res.send(`Could not update  + ${id}`);
    }
});

//Delete
router.delete("/:id", [auth], (req, res) => {
    Company.findByIdAndRemove(req.params.id)
        .then(() => res.send({}))
        .catch(err => {
            console.log(err);
            res.send(`Could not delete ${req.params.id}`)
        });
});

module.exports = router;