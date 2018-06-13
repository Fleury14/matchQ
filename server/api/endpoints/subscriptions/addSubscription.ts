import { Request, Response, NextFunction } from "express";
import { Tournament } from './../../models/tournamentModel';
import { onError } from "../onError";
import * as mongoose from "mongoose";
import { ITournament } from "../../interfaces/tournament";

export async function addSubscription(req: Request, res: Response, next: NextFunction) {
    console.log('Endpoint for adding subscription hit');
    try {
        // make sure data fits schema
        if( !req.body.name || !req.body.uid ) {
            console.log('Missing required fields');
            throw new TypeError('Missing fields');
        }

        // make sure tournament exists
        const result:ITournament = await Tournament.findOne({name: req.body.name});
        console.log('Result:', result);
        if (!result) {
            console.log('Tournament does not exist');
            res.json({message: 'Cannot add subscriptions to a tournament that doesnt exist'});
        } else {
            // make sure user isn't already subscribed
            if ( result.subscribers.includes( req.body.uid ) ) {
                res.json({message: 'User is already subscribed'})
            } else {
                await Tournament.update(
                    { name: req.body.name },
                    {
                        $addToSet: {
                            subscribers: req.body.uid
                        }
                    }, (err, resp) => {
                        console.log(`User ${req.body.uid} subscribed to tournament ${req.body.name}`);
                        res.json({message: 'Subscriber added'});
                    }
                )
            }
        }     
    } catch (err) {
        onError(res, 'Error while adding tournament to db', err);
    }
}