import Square from './Square';
import Ship from './Ship';

describe('Square', () => {
  const square = new Square();

  test('holds no ship by default', () => {
    expect(square.ship).toBeNull();
  });

  test('can hold a ship', () => {
    const ship = new Ship(1);
    square.ship = ship;
    expect(square.ship).toBe(ship);
  });

  test('can be attacked', () => {
    expect(square.wasAttacked).toBeFalsy();
    square.attack();
    expect(square.wasAttacked).toBeTruthy();
  });
});
