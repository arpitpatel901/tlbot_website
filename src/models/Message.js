// src/models/Message.js
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    channelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);
export default Message;
