import Gameboard from './Gameboard';
import Ship from './Ship';

describe('Gameboard', () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test('holds a board array', () => {
    expect(Array.isArray(gameboard.board)).toBeTruthy();
  });

  test('can place a ship in a square', () => {
    const ship = new Ship(1);
    gameboard.placeShip(ship, [1, 2], 'horizontal');
    expect(gameboard.board[1][2].ship).toBe(ship);
  });

  test('can place a ship horizontally', () => {
    const ship = new Ship(2);
    gameboard.placeShip(ship, [3, 3], 'horizontal');
    expect(gameboard.board[3][3].ship).toBe(ship);
    expect(gameboard.board[4][3].ship).toBe(ship);
    expect(gameboard.board[5][3].ship).toBeNull();
  });

  test('can place a ship vertically', () => {
    const ship = new Ship(2);
    gameboard.placeShip(ship, [3, 3], 'vertical');
    expect(gameboard.board[3][3].ship).toBe(ship);
    expect(gameboard.board[3][4].ship).toBe(ship);
    expect(gameboard.board[3][5].ship).toBeNull();
  });

  test('allows to place a ship in an empty square', () => {
    expect(gameboard.canPlace(new Ship(1), [9, 9], 'vertical')).toBeTruthy();
  });

  test('forbids to place a ship outside of the board', () => {
    expect(gameboard.canPlace(new Ship(3), [8, 8], 'horizontal')).toBeFalsy();
    expect(gameboard.canPlace(new Ship(3), [8, 8], 'vertical')).toBeFalsy();
  });

  test('forbids to place a ship in a taken square', () => {
    gameboard.board[3][3].ship = new Ship(1);
    expect(gameboard.canPlace(new Ship(2), [3, 3], 'vertical')).toBeFalsy();
  });

  test('forbids to place a ship next to another ship', () => {
    gameboard.placeShip(new Ship(3), [4, 4], 'horizontal');
    expect(gameboard.canPlace(new Ship(5), [4, 5], 'horizontal')).toBeFalsy();
  });

  test('registers an attack', () => {
    gameboard.receiveAttack(1, 1);
    expect(gameboard.board[1][1].wasAttacked).toBeTruthy();
  });

  test('registers a hit', () => {
    gameboard.board[2][2].ship = new Ship(1);
    gameboard.receiveAttack(2, 2);
    expect(gameboard.board[2][2].ship.hits).toEqual(1);
  });

  test('reports that all ships have not been sunk', () => {
    gameboard.placeShip(new Ship(3), [5, 5], 'horizontal');
    gameboard.receiveAttack(5, 5);
    expect(gameboard.allSunk).toBeFalsy();
  });

  test('reports that all ships have been sunk', () => {
    gameboard.placeShip(new Ship(2), [5, 5], 'horizontal');
    gameboard.receiveAttack(5, 5);
    gameboard.receiveAttack(6, 5);
    expect(gameboard.allSunk).toBeTruthy();
  });
});
