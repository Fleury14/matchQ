import { Request, Response, NextFunction } from "express";
import { Tournament } from './../../models/tournamentModel';
import { onError } from "../onError";
import * as mongoose from "mongoose";

export async function deleteTournament (req: Request, res: Response, next: NextFunction) {
    try {
    // make sure requred fields are present
    if (!req.body.name) {
        throw new TypeError('Missing fields');
    }

    // search for a matching record so we don't try to delete nothing
    await Tournament.findOne({name: req.body.name}, (err, result) => {
        //  throw an error if it doesnt exist
        if (!result) {
            console.log('No matching record found');
            res.status(500).json({message: 'No record matching name found'});
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
            })
        }
    });

    } catch (err) {
        onError(res, 'Error during delete', err);
    }
}