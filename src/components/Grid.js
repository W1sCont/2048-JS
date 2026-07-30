import { gridSize } from '../utils/constants.js';
import { getRandomInt } from '../utils/helper.js';

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

  #slideRow(row) {
    for(let i = 0; i < gridSize; i++){
        let position = 0;
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

    return row;
  }

  #rewerseRow(row){
    let temp = [];
    for(let i = 0; i < gridSize; i++){
        temp[gridSize - 1 - i] = row[i];
    }
    return temp;
  }

  #slideRowRight(row){
    let reversed = rewerseRow(row);
    let slide = slideRow(reversed);
    return rewerseRow(slide);
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

  moveLeft(grid){
    let newGrid = [];
    for(let i = 0; i < gridSize; i++){
        newGrid[i] = slideRow(...grid[i]);
    }   
    return newGrid;
  }

  moveRight(grid){
    let newGrid = [];
    for(let i = 0; i < gridSize; i++){
        newGrid[i] = slideRowRight(...grid[i]);
    }   
    return newGrid;
  }

  moveUp(grid) {
    let transposed = transpose(grid);
    let moved = moveLeft(transposed);
    return transpose(moved);
  }

  moveDown(grid) {
    let transposed = transpose(grid);
    let moved = moveRight(transposed);
    return transpose(moved);
  }
}