import { Request, Response, NextFunction } from "express";
import { User, IUserModel } from './../../models/userModel';
import { onError } from "../onError";
import * as mongoose from "mongoose";

export async function addUser(req: Request, res: Response, next: NextFunction) {
    console.log('Endpoint for adding user hit');
    try {

        // field check
        if (!req.body.displayName || !req.body.email || !req.body.uid) {
            throw new TypeError('Missing Fields')
        }

        // make sure user doesn't exist by checking uid
        const result = await User.findOne({uid: req.body.uid});

        if (result) {
            console.log('User already exists');
            res.json({message: 'Cannot add: User already exists'});
        } else {
            const newUser:IUserModel = new User({
                displayName: String(req.body.displayName),
                email: String(req.body.email),
                subscriptions: [],
                uid: String(req.body.uid),
                invites: []
            });

            console.log(`Saving user ${newUser.displayName} to database`);

            // execute save
            await newUser.save( (err, newUser) => {
                if (err) {
                    throw new Error('Error in database: ' + err);
                } else {
                    console.log('User add success!');
                    res.json({message: 'Successfull add'});
                }
            } )

        }

    } catch (err) {
        onError(res, 'Error adding user', err)
    }
}