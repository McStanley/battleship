const dom = (() => {
  const generateGrid = (container) => {
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

  return {
    generateGrid,
  };
})();

export default dom;
