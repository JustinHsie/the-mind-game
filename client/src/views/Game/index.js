import React from 'react';
import axios from 'axios';
import { Game as GameComponent } from '../../components/Game';
import { Menu } from '../../components/Menu';
import { io } from 'socket.io-client';
import { DisplayCard } from '../../components/DisplayCard';
const socket = io('/');

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      hand: [],
      topCard: null,
      game: null,
      lvl: 1,
      pileTop: '∆',
      players: [],
      smallestPlayer: null,
      pass: false,
      showStart: true,
    };
    socket.on('event', game => {
      let lvl = game.lvl;
      let pileTop = game.pile[game.pile.length - 1] || '∆';
      let players = game.players;
      let topCard = null;
      let hand = null;
      let smallestPlayer = game.smallestPlayer;
      if (this.state.id !== '' && players.length > 0) {
        let player = players[this.state.id];
        topCard = player.hand[player.hand.length - 1];
        hand = player.hand;
      }
      this.setState({
        hand,
        topCard,
        game,
        lvl,
        pileTop,
        players,
        smallestPlayer,
      });
    });
    socket.on('newGame', game => {
      this.setState({
        id: '',
        name: '',
        hand: [],
        topCard: null,
        game,
        lvl: 1,
        pileTop: '∆',
        players: [],
        smallestPlayer: null,
        showStart: true,
      });
      this.destroySession();
    });
    socket.on('continue', () => {
      this.setState({ pass: false });
    });
    socket.on('pass', () => {
      this.setState({ pass: true });
    });
    socket.on('showStart', start => {
      this.setState({ showStart: start });
    });
  }

  componentDidMount() {
    this.getSession();
    this.getCurrentGame();
  }

  componentWillUnmount() {
    socket.disconnect();
  }

  getSession = async () => {
    let res = await axios.get('/session');
    let id = res.data;
    this.setState({ id });
  };

  destroySession = async () => {
    await axios.delete('/session');
  };

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  newGame = async () => {
    await axios.get('/game/new');
    socket.emit('newGame');
  };

  getCurrentGame = async () => {
    await axios.get('/game');
    socket.emit('event');
  };

  addPlayer = async () => {
    let name = this.state.name;
    let res = await axios.post('/players/new', { name });
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
    const displayCard = (
      <DisplayCard
        smallestPlayer={this.state.smallestPlayer}
        pass={this.state.pass}
        lvl={this.state.lvl}
        pileTop={this.state.pileTop}
      />
    );
    return (
      <div className="p-m-3">
        <Menu onNewGameClick={this.newGame} />
        <GameComponent
          id={this.state.id}
          name={this.state.name}
          showStart={this.state.showStart}
          onNameChange={this.handleNameChange}
          onJoinClick={this.addPlayer}
          lvl={this.state.lvl}
          displayCard={displayCard}
          pileTop={this.state.pileTop}
          smallestPlayer={this.state.smallestPlayer}
          players={this.state.players}
          onDealClick={this.dealCards}
          onPlayCardClick={this.playCard}
          hand={this.state.hand}
          topCard={this.state.topCard}
        />
      </div>
    );
  }
}
