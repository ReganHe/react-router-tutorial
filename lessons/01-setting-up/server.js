/**
 * Created by heoo442 on 2016/6/5.
 */
import express from 'express'
import path from 'path'
import compression from 'compression'
import React from 'react';
import {renderToString} from 'react-dom/server';
import {match,RouterContext} from 'react-router';
import  routes from './modules/routes';

var app = express()
app.use(compression()); ////must be first
app.use(express.static(path.join(path.resolve(__dirname), 'public'), {index: false}));

app.get('*', (req, res) => {
    match({routes: routes, location: req.url}, (err, redirect, props)=> {
        if (err) {
            res.status(500).send(err.message);
        } else if (redirect) {
            res.redirect(redirect.pathname + redirect.search);
        } else if (props) {
            const appHtml = renderToString(<RouterContext {...props}/>);
            res.send(renderPage(appHtml));
        } else {
            res.status(404).send('Not Found');
        }
    });
});

function renderPage(appHtml) {
    return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>My First React Router App</title>
    <link rel="stylesheet" href=/index.css>
    <div id=app>${appHtml}</div>
    <script src="/bundle.js"></script>
    `;
}

var PORT = process.env.PORT || 8088
app.listen(PORT, function () {
    console.log('Production Express server running at localhost:' + PORT)
})


