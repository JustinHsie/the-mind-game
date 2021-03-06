import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { Game } from './Game/game.js';
import { Server } from 'socket.io';
import { createServer } from 'http';

const app = express();
const server = createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Gameplay
let game = null;

// New game
app.get('/game/new', (req, res) => {
  game = new Game();
  res.json(game);
});

// Get current game
app.get('/game', (req, res) => {
  res.json(game);
});

// Add Player
app.post('/players/new', (req, res) => {
  let { name } = req.body;
  let id = game.addPlayer(name);
  res.json(id);
});

// Deal cards
app.get('/cards/deal', (req, res) => {
  game.dealCards();
  res.sendStatus(200);
});

// Play card
app.post('/cards/play', (req, res) => {
  let { id } = req.body;
  game.playCard(id);
  res.sendStatus(200);
});

// Get player
app.get('/players/');

// Socket io listen
io.on('connection', socket => {
  socket.on('event', () => {
    io.emit('event', game);
  });
});

// Catch all requests and return index
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Port
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
