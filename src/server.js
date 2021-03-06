import express  from 'express';
import React from 'react';
import ReactDom from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import { Provider } from 'react-redux';
import configureStore from './store';
import bodyParser from 'body-parser';

let api_router = require('./api_routes');
let db = require('./db');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', api_router);

app.use((req, res) => {
    const store = configureStore();

    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {

        if (redirectLocation) {
            return res.redirect(301, redirectLocation.pathname + redirectLocation.search);
        }

        if (error) {
            return res.status(500).send(error.message);
        }

        if (!renderProps) {
            return res.status(404).send('Not found');
        }

        // const componentHTML = ReactDom.renderToString(<RouterContext {...renderProps} />);

        const componentHTML = ReactDom.renderToString(
            <Provider store={store}>
                <RouterContext {...renderProps} />
            </Provider>
        );

        return res.end(renderHTML(componentHTML));
    });
});



const PORT = process.env.PORT || 3001;
const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8050' : '/';

function renderHTML(componentHTML) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Hello React</title>
          <link rel="stylesheet" href="${assetUrl}/public/assets/styles.css">
        </head>
        <body>
            <div id="js-view">${componentHTML}</div>
            <div id="dev-tools"></div>
            <script type="application/javascript" src="${assetUrl}/public/assets/bundle.js"></script>
        </body>
        </html>
    `;
}

app.listen(PORT, () => {
    console.log(`Server listening on: ${PORT}`);
});