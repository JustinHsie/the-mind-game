import React from 'react';
import axios from 'axios';
import { Game as GameComponent } from '../../components/Game';
import { Menu } from '../../components/Menu';
import { io } from 'socket.io-client';
const socket = io();

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: '',
      hand: [],
      topCard: null,
      game: null,
      lvl: 1,
      pileTop: 0,
      players: [],
    };
    socket.on('event', game => {
      let lvl = game.lvl;
      let pileTop = game.pile[game.pile.length - 1];
      let players = game.players;
      let player = game.players[this.state.id];
      let topCard = player.hand[player.hand.length - 1];
      let hand = player.hand;
      this.setState({ hand, topCard, game, lvl, pileTop, players });
    });
  }

  componentWillUnmount() {
    socket.disconnect();
  }

  newGame = async () => {
    await axios.get('/game/new');
    this.setState({
      id: null,
      name: '',
      hand: [],
      topCard: null,
      game: null,
      lvl: 1,
      pileTop: 0,
      players: [],
    });
  };

  getCurrentGame = async () => {
    await axios.get('/game');
    socket.emit('event');
  };

  addPlayer = async () => {
    let res = await axios.post('/players/new', { name: 'Me' });
    let id = res.data;
    this.setState({ id });
    this.getCurrentGame();
  };

  dealCards = async () => {
    await axios.get('/cards/deal');
    this.getCurrentGame();
  };

  playCard = async () => {
    let id = this.state.id;
    await axios.post('/cards/play', { id });
    this.getCurrentGame();
  };

  render() {
    return (
      <div className="p-m-3">
        <Menu onNewGameClick={this.newGame} />
        <button onClick={this.addPlayer}>Add Player</button>
        <button onClick={this.dealCards}>Deal Cards</button>
        <GameComponent
          lvl={this.state.lvl}
          pileTop={this.state.pileTop}
          players={this.state.players}
          onPlayCardClick={this.playCard}
          hand={this.state.hand}
          topCard={this.state.topCard}
        />
      </div>
    );
  }
}
