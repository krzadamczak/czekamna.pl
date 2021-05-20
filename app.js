const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const indexRoute = require(path.join(__dirname, 'routes', 'index.js'));

dotenv.config({ path: path.join(__dirname, 'config', '.env') });

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mongo33.mydevil.net/${process.env.DB_NAME}`, { useNewUrlParser: true });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRoute);

app.listen(3000, () => {
    console.log('Serwer działa');
});