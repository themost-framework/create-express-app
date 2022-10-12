import express from 'express';
import cors from 'cors';

function getApplication() {
    // init app
    const app = express();
    // https://github.com/expressjs/cors#usage
    app.use(cors());

    app.get('/', (req, res) => {
        res.send(`
        <h2>Express.js template</h2>
        `)
    });

    // and return
    return app;
}

export {
    getApplication
}