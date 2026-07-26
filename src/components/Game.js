import { gridSize } from '../utils/constants.js';

function  slideRow(row) {
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

function slideRowRight(row){
    
}