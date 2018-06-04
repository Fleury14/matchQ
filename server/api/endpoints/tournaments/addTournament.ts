import { Request, Response, NextFunction } from "express";
import { Tournament } from './../../models/tournamentModel';
import { onError } from "../onError";
import * as mongoose from "mongoose";

export async function addTournament(req: Request, res: Response, next: NextFunction) {
    console.log('Endpoint for adding tournament hit');
    try {
        // make sure data fits schema
        if( !req.body.name || !req.body.belongsTo ) {
            console.log('Missing required fields');
            throw new TypeError('Missing fields');
        }

        // make sure tournament doesnt exist
        const result = await Tournament.findOne({name: req.body.name});
        console.log('Result:', result);
        if (result) {
            console.log('Tournament already exists');
            throw new Error('Tourament existo');
        }

        // create new tournament object
        const newTournament = new Tournament({
            name: String(req.body.name),
            belongsTo: String(req.body.belongsTo)
        });
        
        // execute save
        console.log(`Saving ${req.body.name} to database...`);
        await newTournament.save( (err, newTournament) => {
            if (err) {
                throw new Error('Error in save...');
            } else {
                console.log('Tournament add successful');
                res.json({message: 'Successful add', result: newTournament});
            }
        })
    } catch (err) {
        onError(res, 'Error while adding tournament to db', err);
    }
}