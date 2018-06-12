import { Request, Response, NextFunction } from "express";
import { Tournament } from './../../models/tournamentModel';
import { onError } from "../onError";
import * as mongoose from "mongoose";
import { ITournament } from "../../interfaces/tournament";

export async function getTournamentsBySub(req: Request, res: Response, next: NextFunction) {
    console.log('Endpoint for adding subscription hit');
    try {
        // make sure data fits schema
        if( !req.body.uid ) {
            console.log('Missing required fields');
            throw new TypeError('Missing fields');
        }

        // make sure tournament exists
        const result:ITournament[] = await Tournament.find({
            subscribers: req.body.uid
        });
        res.json({message: "List of tournaments found:", result: result});
        
    } catch (err) {
        onError(res, 'Error while adding tournament to db', err);
    }
}