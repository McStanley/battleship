import Gameboard from './Gameboard';

export default class Player {
  #name;

  #isHuman;

  #gameboard = new Gameboard();

  constructor(name, isHuman) {
    this.#name = name;
    this.#isHuman = isHuman;
  }

  get name() {
    return this.#name;
  }

  get isHuman() {
    return this.#isHuman;
  }

  get gameboard() {
    return this.#gameboard;
  }

  static attack(player, coords) {
    const [x, y] = [coords[0], coords[1]];

    player.gameboard.receiveAttack(x, y);
  }
}
