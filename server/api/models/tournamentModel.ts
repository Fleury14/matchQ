import { Schema, Document, Model, model } from 'mongoose';
import { ITournament } from '../interfaces/tournament';

export interface ITournamentModel extends ITournament, Document {}

export const tournamentSchema:Schema = new Schema({
    belongsTo: {type: String, required: true},
    belongsName: {type: String, required: true},
    name: {type: String, required: true, unique: true},
    active: {type: Boolean, required: true},
    subscribers: {type: [String]},
    access: {type: [String]},
    matches: { type: Schema.Types.Mixed }, // TODO when a strict match type is set, adjust here
    createdAt: {type: Date}
});

tournamentSchema.pre('save', (next) => {
    let now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

export const Tournament: Model<ITournamentModel> = model<ITournamentModel>('TOURNAMENT', tournamentSchema);
// module.exports = mongoose.model('TOURNAMENT', tournamentSchema);
// module.exports = tournamentSchema;