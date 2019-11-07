const moment = require("moment");

module.exports = (req, res, next) => {
    const {date, timestart, timeend} = req.body;
    
    req.body.timestart = timestart && moment(date + timestart, "DD.MM.YYYY HH:mm").format();
    req.body.timeend = timeend && moment(date + timeend, "DD.MM.YYYY HH:mm").format();
    
    next();
};