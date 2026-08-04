import { gridSize } from '../utils/constants.js';
import { getRandomInt } from '../utils/helper.js';

const getRandomTileValue = () => (Math.random() < 0.9 ? 2 : 4);

export class Grid {
  #cells;
  #score;

  constructor() {
    this.#cells = this.#createEmptyMatrix();
    this.#score = 0;
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

  getCells() {
    return this.#cells;
  }

  getScore() {
    return this.#score;
  }
  
  spawnRandomTile(){
    const emptyCells = [];

    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if (this.#cells[r][c] === null) {
          emptyCells.push({ r, c });
        }
      }
    }

    if (emptyCells.length === 0) return;
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const { r, c } = emptyCells[randomIndex];

      this.#cells[r][c] = getRandomTileValue();
  }

  #slideRow(row) {
    let position = 0;
    let scoreGained = 0;

    for(let i = 0; i < gridSize; i++){
        if(row[i] !== null){
            row[position] = row[i];
            if(position != i){
                row[i] = null; 
            }
            position++; 
        }
    } 

    for (let i = 0; i < gridSize - 1; i++){
        if(row[i] !== null && row[i] === row[i + 1]){
            row[i] *= 2;
            row[i + 1] = null; 
            scoreGained += row[i];
            i++;
        }
    }

    position = 0;
    for(let i = 0; i < gridSize; i++){
        if(row[i] !== null){
            const temp = row[i];
            row[i] = null;
            row[position] = temp;
            position++;
        }
    }

    return { row , scoreGained };
  }

  #reverseRow(row){
    let temp = [];
    for(let i = 0; i < gridSize; i++){
        temp[gridSize - 1 - i] = row[i];
    }
    return temp;
  }

  #slideRowRight(row) {
  let reversed = this.#reverseRow(row);
  let { row: slidedRow, scoreGained } = this.#slideRow(reversed); 
  let finalRow = this.#reverseRow(slidedRow);
  
  return { row: finalRow, scoreGained }; 
}

  #transpose(grid){
    let newGrid = [];
    for(let i = 0; i < gridSize; i++){
        newGrid[i] = [];
        for(let j = 0; j < gridSize; j++){
            newGrid[i][j] = grid[j][i];
        }
    }
    return newGrid;
  }

  #updateCellsAndCheckChange(newGrid, totalScoreGained) {
    let hasChanged = false;

    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if (this.#cells[r][c] !== newGrid[r][c]) {
          hasChanged = true;
          break;
        }
      }
    }

    if (hasChanged) {
      this.#cells = newGrid;
      this.#score += totalScoreGained;
    }

    return hasChanged;
  }

  moveLeft(){
    let newGrid = [];
    let totalScoreGained = 0;

    for(let i = 0; i < gridSize; i++){
      const { row, scoreGained } = this.#slideRow([...this.#cells[i]]);
      newGrid[i] = row;
      totalScoreGained += scoreGained;
    }   
    return this.#updateCellsAndCheckChange(newGrid, totalScoreGained);
  }

  moveRight(){
    let newGrid = [];
    let totalScoreGained = 0;

    for(let i = 0; i < gridSize; i++){
      const { row, scoreGained } = this.#slideRowRight([...this.#cells[i]]);
      newGrid[i] = row;
      totalScoreGained += scoreGained;
    }
    return this.#updateCellsAndCheckChange(newGrid, totalScoreGained);
  }

  moveUp() {
    let transposed = this.#transpose(this.#cells);
    let newGrid = [];
    let totalScoreGained = 0;

    for (let i = 0; i < gridSize; i++) {
      const { row, scoreGained } = this.#slideRow([...transposed[i]]);
      newGrid[i] = row;
      totalScoreGained += scoreGained;
    }
    let resultGrid = this.#transpose(newGrid);
    return this.#updateCellsAndCheckChange(resultGrid, totalScoreGained );
  }

  moveDown() {
    let transposed = this.#transpose(this.#cells);
    let newGrid = [];
    let totalScoreGained = 0;

    for (let i = 0; i < gridSize; i++) {
      const { row, scoreGained } = this.#slideRowRight([...transposed[i]]);
      newGrid[i] = row;
      totalScoreGained += scoreGained;
    }
    let resultGrid = this.#transpose(newGrid);
    return this.#updateCellsAndCheckChange(resultGrid, totalScoreGained);
  }
}