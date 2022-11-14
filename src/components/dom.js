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

  const updateOverlay = (element) => {
    const overlay = document.querySelector('.overlay');

    if (
      element.classList.contains('hidden') !==
      overlay.classList.contains('hidden')
    ) {
      overlay.classList.toggle('hidden');
    }
  };

  const displayWinner = (winner) => {
    const results = document.querySelector('.results');
    const winnerSpan = document.querySelector('#winner');

    winnerSpan.textContent = winner.name;

    results.classList.remove('hidden');
    updateOverlay(results);
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
            const winner = game.getActive();
            displayWinner(winner);

            return;
          }

          game.togglePlayers();

          setTimeout(() => {
            if (!game.getActive().isHuman) {
              game.computerMove();

              if (game.isOver()) {
                const winner = game.getActive();
                displayWinner(winner);

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

  const clearSetup = () => {
    const pOneNameInput = document.querySelector('#playerone-name');
    const pOneHumanInput = document.querySelector('#playerone-human');
    const pTwoNameInput = document.querySelector('#playertwo-name');
    const pTwoHumanInput = document.querySelector('#playertwo-human');

    pOneNameInput.value = '';
    pOneHumanInput.checked = true;
    pTwoNameInput.value = '';
    pTwoHumanInput.checked = true;
  };

  const toggleSetup = () => {
    const setup = document.querySelector('.setup');

    setup.classList.toggle('hidden');
    updateOverlay(setup);

    if (setup.classList.contains('hidden')) clearSetup();
  };

  const submitSetup = () => {
    const pOneNameInput = document.querySelector('#playerone-name');
    const pOneHumanInput = document.querySelector('#playerone-human');
    const pTwoNameInput = document.querySelector('#playertwo-name');
    const pTwoHumanInput = document.querySelector('#playertwo-human');

    const pOneName = pOneNameInput.value || 'Player One';
    const pOneHuman = !!pOneHumanInput.checked;
    const pTwoName = pTwoNameInput.value || 'Player Two';
    const pTwoHuman = !!pTwoHumanInput.checked;

    game.init(pOneName, pOneHuman, pTwoName, pTwoHuman);

    toggleSetup();

    displayFleet();
    enableShooting();
  };

  const startGame = () => {
    const leftGrid = document.querySelector('#left-grid');
    const rightGrid = document.querySelector('#right-grid');
    const results = document.querySelector('.results');

    generateGrid(leftGrid);
    generateGrid(rightGrid);

    results.classList.add('hidden');

    toggleSetup();
  };

  const init = () => {
    const startBtn = document.querySelector('#start-btn');
    const restartBtn = document.querySelector('#restart-btn');

    startBtn.addEventListener('click', submitSetup);
    restartBtn.addEventListener('click', startGame);

    startGame();
  };

  return {
    init,
  };
})();

export default dom;
