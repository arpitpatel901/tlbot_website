// src/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: 'https://via.placeholder.com/150' },
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    role: { type: String, enum: ['admin', 'member'], default: 'admin' },
}, { timestamps: true });

// Transform _id and organizationId to strings
userSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        ret.organizationId = ret.organizationId.toString();
        delete ret._id;
        delete ret.__v;
    }
});

const User = mongoose.model('User', userSchema);

export default User;
