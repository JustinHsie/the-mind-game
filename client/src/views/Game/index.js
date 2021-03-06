import React from 'react';
import axios from 'axios';
import { Game as GameComponent } from '../../components/Game';
import { Menu } from '../../components/Menu';

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: null, game: null };
  }

  componentDidMount() {
    this.newGame();
  }
  
  newGame = async () => {
    let res = await axios.get('/game/new');
    let game = res.data;
    this.setState({ game });
    console.log(this.state.game);
  };

  getCurrentGame = async () => {
    let res = await axios.get('/game');
    let game = res.data;
    this.setState({ game });
    console.log(this.state.game);
  };

  addPlayer = async () => {
    let res = await axios.post('/players/new');
    let id = res.data;
    this.setState({ id });
    console.log(this.state.id);

    this.getCurrentGame();
  };

  dealCards = async () => {
    await axios.get('/cards/deal');
    this.getCurrentGame();
  };

  playCard = async () => {
    let id = this.id;
    await axios.post('/cards/play', { id });
    this.getCurrentGame();
  };

  render() {
    return (
      <div>
        <Menu onNewGameClick={this.newGame}/>
        <button onClick={this.newGame}>New Game</button>
        <button onClick={this.addPlayer}>Add Player</button>
        <button onClick={this.dealCards}>Deal Cards</button>
        <button onClick={this.playCard}>Play Card</button>
        <GameComponent />
      </div>
    );
  }
}
