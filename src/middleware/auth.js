// src/middleware/auth.js

import User from '../stores/User.js';

export const authenticateUser = async (req, res, next) => {
    if (req.session && req.session.userId) {
        try {
            const user = await User.findById(req.session.userId);
            if (user) {
                req.user = user;
                return next();
            }
        } catch (error) {
            console.error('Authentication error:', error);
        }
    }
    res.status(401).json({ error: 'Unauthorized' });
};
