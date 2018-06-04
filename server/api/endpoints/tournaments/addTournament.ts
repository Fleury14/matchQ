import { Request, Response, NextFunction } from "express";
import * as tournModel from './../../models/tournamentModel';
import { onError } from "../onError";

export async function addTournament(req: Request, res: Response, next: NextFunction) {
    console.log('Endpoint for adding tournament hit');
    try {
        
    } catch (err) {
        onError(res, 'Error while adding tournament to db', err);
    }
}