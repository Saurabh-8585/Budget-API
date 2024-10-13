
const authMiddleware = async (req, res, next) => {
    const clerkUserId = req.header('Authorization');
    if (!clerkUserId) {
        return res.status(401).json({ message: 'Unauthorized user' });
    }

    try {
        req.clerkUserId = clerkUserId;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid User' });
    }
};

module.exports = authMiddleware;