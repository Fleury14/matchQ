import { Request, Response, NextFunction } from "express";
import { User } from './../../models/userModel';
import { onError } from "../onError";
import * as mongoose from "mongoose";

export async function checkUserUid(req: Request, res: Response, next: NextFunction) {
    console.log('Endpoint for checking if user with uid exists');
    try {

        // field check
        if (!req.body.uid) {
            throw new TypeError('Missing Fields')
        }

        // make sure user doesn't exist by checking uid
        const result = await User.findOne({uid: req.body.uid});

        if (result) {
            console.log('User exists');
            res.json({message: 'UID Exists on database', result: true, user: result});
        } else {
            console.log('User does not exist on database');
            res.json({messgae: 'UID does not exists on database', result: false});
        }

    } catch (err) {
        onError(res, 'Error adding user', err)
    }
}