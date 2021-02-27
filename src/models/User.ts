import { model, Schema, Model, Document, Types } from 'mongoose';

export interface IUser extends Document {
    _id: string;
    email: string;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    isActive: boolean;
    socialId: string;
    provider: string;
    profilePic: string;
    posts: object;
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    profilePic: { type: String, required: false },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    socialId: { type: String, required: true },
    provider: { type: String, required: true },
    posts: { type: Types.ObjectId, ref: 'posts' },
}, {
    timestamps: true
});

export const User: Model<IUser> = model('users', UserSchema);