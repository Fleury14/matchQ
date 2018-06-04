import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const tournamentSchema:mongoose.Schema = new Schema({
    belongsTo: {type: String, required: true},
    name: {type: String, required: true}
});

module.exports = mongoose.model('TOURNAMENT', tournamentSchema);