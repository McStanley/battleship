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

  const displayHits = (player, grid) => {
    const gridCells = grid.querySelectorAll('.grid-cell');

    for (let i = 0; i < gridCells.length; i += 1) {
      const cell = gridCells[i];
      const square = helpers.getSquareFromCell(cell, player);

      if (square.wasAttacked) {
        if (!square.ship) cell.style.backgroundColor = 'blue';
        if (square.ship) {
          cell.style.backgroundColor = square.ship.isSunk() ? 'purple' : 'red';
        }
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

    displayHits(player, leftGrid);
  };

  const disableShooting = () => {
    const rightGrid = document.querySelector('#right-grid');
    rightGrid.style.pointerEvents = 'none';
  };

  const enableShooting = () => {
    const rightGrid = document.querySelector('#right-grid');
    generateGrid(rightGrid);
    rightGrid.style.pointerEvents = 'auto';

    const player = game.getPassive();
    displayHits(player, rightGrid);

    const rightGridCells = rightGrid.querySelectorAll('.grid-cell');

    for (let i = 0; i < rightGridCells.length; i += 1) {
      const cell = rightGridCells[i];
      const square = helpers.getSquareFromCell(cell, player);

      if (!square.wasAttacked) {
        cell.addEventListener('click', () => {
          disableShooting();
          player.gameboard.receiveAttack(cell.dataset.x, cell.dataset.y);
          displayHits(player, rightGrid);

          if (game.isOver()) {
            alert(`${game.getActive().name} won`);

            return;
          }

          game.togglePlayers();

          setTimeout(() => {
            if (!game.getActive().isHuman) {
              game.computerMove();

              if (game.isOver()) {
                alert(`${game.getActive().name} won`);

                game.togglePlayers();
                displayFleet();

                return;
              }

              game.togglePlayers();
            }

            displayFleet();
            enableShooting();
          }, 250);
        });
      }
    }
  };

  const init = () => {
    game.init();

    displayFleet();
    enableShooting();
  };

  return {
    init,
  };
})();

export default dom;
