// src/models/Channel.js

import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    // Add any other fields as necessary
}, { timestamps: true });

// Transform _id to id
channelSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        ret.organizationId = ret.organizationId.toString();
        delete ret._id;
        delete ret.__v;
    }
});

const Channel = mongoose.model('Channel', channelSchema);

export default Channel;
