import { Request, Response, NextFunction } from "express";
import { Tournament } from './../../models/tournamentModel';
import { User } from './../../models/userModel';
import { onError } from "../onError";
import * as mongoose from "mongoose";
import { ITournament } from "../../interfaces/tournament";

export async function addMatch(req: Request, res: Response, next: NextFunction) {
    console.log('Endpoint for adding match hit');
    try {
        // make sure data fits schema
        if( !req.body.tournId  || !req.body.match || !req.body.uid ) {
            console.log('Missing required fields');
            throw new TypeError('Missing fields');
        }


        // make sure tournament exists
        const tournResult = await Tournament.findOne({_id: req.body.tournId});
        if (!tournResult) {
            console.log('Tournament does not exist');
            res.json({message: 'Cannot add match to tournament because tournament does not exist'});
        } else {
            
            await Tournament.update({_id: req.body.tournId}, {
                $addToSet: {
                    matches: req.body.match
                }
            }, (err, resp) => {
                if (err) {
                    console.log('Error in adding match');
                    res.json({message: 'Database error in adding match'});
                } else {
                    console.log(`Successful match added for tournament ${req.body.tournId} by user with uid ${req.body.uid}`);
                    res.json({message: 'Successful invite add'});
                }
            })
            
        }    
    } catch (err) {
        onError(res, 'Error while adding tournament to db', err);
    }
}