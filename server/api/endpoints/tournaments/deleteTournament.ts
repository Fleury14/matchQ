import { Request, Response, NextFunction } from "express";
import { Tournament } from './../../models/tournamentModel';
import { onError } from "../onError";
import * as mongoose from "mongoose";

export async function deleteTournament (req: Request, res: Response, next: NextFunction) {
    try {
        console.log('Delete endpoint hit');
        // make sure requred fields are present
        if (!req.body.name || !req.body.uid) {
            throw new TypeError('Missing fields');
        }

        // make sure user in ls matches user token on request
        if (req['user'] !== req.body.uid) {
            res.status(401).json({message: 'Token for user doesnt match'})
        }

        // search for a matching record so we don't try to delete nothing
        await Tournament.findOne({name: req.body.name}, (err, result) => {
            //  throw an error if it doesnt exist
            if (!result) {
                console.log('No matching record found');
                res.status(500).json({message: 'No record matching name found'});
            } else {

                // make sure person making the request actually owns said tournament
                if (req.body.uid !== result.belongsTo) {
                    console.log('403');
                    res.status(403).json({message: 'Tried to delete a tournament that wasnt yours'})
                } else {
                    console.log(`Deleting record that matches ${req.body.name}`)
                    Tournament.deleteOne({name: req.body.name}, (err) => {
                        if (err) {
                            console.log('Error in database delete');
                            res.status(500).json({message: 'Error in database deleter'});
                        } else {
                            console.log('Successfull delete');
                            res.status(200).json({message: 'Successful delete'});
                        }
                    });                    
                }

            }
        });

    } catch (err) {
        onError(res, 'Error during delete', err);
    }
}