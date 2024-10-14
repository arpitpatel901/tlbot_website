// src/models/Message.js
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    channelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
}, { timestamps: true });

// Transform _id and related fields to strings
messageSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        ret.channelId = ret.channelId.toString();
        ret.userId = ret.userId.toString();
        delete ret._id;
        delete ret.__v;
    }
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
