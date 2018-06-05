import { onError } from "../onError";
import { Request, Response, NextFunction } from "express";
import * as admin from 'firebase-admin';


admin.initializeApp({
    credential: admin.credential.cert({
        clientEmail: String(process.env.FBCLIENTEMAIL),
        privateKey:  process.env.FBPRIVKEY.replace(/\\n/g, '\n'),
        projectId: String(process.env.FBPROJID)
    })
})

export async function decodeToken(req: Request, res: Response, next: NextFunction) {
    try {
        if(!req.body.token) {
            throw new Error('Missing token');
        } 
        console.log('Incoming token: ', req.body.token);
        admin.auth().verifyIdToken(req.body.token).then( (decodedToken) => {
            res.json({message: 'Successful Decode', result: decodedToken});
        })

    } catch (err) {
        onError(res, 'Error decoding token', err);
    }
}