import express from 'express'
import dotenv from 'dotenv';
import { bootstrap } from './src/app.controller.js';

dotenv.config();
const app = express();
const port = process.env.PORT;

bootstrap(app, express);

app.listen(port, () => {
    console.log(`app run on port ${port}`)
})
