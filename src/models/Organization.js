// src/models/Organization.js
import mongoose from 'mongoose';

const organizationSchema = new mongoose.Schema({
    name: { type: String, required: true },
}, { timestamps: true });

// Transform _id to string
organizationSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
    }
});

const Organization = mongoose.model('Organization', organizationSchema);

export default Organization;
