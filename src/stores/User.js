// src/stores/User.js

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    avatar: String,
    // Add additional user fields as needed
});

export default mongoose.model('User', userSchema);
