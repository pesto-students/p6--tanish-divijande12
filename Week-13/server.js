const express = require('express');
const request = require('request');
const pug = require('pug');
const path = require('path');
const app = express();

const API_KEY = '9f20a56fb529066e0c3bb4c810e0280a';
// set pug as the view engine
app.set('view engine', 'pug');
app.set('forecast', './views');

app.get('/forecast', (req, res) => {
    const apiKey = API_KEY;
    const city = req.query.city;
    const page = req.query.page || 1;
    const perPage = req.query.perPage || 10;

    request(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const data = JSON.parse(body);
            console.log(data)
            const filteredData = data.list.filter(item => {
                console.log(item.name)
                return item.name === city;
            });
            const paginatedData = filteredData.slice((page - 1) * perPage, page * perPage);
            console.log(paginatedData)
            // if (paginatedData.length) {
                res.render('forecast', { forecast: paginatedData });
            // }
        } else {
            // res.render('error', { error: error });
        }
    });
});

// forecast of city based on user input days
app.get('/forecast/:city', (req, res) => {
    const city = req.params.city;
    const apiKey = API_KEY;
    const days = req.query.days || 3; // default is 3 days

    request(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=${days}&appid=${apiKey}`, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const data = JSON.parse(body);
            console.log(data)
            res.json(data);
        } else {
            res.json({ error: error });
        }
    });
});

//   current weather condition of the city 

app.get('/current/:city', (req, res) => {
    const city = req.params.city;
    const apiKey = API_KEY;

    request(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const data = JSON.parse(body);
            console.log(data)
            res.json(data);
        } else {
            res.json({ error: error });
        }
    });
});

// data for specific date and time

app.get('/forecast', (req, res) => {
    const apiKey = API_KEY;
    const city = req.query.city;
    const date = req.query.date;
    const time = req.query.time;

    request(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const data = JSON.parse(body);
            const filteredData = data.list.filter(item => {
                return item.dt_txt.includes(date) && item.dt_txt.includes(time);
            });
            res.json(filteredData);
        } else {
            res.json({ error: error });
        }
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
