const express = require("express");
const user = require("../routes/user");
const department = require("../routes/department");
const meeting = require("../routes/meeting");
const room = require("../routes/room");
const company = require("../routes/company");
const auth = require("../routes/auth");

module.exports = function(app) {
    app.use(express.json());
    app.use("/user", user);
    app.use("/department", department);
    app.use("/meeting", meeting);
    app.use("/room", room);
    app.use("/company", company);
    app.use("/auth", auth);
};