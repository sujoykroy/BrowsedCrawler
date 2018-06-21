'use strict';

const express = require('express');
const puppeteer = require('puppeteer');
var bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/fetch', async (req, res) => {
    const url = req.body.url;
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    console.log(url)
    await page.goto(url, {waitUntil: ['networkidle2']});
    const pageContent = await page.content();

    res.set('Content-Type', 'text/plain');
    res.send(pageContent);
    await browser.close();
});

const server = app.listen(process.env.PORT || 9000, err => {
  if (err) return console.error(err);
  const port = server.address().port;
  console.info(`App listening on port ${port}`);
});
module.exports = app;
