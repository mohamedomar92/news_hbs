const express = require('express');
const request = require('request');
const hbs = require('hbs');

const app = express();

const PORT = 5000;

const path = require('path');

app.set('view engine', 'hbs');

const viewPath = path.join(__dirname, '../templates/views');
app.set('views', viewPath);

const partialPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialPath);

app.get('', (req, response) => {
  const url =
    'https://newsapi.org/v2/everything?q=egypt&from=2021-06-11&sortBy=publishedAt&apiKey=ddbf7d434e71404b974e21058bb0e097';
  request({ url, json: true }, (err, res) => {
    if (res.body.error) {
      console.log('Unable to find news');
    } else {
      response.render('index', {
        title: 'Home Page',
        name: 'Mohamed Omar',
        articles: res.body.articles,
      });
    }
  });
});

app.listen(PORT, () => {
  console.log('listening on port 5000');
});
