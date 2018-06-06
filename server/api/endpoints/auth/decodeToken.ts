import { onError } from "../onError";
import { Request, Response, NextFunction } from "express";
import * as admin from 'firebase-admin';


export async function decodeToken(req: Request, res: Response, next: NextFunction) {
    try {
        if(!req.body.token) {
            throw new Error('Missing token');
        } 
        admin.auth().verifyIdToken(req.body.token).then( (decodedToken) => {
            res.json({message: 'Successful Decode', result: decodedToken});
        })

    } catch (err) {
        onError(res, 'Error decoding token', err);
    }
}