import { Request, Response, NextFunction } from "express";
import { Tournament } from './../../models/tournamentModel';
import { User } from './../../models/userModel';
import { onError } from "../onError";
import * as mongoose from "mongoose";
import { ITournament } from "../../interfaces/tournament";

export async function acceptInvite(req: Request, res: Response, next: NextFunction) {
    console.log('Endpoint for adding invite hit');
    try {
        // make sure data fits schema
        if( !req.body.tournId || !req.body.uid ) {
            console.log('Missing required fields');
            throw new TypeError('Missing fields');
        }


        // make sure user exists
        const userResult = await User.findOne({uid: req.body.uid});
        if (!userResult) {
            console.log('User does not exist');
            res.json({message: 'Cannot remove invite to user because user does not exist'});
        } else {
            const tournResult = await Tournament.findOne({_id: req.body.tournId})
            if (!tournResult) {
                console.log('Tournament does not exist');
                res.json({message: 'User exists, but tournament does not'})
            } else {
                // remove invite
                await User.update({uid: req.body.uid}, {
                    $pull: {
                        invites: req.body.tournId
                    }
                }, (err, resp) => {
                    if (err) {
                        console.log('Error in removing invite');
                        res.json({message: 'Database error in removing invite'});
                    } else {
                        // grant access
                        Tournament.update({_id: req.body.tournId}, {
                            $addToSet: {
                                access: req.body.uid
                            }, 
                        }, (err, resp) => {
                            if (err) {
                                console.log('ERROR: Unable to grant access to user after removing invite.');
                                res.json({message: 'Database error in granting access'});
                            } else {
                                console.log('Invite successfully accepted, removed, and access granted');
                                res.json({message: 'Invite accepted, access granted'});
                            }
                        })
                    }
                })
            }
        }    
    } catch (err) {
        onError(res, 'Error while adding tournament to db', err);
    }
}