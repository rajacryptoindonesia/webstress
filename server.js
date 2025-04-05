const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Function to run index.js and stream output to client
function runIndexJs(input, socket) {
  try {
    // Check if index.js exists
    if (!fs.existsSync(path.join(__dirname, 'index.js'))) {
      socket.emit('output', { type: 'error', message: 'Error: index.js not found!' });
      return;
    }

    // Spawn a Node.js process to run index.js
    // We use spawn instead of exec for better handling of continuous output
    const nodeProcess = spawn('node', [path.join(__dirname, 'index.js')]);
    
    // Send input to the process if provided
    if (input) {
      nodeProcess.stdin.write(input + '\n');
    }
    
    // Stream stdout data
    nodeProcess.stdout.on('data', (data) => {
      socket.emit('output', { type: 'stdout', message: data.toString() });
    });
    
    // Stream stderr data
    nodeProcess.stderr.on('data', (data) => {
      socket.emit('output', { type: 'error', message: data.toString() });
    });
    
    // Handle process completion
    nodeProcess.on('close', (code) => {
      if (code !== 0) {
        socket.emit('output', { 
          type: 'info', 
          message: `Process exited with code ${code}`
        });
      }
    });
    
    // Handle process errors
    nodeProcess.on('error', (err) => {
      socket.emit('output', { type: 'error', message: `Process error: ${err.message}` });
    });
    
    // Return the process so we can handle it later if needed
    return nodeProcess;
  } catch (error) {
    socket.emit('output', { type: 'error', message: `Error: ${error.message}` });
    return null;
  }
}

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('New client connected');
  
  // Initialize by running index.js
  runIndexJs('', socket);
  
  // Handle incoming input from client
  socket.on('input', (input) => {
    console.log(`Received input: ${input}`);
    runIndexJs(input, socket);
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
});
