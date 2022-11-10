const helpers = (() => {
  const getRandomPlacement = (player, ship) => {
    let x;
    let y;
    let direction;

    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
    } while (!player.gameboard.canPlace(ship, [x, y], direction));

    return {
      location: [x, y],
      direction,
    };
  };

  const getSquareFromCell = (cell, player) => {
    const { x, y } = cell.dataset;
    const square = player.gameboard.board[x][y];

    return square;
  };

  return {
    getRandomPlacement,
    getSquareFromCell,
  };
})();

export default helpers;
