const cors = require("cors");

module.exports = app => {
    const corsOptions = {
        origin: "*",
        optionsSuccessStatus: 200,
        exposedHeaders: 'x-webtoken',
        methods: "GET,POST,PUT,DELETE"
    };
    app.use(cors(corsOptions));
};