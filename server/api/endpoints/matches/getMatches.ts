import { Request, Response, NextFunction } from "express";
import { Tournament } from './../../models/tournamentModel';
import { onError } from "../onError";
import * as mongoose from "mongoose";
import { ITournament } from "../../interfaces/tournament";

export async function getMatches(req: Request, res: Response, next: NextFunction) {
    try {

        if(!req.body.tournId) {
            res.status(500).json({message: 'Missing paramters'})
        } else {
            const tournList:ITournament[] = await Tournament.find({
                _id: req.body.tournId
            });
            if (!tournList) {
                console.log('No Tournaments found');
                res.status(200).json({message: 'No tournaments found'});
            } else {
                console.log('List successful');
                res.status(200).json({message: 'List found', result: tournList[0].matches})
            }
        }

        

    } catch (err) {
        console.log('Error caught while listing matches');
        onError(res, 'Error during list', err);
    }
}