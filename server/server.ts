import * as express from 'express';
import * as path from 'path';
import { initAPI } from './api/api';

const app:express.Application = express();
const port:number = 8080;

initAPI(app);

console.log('Testing server file');

app.listen(port, () => { console.log(`Server is listening on port ${port}. Current date is ${new Date()}`); });