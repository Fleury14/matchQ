import { Schema, Document, Model, model } from 'mongoose';
import { IUser } from '../interfaces/user';

export interface IUserModel extends IUser, Document {}

export const userSchema:Schema = new Schema({
    displayName: {type: String, required: true},
    email: {type: String, required: true},
    subscriptions: {type: [String], required: true},
    uid: {type: String, required: true},
    invites: {
        tournId: { type: String, required: true },
        tournName: { type: String, required: true }
    },
});

userSchema.pre('save', (next) => {
    let now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

export const User: Model<IUserModel> = model<IUserModel>('USER', userSchema);
