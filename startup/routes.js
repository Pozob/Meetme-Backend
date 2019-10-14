const express = require("express");
const user = require("../routes/user");
const department = require("../routes/department");
const meeting = require("../routes/meeting");
const room = require("../routes/room");

module.exports = function(app) {
    app.use(express.json());
    app.use("/users", user);
    app.use("/department", department);
    app.use("/meeting", meeting);
    app.use("/room", room);
};