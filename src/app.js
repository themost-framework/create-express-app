import express from 'express';
import cors from 'cors';

const app = express();
// https://github.com/expressjs/cors#usage
app.use(cors());

export {
    app
}