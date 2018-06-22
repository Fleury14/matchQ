import { Request, Response, NextFunction } from "express";
import { Tournament } from './../../models/tournamentModel';
import { User } from './../../models/userModel';
import { onError } from "../onError";
import * as mongoose from "mongoose";
import { ITournament } from "../../interfaces/tournament";

export async function addInvite(req: Request, res: Response, next: NextFunction) {
    console.log('Endpoint for adding invite hit');
    try {
        // make sure data fits schema
        if( !req.body.tournId  || !req.body.tournName || !req.body.uid ) {
            console.log('Missing required fields');
            throw new TypeError('Missing fields');
        }


        // make sure user exists
        const userResult = await User.findOne({uid: req.body.uid});
        if (!userResult) {
            console.log('User does not exist');
            res.json({message: 'Cannot add invite to user because user does not exist'});
        } else {
            const tournResult = await Tournament.findOne({_id: req.body.tournId})
            if (!tournResult) {
                console.log('Tournament does not exist');
                res.json({message: 'User exists, but tournament does not'})
            } else {
                await User.update({uid: req.body.uid}, {
                    $addToSet: {
                        invites: {
                            tournId: req.body.tournId,
                            tournName: req.body.tournName
                        }
                    }
                }, (err, resp) => {
                    if (err) {
                        console.log('Error in adding invite');
                        res.json({message: 'Database error in adding invite'});
                    } else {
                        console.log(`Successful invite for tournament ${req.body.tournId} send to user with uid ${req.body.uid}`);
                        res.json({message: 'Successful invite add'});
                    }
                })
            }
        }    
    } catch (err) {
        onError(res, 'Error while adding tournament to db', err);
    }
}