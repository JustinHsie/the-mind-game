export class PlayerDb {
  constructor() {
    this.players = [];
  }

  addPlayer = name => {
    this.players.push({
      name,
      hand: [],
    });
    console.log(this.players);
  };
}
