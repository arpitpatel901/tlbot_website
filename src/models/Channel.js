// src/models/Channel.js
import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Channel = mongoose.model('Channel', channelSchema);
export default Channel;
