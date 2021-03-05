import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { Game } from './Game/Game';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// Serve static files from React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Gameplay
let game = null;

app.get('/game/new', (req, res) => {
  game = new Game();
})

app.post('/players/new', (req, res) => {
  game.addPlayer();
  res.sendStatus(200);
});

app.get('/cards/deal', (req, res) => {
  game.dealCards();
  res.sendStatus(200);
});

app.post('/cards/play', (req, res) => {
  game.playCard();
  res.sendStatus(200);
});

// Catch all requests and return index
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
