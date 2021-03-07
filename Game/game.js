export class Game {
  constructor() {
    this.players = [];
    this.totalCards = 0;
    this.pile = [];
    this.lvl = 1;
    this.smallestPlayer = null;
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

  addPlayer = name => {
    let id = this.players.length;
    this.players.push({
      id,
      name,
      hand: [],
    });
    return id;
  };

  dealCards = () => {
    let deck = this.getShuffledDeck();
    this.dealCardsHelp(this.players, deck);
    return this.players;
  };

  getPlayer = playerId => {
    return this.players[playerId];
  };

  playCard = playerId => {
    let player = this.getPlayer(playerId);
    let card = player.hand.pop();
    this.pile.push(card);

    // Check if anyone else has smaller cards
    let smallerPlayers = this.players.filter(
      player => player.hand[player.hand.length - 1] < card
    );
    if (smallerPlayers.length > 0) {
      let smallest = smallerPlayers[0];
      for (player of smallerPlayers) {
        if (
          player.hand[player.hand.length - 1] <
          smallest.hand[smallest.hand.length - 1]
        ) {
          smallest = player;
        }
      }
      this.smallestPlayer = smallest;
    }
    // Level passed
    if (this.pile.length === this.totalCards) {
      this.lvl++;
      return 'PASS';
    }
  };
}
