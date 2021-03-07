import express from 'express';
import session from 'express-session';
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

// Session

const sessionConfig = {
  name: 'session',
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 12 },
};

if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  sessionConfig.cookie.secure = true; // serve secure cookies
}

app.use(session(sessionConfig));

// Get session
app.get('/session', function (req, res) {
  res.json(req.session.playerId);
});

// Destroy session
app.delete('/session', function (req, res) {
  req.session.destroy();
});

// Game setup initial
let game = new Game();

// New game
app.get('/game/new', (req, res) => {
  game = new Game();
  io.emit('continue');
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
  req.session.playerId = id;
  res.json(id);
});

// Deal cards
app.get('/cards/deal', (req, res) => {
  game.dealCards();
  io.emit('showStart', false);
  res.sendStatus(200);
});

// Play card
app.post('/cards/play', (req, res) => {
  io.emit('continue');
  let { id } = req.body;
  let outcome = game.playCard(id);
  if (outcome === 'PASS') {
    io.emit('pass');
    io.emit('showStart', true);
  }
  res.sendStatus(200);
});

// Get player
app.get('/players/');

// Socket io listen
io.on('connection', socket => {
  socket.on('event', () => {
    io.emit('event', game);
  });
  socket.on('newGame', () => {
    io.emit('newGame', game);
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
