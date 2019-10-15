// Used in API Calls to validate the object
module.exports = (validator) => {
    return (req, res, next) => {
        // Validate the Object
        const {error} = validator(req.body);
        // If we have an error, we aboart the request here and return
        if (error) return res.status(400).send(error.details[0].message);
        
        // Otherwise go to the next middleware
        next();
    }
};