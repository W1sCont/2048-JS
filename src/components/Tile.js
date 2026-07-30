import { getRandomInt } from '../utils/helpers.js';

export class Tile {
    constructor(x, y, value){
        this.x = x;
        this.y = y;
        this.value = value || (getRandomInt(1,10) === 10 ? 4 : 2);
    }
}