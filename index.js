import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// Serve static files from React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let players = 0;
app.get('/players', (req, res) => {
  players++;
  res.json(players);
})

// Catch all requests and return index
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
