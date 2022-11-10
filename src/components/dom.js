import game from './game';
import helpers from './helpers';

const dom = (() => {
  const generateGrid = (container) => {
    container.replaceChildren();

    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        const gridCell = document.createElement('div');
        gridCell.classList.add('grid-cell');
        gridCell.dataset.x = j;
        gridCell.dataset.y = i;

        container.appendChild(gridCell);
      }
    }
  };

  const displayFleet = () => {
    const leftGrid = document.querySelector('#left-grid');
    generateGrid(leftGrid);

    const leftGridCells = document.querySelectorAll('#left-grid > .grid-cell');
    const player = game.getActive();

    for (let i = 0; i < leftGridCells.length; i += 1) {
      const cell = leftGridCells[i];
      const square = helpers.getSquareFromCell(cell, player);

      if (square.ship) cell.style.backgroundColor = 'grey';
    }
  };

  const init = () => {
    game.init();

    displayFleet();
  };

  return {
    init,
  };
})();

export default dom;
