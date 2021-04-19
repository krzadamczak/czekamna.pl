const express = require('express');
const path = require('path');
const app = express();
const indexRoute = require(path.join(__dirname, 'routes', 'index.js'));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRoute);

app.listen(3000, () => {
    console.log('Serwer działa');
});