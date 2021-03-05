import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export class App extends React.Component {
  constructor() {
    super();
    this.state = { user: null };
  }

  setPlayer = async () => {
    const res = await axios.get('/players');
    cookies.set(res.data, res.data, { path: '/' });
    console.log(`Total players: ${res.data}`);
    let user = cookies.get(res.data)
    this.setState({user});
  };

  render() {
    return (
      <div>
        Game
        <button onClick={this.setPlayer}>Player</button>
        You are user: {this.state.user}
      </div>
    );
  }
}
