import Ship from './Ship';

describe('Ship', () => {
  const ship = new Ship(4);

  test('has a length property', () => {
    expect(ship.length).toEqual(4);
  });

  test('has a hits property', () => {
    expect(ship.hits).toEqual(0);
  });

  test('can be hit', () => {
    ship.hit();
    ship.hit();
    expect(ship.hits).toEqual(2);
  });

  test('can be sunk', () => {
    expect(ship.isSunk()).toBeFalsy();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBeTruthy();
  });
});
