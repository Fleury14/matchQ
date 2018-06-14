import { Request, Response, NextFunction } from "express";
import { Tournament } from './../../models/tournamentModel';
import { onError } from "../onError";
import * as mongoose from "mongoose";

export async function addTournament(req: Request, res: Response, next: NextFunction) {
    console.log('Endpoint for adding tournament hit');
    try {
        // make sure data fits schema
        if( !req.body.name || !req.body.belongsTo || !req.body.belongsName) {
            console.log('Missing required fields');
            throw new TypeError('Missing fields');
        }

        // make sure tournament doesnt exist
        const result = await Tournament.findOne({name: req.body.name});
        console.log('Result:', result);
        if (result) {
            console.log('Tournament already exists');
            res.json({message: 'Cannot add: Tournament with that name already exists'})
        } else {
            // create new tournament object
            const newTournament = new Tournament({
                name: String(req.body.name),
                belongsTo: String(req.body.belongsTo),
                belongsName: String(req.body.belongsName),
                active: false,
                createdAt: new Date(),
                subscribers: [],
                matches: [],
                access: []

            });

            // execute save
            console.log(`Saving ${req.body.name} to database...`);
            await newTournament.save( (err, newTournament) => {
                if (err) {
                    throw new Error('Error in save via database...');
                } else {
                    console.log('Tournament add successful');
                    res.json({message: 'Successful add', result: newTournament});
                }
            })
        }     
    } catch (err) {
        onError(res, 'Error while adding tournament to db', err);
    }
}