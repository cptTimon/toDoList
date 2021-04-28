const express = require('express');
const socket = require('socket.io');
const cors = require('cors');



const app = express();

app.use(cors());

let tasks = [];

app.use((req,res) => {
  return res.status(404).json({
    message: 'Not found...',
  });
});

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);
