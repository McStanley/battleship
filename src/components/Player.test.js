import Player from './Player';

describe('Player', () => {
  const player = new Player('Name', true);

  test('has a name property', () => {
    expect(player.name).toEqual('Name');
  });

  test('has an isHuman property', () => {
    expect(player.isHuman).toBeTruthy();
  });

  test('has a gameboard', () => {
    expect(player.gameboard).toBeDefined();
  });

  test('can be attacked', () => {
    Player.attack(player, [4, 2]);
    expect(player.gameboard.board[4][2].wasAttacked).toBeTruthy();
  });
});
