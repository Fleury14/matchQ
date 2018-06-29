import { Request, Response, NextFunction } from "express";
import { Tournament } from './../../models/tournamentModel';
import { onError } from "../onError";
import * as mongoose from "mongoose";
import { ITournament } from "../../interfaces/tournament";


export async function removeAccess(req: Request, res: Response, next: NextFunction) {
   
    try {
        if(!req.body.uid || !req.body.tournId) {
            res.status(500).json({message: 'No User ID supplied.'})
        } else {
            // select targeted tournament
            const selectedTourn:ITournament = await Tournament.findOne({
                _id: req.body.tournId
            });
            if (!selectedTourn || !selectedTourn.belongsTo) {
                res.status(500).json({message: 'Unable to find a valid tournament'})
            } else if ( req['user'] !== selectedTourn.belongsTo ) {
                // dont allow soemone to remove access for a tournament that isnt theirs
                res.status(401).json({message: 'You are unauthorized to edit access to this tournament'})
            } else {
                await Tournament.update({_id: req.body.tournId}, {
                    $pull: {
                        access: req.body.uid
                    }
                })
                res.status(200).json({message: `User ${req.body.uid} had access to tournament ${req.body.tournId} successfully removed.`});
            }
        }        
    } catch (err) {
        console.log('Error caught while listing tournaments');
        onError(res, 'Error during list', err);
    }
}