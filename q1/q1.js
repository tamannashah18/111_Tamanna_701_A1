// 1. Develop nodejs application with following requirements:
// - Develop a route "/gethello" with GET method. It displays "Hello NodeJS!!" as response.
// - Make an HTML page and display.
// - Call "/gethello" route from HTML page using AJAX call. (Any frontend AJAX call API can be
// used.)

const express = require('express');
const app= express();

app.use(express.static("./public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/q1.html'); // Serve the HTML page
});
app.get('/gethello', (req, res) => {

});

app.listen(8000);