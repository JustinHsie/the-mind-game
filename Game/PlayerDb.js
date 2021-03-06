export class PlayerDb {
  constructor() {
    this.players = [];
  }

  addPlayer = name => {
    this.players.push({
      name,
      hand: [],
    });
    return this.players.length;
  };
}
