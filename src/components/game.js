import Player from './Player';
import Ship from './Ship';
import helpers from './helpers';

const game = (() => {
  let activePlayer;
  let passivePlayer;

  const getActive = () => activePlayer;

  const getPassive = () => passivePlayer;

  const deployFleet = (player) => {
    const fleet = [
      new Ship(5),
      new Ship(4),
      new Ship(3),
      new Ship(3),
      new Ship(2),
    ];

    while (fleet.length) {
      const ship = fleet.shift();
      const placement = helpers.getRandomPlacement(player, ship);

      player.gameboard.placeShip(ship, placement.location, placement.direction);
    }
  };

  const isOver = () => !!passivePlayer.gameboard.allSunk;

  const togglePlayers = () => {
    [activePlayer, passivePlayer] = [passivePlayer, activePlayer];
  };

  const init = () => {
    activePlayer = new Player('Player 1', true);
    passivePlayer = new Player('Player 2', true);

    deployFleet(activePlayer);
    deployFleet(passivePlayer);
  };

  return {
    getActive,
    getPassive,
    isOver,
    togglePlayers,
    init,
  };
})();

export default game;
