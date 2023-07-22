import express from 'express';
import cors from 'cors';
import path from 'path';
import {ViewEngine} from '@themost/ejs';

function getApplication() {
    // init app
    const app = express();
    // https://github.com/expressjs/cors#usage
    app.use(cors());

    // https://expressjs.com/en/guide/using-template-engines.html
    app.engine('ejs', ViewEngine.express());
    app.set('view engine', 'ejs');
    app.set('views', path.resolve(__dirname, 'views'));

    app.get('/', (req, res) => {
        return res.render('index');
    });

    // and return
    return app;
}

export {
    getApplication
}