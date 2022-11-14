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

  const computerMove = () => {
    const player = getPassive();
    let x;
    let y;

    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (player.gameboard.board[x][y].wasAttacked);

    player.gameboard.receiveAttack(x, y);
  };

  const init = (pOneName, pOneHuman, pTwoName, pTwoHuman) => {
    activePlayer = new Player(pOneName, pOneHuman);
    passivePlayer = new Player(pTwoName, pTwoHuman);

    deployFleet(activePlayer);
    deployFleet(passivePlayer);
  };

  return {
    getActive,
    getPassive,
    isOver,
    togglePlayers,
    computerMove,
    init,
  };
})();

export default game;
