module.exports = config => {
    return (req, res, next) => {
        res.locals.CONFIG = config;
        res.locals.user = req.user;
        next();
    };
};
