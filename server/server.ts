import * as express from 'express';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { initAPI } from './api/api';
import * as bodyParser from 'body-parser';
import * as admin from 'firebase-admin';


dotenv.config();

// init app/port
const app:express.Application = express();
const port:number = 8080;

// connect to db
mongoose.connect(process.env.MONGODATABASE);
// display message on connect
mongoose.connection.on('connected', () => {
    console.log('Connected to databse ' + process.env.MONGODATABASE);
});
// display message on error
mongoose.connection.on('error', (err) => {
    console.log('Database error: ', err)
});

// middleware
app.use(bodyParser.json());

// initialize firebase sdk
admin.initializeApp({
    credential: admin.credential.cert({
        clientEmail: String(process.env.FBCLIENTEMAIL),
        privateKey:  process.env.FBPRIVKEY.replace(/\\n/g, '\n'),
        projectId: String(process.env.FBPROJID)
    })
})

// path check
app.use ( async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {  // This prevents any API calls without a valid token. Also stores the userID in the request for future use
        const authHeader = req.get('Authorization');
        if (!authHeader) { throw new Error('No Authorization header present'); }
        const token = authHeader.slice(7);
        console.log('token', token);
        const decodedToken = await admin.auth().verifyIdToken(token);
        // console.log('decoded token', decodedToken);
        console.log(`expiration date: ${decodedToken.exp} vs ${Math.floor(Date.now() / 1000)}`)
        if (decodedToken.exp < Math.floor(Date.now() / 1000)) {
            console.log('Token expired');
            throw new Error ('Token Expired');
        } else {
            console.log('Token not expired');
        }
        req['user'] = decodedToken.uid;
        next();
    } catch (err) {
        console.log(err);
        const error = new Error(' Invalid Token ');
        error.name = 'UnauthorizedError';
        next(error);
    }
});

// cors
app.use( (req:express.Request, res:express.Response, next:express.NextFunction) => {
    var allowedOrigins = ['http://192.168.99.100:4200', 'http://localhost:4200']; // origin whitelist
    var origin:any = req.headers.origin;
    if(Array.isArray(origin)) {origin = origin[0];}
    if(allowedOrigins.indexOf(origin) > -1){
         res.header('Access-Control-Allow-Origin', origin);
    }
    // res.header("Access-Control-Allow-Origin", "http://192.168.99.100:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
})

initAPI(app);

console.log('Testing server file');

app.listen(port, () => { console.log(`Server is listening on port ${port}. Current date is ${new Date()}`); });