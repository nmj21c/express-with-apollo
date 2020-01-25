// const express = require('express');

import express from "express";
const app = express();
const port = process.env.PORT || 3000;
const mockResponse = {
    foo: 'bar',
    bar: 'poo'
};

app.get('/api', (req, res) => {
    res.send(mockResponse);
});

app.get('/', (req, res) => {
    res.status(200).send('Hello world');
});

app.listen(port, () => console.log(`App lintening on port : ${port}`));