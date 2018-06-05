import { Request, Response, NextFunction } from "express";
import { Tournament } from './../../models/tournamentModel';
import { onError } from "../onError";
import * as mongoose from "mongoose";

export async function listTournaments(req: Request, res: Response, next: NextFunction) {
    try {

        const tournList = await Tournament.find();
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