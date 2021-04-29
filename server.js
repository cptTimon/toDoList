const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());

let tasks = [];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/src/app.js'));
});

app.use((req,res) => {
  return res.status(404).json({
    message: 'Not found...',
  });
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! His id is ' + socket.id);
  socket.emit('updateTasks', tasks);
  socket.on('removeTask', (index) => {
    tasks.filter(task => tasks.indexOf(task) !== index);
    socket.broadcast.emit('removeTask', index);
  });
  socket.on('addTask', (name) => {
    tasks.push(name);
    socket.broadcast.emit('addTask', name);
  });
});
