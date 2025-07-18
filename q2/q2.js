
const express = require('express');
const app= express();
const http = require('http');
const static = require('node-static');
const url = require('url');

// Serve files from the 'public' directory
const fileServer = new static.Server('./public');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '/') {
        req.url = '/q2.html';
        fileServer.serve(req, res);
    } else if (parsedUrl.pathname === '/gethello') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Hello NodeJS!!!' }));
    } else {
        // Serve other static files
        fileServer.serve(req, res);
    }
});

server.listen(8000, () => {
    console.log('Server running at http://localhost:8000/');
});