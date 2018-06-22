import { Request, Response, NextFunction } from "express";
import { Tournament } from './../../models/tournamentModel';
import { User } from './../../models/userModel';
import { onError } from "../onError";
import * as mongoose from "mongoose";
import { ITournament } from "../../interfaces/tournament";
import { IUser } from "../../interfaces/user";

export async function removeInvite(req: Request, res: Response, next: NextFunction) {
    console.log('Endpoint for removing invite hit');
    try {
        // make sure data fits schema
        if( !req.body.tournId || !req.body.uid ) {
            console.log('Missing required fields');
            throw new TypeError('Missing fields');
        }

        // make sure invite exists
        const userResult:IUser = await User.findOne({uid: req.body.uid});
        if (!userResult) {
            console.log('User does not exist');
            res.json({message: 'Cannot remove invite to user because user does not exist'});
        } else {
            console.log('User exists');
           if (!userResult.invites || userResult.invites.filter(invite => invite.tournId === req.body.tournId).length > 0) {
               res.json({message: 'There is no invite from the tournament to remove'})
           } else {
               console.log('Removing invite..');
               User.update({uid: req.body.uid}, {
                    $pull: {
                        invites: {
                            tournId: req.body.tournId
                        }
                    }
               }, (err, resp) => {
                   if (err) {
                       console.log('Database error removing invite');
                       res.json({message: 'Database error removing invite'});
                   } else {
                       console.log('Invite successfully removed');
                       res.json({message: 'Invite successfully removed'});
                   }
               })
           }
        }    
    } catch (err) {
        onError(res, 'Error while adding tournament to db', err);
    }
}