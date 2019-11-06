const moment = require("moment");

module.exports = (req, res, next) => {
    const {date, timestart, timeend} = req.body;
    
    req.body.timestart = moment(date + timestart, "DD.MM.YYYY HH:mm").format();
    req.body.timeend = moment(date + timeend, "DD.MM.YYYY HH:mm").format();
    
    next();
};