import { Request, Response, NextFunction } from "express";
import { Tournament } from './../../models/tournamentModel';
import { onError } from "../onError";
import * as mongoose from "mongoose";
import { ITournament } from "../../interfaces/tournament";


export async function getMyTournament(req: Request, res: Response, next: NextFunction) {
    if(!req.body.uid) {
        res.status(500).json({message: 'No User ID supplied.'})
    }

    try {
        const tournList:ITournament[] = await Tournament.find({
            belongsTo: req.body.uid
        });
        if (!tournList) {
            console.log('No Tournaments found');
            res.status(200).json({message: 'No tournaments found'});
        } else {
            console.log('List successful');
            res.status(200).json({message: 'List found', result: tournList})
        }

    } catch (err) {
        console.log('Error caught while listing tournaments');
        onError(res, 'Error during list', err);
    }
}