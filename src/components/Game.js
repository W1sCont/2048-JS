import { Grid } from './Grid.js';

export class Game {
    #grid;
    #boardElement;
    #scoreElement;

    constructor() {
        this.#grid = new Grid();
        this.#boardElement = document.getElementById("game-board");
        this.#scoreElement = document.getElementById("score");
    }

    start() {
        this.#setupInput();
        this.#grid.spawnRandomTile(); 
        this.#grid.spawnRandomTile(); 
        this.#render();
    }

    #setupInput(){
        document.addEventListener("keydown", (event) => {
            let moved = false;

            if(event.key === "ArrowLeft") moved = this.#grid.moveLeft();
            if(event.key === "ArrowRight") moved = this.#grid.moveRight();
            if(event.key === "ArrowUp") moved = this.#grid.moveUp();
            if(event.key === "ArrowDown") moved = this.#grid.moveDown();

            if(moved){
                this.#grid.spawnRandomTile();
                this.#render();
            }
        });
    }

    #render() {
        this.#boardElement.innerHTML = '';
        this.#scoreElement.textContent = this.#grid.getScore();
        const cells = this.#grid.getCells(); 

        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                const value = cells[r][c];
        
                const tileDiv = document.createElement('div');
                tileDiv.classList.add('tile');
        
                if (value !== null) {
                    tileDiv.textContent = value;
                    tileDiv.classList.add(`tile-${value}`);
                } else 
                    tileDiv.classList.add('tile-empty');

                this.#boardElement.appendChild(tileDiv);
            }
        }
    }
}