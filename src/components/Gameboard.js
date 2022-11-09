import Square from './Square';

export default class Gameboard {
  #board = Array(10)
    .fill()
    .map(() =>
      Array(10)
        .fill()
        .map(() => new Square())
    );

  get board() {
    return this.#board;
  }

  placeShip(ship, location, direction) {
    const placement = Gameboard.calculatePlacement(ship, location, direction);

    for (let i = 0; i < placement.length; i += 1) {
      const coords = placement[i];
      const x = coords[0];
      const y = coords[1];

      this.#board[x][y].ship = ship;
    }
  }

  canPlace(ship, location, direction) {
    const placement = Gameboard.calculatePlacement(ship, location, direction);

    for (let i = 0; i < placement.length; i += 1) {
      const coords = placement[i];
      const x = coords[0];
      const y = coords[1];

      if (x < 0 || x > 9) return false;
      if (y < 0 || y > 9) return false;

      if (this.#board[x][y].ship) return false;

      const offsets = [
        [-1, 1],
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
        [-1, -1],
        [-1, 0],
      ];

      for (let n = 0; n < offsets.length; n += 1) {
        const offset = offsets[n];
        const [dX, dY] = [offset[0], offset[1]];

        if (this.#board[x + dX]?.[y + dY]?.ship) return false;
      }
    }

    return true;
  }

  static calculatePlacement(ship, location, direction) {
    const placement = [];

    for (let i = 0; i < ship.length; i += 1) {
      const x = location[0] + (direction === 'horizontal' ? i : 0);
      const y = location[1] + (direction === 'vertical' ? i : 0);
      placement.push([x, y]);
    }

    return placement;
  }

  receiveAttack(x, y) {
    this.#board[x][y].attack();

    if (this.#board[x][y].ship) this.#board[x][y].ship.hit();
  }

  get allSunk() {
    for (let i = 0; i < this.#board.length; i += 1) {
      const array = this.#board[i];

      for (let j = 0; j < array.length; j += 1) {
        const square = array[j];

        if (!!square.ship && !square.wasAttacked) return false;
      }
    }

    return true;
  }
}
