import { PlayerDb } from 'PlayerDb';

export class Game {
  constructor() {
    this.playerDb = new PlayerDb();
    this.totalCards = 0;
    this.pile = [0];
    this.lvl = 1;
  }

  /**
   * Fisher-Yates shuffle
   * @returns {array} of shuffled cards 1-100
   */
  getShuffledDeck = () => {
    let deck = [];
    for (let i = 1; i <= 100; i++) {
      deck.push(i);
    }

    let len = deck.length;
    let temp = 0;
    let i = 0;

    while (len) {
      i = Math.floor(Math.random() * len--);

      temp = deck[len];
      deck[len] = deck[i];
      deck[i] = temp;
    }

    return deck;
  };

  /**
   * Deal cards helper function
   * @param {array} players
   * @param {array} deck
   * @return {array} players
   */
  dealCardsHelp = (players, deck) => {
    // Reset hand
    players.forEach(player => {
      player.hand = [];
    });

    // Deal cards
    players.forEach(player => {
      // Add lvl number of cards to each player's hand
      for (let i = 0; i < this.lvl; i++) {
        player.hand.push(deck.pop());
        this.totalCards++;
      }
    });

    // Sort player cards in descending order
    players.forEach(player => {
      player.hand.sort((a, b) => b - a);
    });
    return players;
  };

  // Gameplay

  addPlayer = () => {
    this.playerDb.addPlayer();
  };

  dealCards = () => {
    let deck = this.getShuffledDeck();
    let numPlayers = this.playerDb.players;
    let players = this.dealCardsHelp(numPlayers, deck);
    return players;
  };

  getPlayer = playerId => {
    return this.playerDb.players[playerId];
  };

  playCard = playerId => {
    let player = this.getPlayer(1);
    let card = player.hand.pop();

    if (this.pile[this.pile.length - 1] < card) {
      this.pile.push(card);
    }
    if (this.pile.length === this.totalCards) {
      console.log(`Level ${this.lvl} passed!`);
      this.lvl++;
    } else {
      console.log('Game over');
    }
  };
}
