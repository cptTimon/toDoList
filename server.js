const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

let tasks = [];


app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

app.use((req,res) => {
  return res.status(404).json({
    message: 'Not found...',
  });
});

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);
