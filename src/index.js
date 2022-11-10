import 'normalize.css';
import './style.css';

import dom from './components/dom';

const leftGrid = document.querySelector('#left-grid');
const rightGrid = document.querySelector('#right-grid');

dom.generateGrid(leftGrid);
dom.generateGrid(rightGrid);
