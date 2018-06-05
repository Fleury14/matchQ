import * as express from 'express';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { initAPI } from './api/api';
import * as bodyParser from 'body-parser';

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

initAPI(app);

console.log('Testing server file');

app.listen(port, () => { console.log(`Server is listening on port ${port}. Current date is ${new Date()}`); });