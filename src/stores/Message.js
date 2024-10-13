// src/Message.js
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    channel: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel' },
    threadParent: { type: mongoose.Schema.Types.ObjectId, ref: 'Message', default: null },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Message', messageSchema);
