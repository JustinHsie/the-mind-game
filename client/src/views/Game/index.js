import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export class Game extends React.Component {
  constructor(props) {
    super(props);
    cookies.set('1', 'Player1', { path: '/' });
    this.state = { id: '' };
    this.card = 45;
    this.setPlayer();
  }

  setPlayer = async () => {
    const res = await axios.get('/player');
    let id = res.data;
    console.log(id);
    cookies.set(id, id, { path: '/' });
    this.setState({ id });
  };

  addPlayer = async () => {
    await axios.post('/players/new');
  };

  dealCards = async () => {
    await axios.get('/cards/deal');
  };

  playCard = async () => {
    let id = this.id;
    let card = this.card;
    await axios.post('/cards/play', { id });
  };

  render() {
    return (
      <div>
        Game
        <button onClick={this.addPlayer}>Add Player</button>
        <button onClick={this.dealCards}>Deal Cards</button>
        <button onClick={this.playCard}>Play Card</button>
      </div>
    );
  }
}
