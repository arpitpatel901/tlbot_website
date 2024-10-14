// src/middleware/auth.js
import User from '../models/User.js'; // Adjust the path as necessary

export const authenticateUser = async (req, res, next) => {
    try {
        if (!req.session.userId) {
            console.log('authenticateUser: No userId in session');
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const user = await User.findById(req.session.userId);
        if (!user) {
            console.log(`authenticateUser: No user found with ID ${req.session.userId}`);
            return res.status(401).json({ error: 'Unauthorized' });
        }

        req.user = user; // Attach user to request
        console.log(`authenticateUser: User authenticated: ${user.email}`);
        next();
    } catch (error) {
        console.error('authenticateUser: Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
