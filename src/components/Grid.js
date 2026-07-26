import { gridSize } from '../utils/constants.js';

export class Grid {
  #cells;

  constructor() {
    this.#cells = this.#createEmptyMatrix();
  }

  #createEmptyMatrix() {
    const matrix = [];
    
    for (let i = 0; i < gridSize; i++) {
      const row = [];
      for (let j = 0; j < gridSize; j++) {
        row.push(null);
      }
      matrix.push(row);
    }
    return matrix;
  }

  print() {
    console.table(this.#cells); 
  }
}