import { Request, Response, NextFunction } from "express";
import { Tournament } from './../../models/tournamentModel';
import { onError } from "../onError";
import * as mongoose from "mongoose";
import { ITournament } from "../../interfaces/tournament";


export async function searchTournament(req: Request, res: Response, next: NextFunction) {
    if(!req.body.uid || !req.body.search) {
        res.status(500).json({message: 'No User ID supplied.'})
    }

    console.log(`User ID ${req.body.uid} searching for ${req.body.search}`);
    const search = regexEscape(String(req.body.search));
    const searchReg = new RegExp('.*' + search + '.*');
    try {
        const tournList:ITournament[] = await Tournament.find({
            name: searchReg
        });
        if (!tournList) {
            console.log('No Tournaments found');
            res.status(200).json({message: 'No tournaments found', result: []});
        } else {
            console.log('List successful');
            res.status(200).json({message: 'List found', result: tournList})
        }

    } catch (err) {
        console.log('Error caught while listing tournaments');
        onError(res, 'Error during list', err);
    }
}

function regexEscape(str) {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}