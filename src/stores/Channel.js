// src/Channel.js
import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema({
    name: String,
    description: String,
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    created_at: { type: Date, default: Date.now },
});

export default mongoose.model('Channel', channelSchema);
