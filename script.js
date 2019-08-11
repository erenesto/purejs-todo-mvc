import Controller from './src/Controller.js';
import Model from './src/Model.js';
import View from './src/View.js';

const app = new Controller(new Model(), new View());
