class ArtysSnakeGame {
    constructor(container, rows, columns) {
        // singelton
        if (ArtysSnakeGame.instance) {
            return ArtysSnakeGame.instance;
        }
        ArtysSnakeGame.instance = this;

        // construct
        this.container = container;
        this.rows = rows;
        this.columns = columns;

        // constants
        this.Constants = {};
        this.Constants.default = {};
        this.Constants.default.timeout = 777;
        this.Constants.minimum = {};
        this.Constants.minimum.rows = 5;
        this.Constants.minimum.columns = 5;
        this.Constants.layout = {};
        this.Constants.layout.header = "header";
        this.Constants.layout.footer = "footer";
        this.Constants.layout.leftrightcontainer = "left-right-container";
        this.Constants.layout.flip = "flip";
        this.Constants.gridValues = {};
        this.Constants.gridValues.border = "B";
        this.Constants.gridValues.empty = 0;
        this.Constants.gridValues.head = 1;
        this.Constants.gridValues.egg = "E";
        this.Constants.gridValues.collision = "X";
        this.Constants.gridCssClass = {};
        this.Constants.gridCssClass.border = "border";
        this.Constants.gridCssClass.empty = "";
        this.Constants.gridCssClass.head = "head";
        this.Constants.gridCssClass.body = "body";
        this.Constants.gridCssClass.egg = "egg";
        this.Constants.gridCssClass.collision = "collision";
        this.Constants.directions = {};
        this.Constants.directions.up = "up";
        this.Constants.directions.down = "down";
        this.Constants.directions.left = "left";
        this.Constants.directions.right = "right";
        this.Constants.buttons = {};
        this.Constants.buttons.up = "^";
        this.Constants.buttons.down = "^";
        this.Constants.buttons.left = "<";
        this.Constants.buttons.right = ">";

        // action
        this.interval = null;
        this.buildHTML();
        this.reset();
    }

    reset() {
        // TODO: destroy instead?
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.score = 0;
        this.direction = this.Constants.directions.up;
        this.buildStartingGrid();
        this.placeRandomEgg();
        this.drawGrid();
        // TODO: handle popup?
        this.startGame();
    }

    startGame() {
        this.interval = setInterval(() => {
            this.printGrid();
            // find head
            const headLocation = this.findGridItemByValue(this.Constants.gridValues.head);
            console.log(headLocation);
            const newHeadLocation = this.calculateNewPosition(headLocation.row, headLocation.column);
            console.log(newHeadLocation);
            const eggLocation = this.findGridItemByValue(this.Constants.gridValues.egg);
            console.log(eggLocation);

            if (this.isGameWinner() === true) {
                // handle win
                clearInterval(this.interval);
                console.log("YOU WIN!");
                // TODO: show popup?
            } else if (newHeadLocation.row === this.rows - 1 || newHeadLocation.row === 0 || newHeadLocation.column === 0 || newHeadLocation.column === this.columns - 1) {
                // handle out of bounds
                clearInterval(this.interval);
                this.grid[newHeadLocation.row][newHeadLocation.column] = this.Constants.gridValues.collision;
                if (this.score === 0) {
                    this.grid[headLocation.row][headLocation.column]--;
                } else {
                    for (let i = 1; i <= this.score; i++) {
                        const bodyPartValue = i + 1;
                        const bodyLocation = this.findGridItemByValue(bodyPartValue);
                        if (i === this.score) {
                            this.grid[headLocation.row][headLocation.column]++;
                            this.grid[bodyLocation.row][bodyLocation.column] = this.Constants.gridValues.empty;
                        } else {
                            // handle body movement
                            this.grid[headLocation.row][headLocation.column]++;
                            this.grid[bodyLocation.row][bodyLocation.column]++;
                        }
                    }
                }
                // TODO: show game over popup?
            } else if (false) { // TODO: handle detect touch self

            } else if (eggLocation && newHeadLocation.row === eggLocation.row && newHeadLocation.column === eggLocation.column) {
                // handle got egg
                if (this.score === 0) {
                    this.score++;
                    this.grid[headLocation.row][headLocation.column]++;
                    this.grid[newHeadLocation.row][newHeadLocation.column] = this.Constants.gridValues.head;
                } else {
                    this.score++;
                    for (let i = 1; i <= this.score; i++) {
                        const bodyPartValue = i + 1;
                        const bodyLocation = this.findGridItemByValue(bodyPartValue);
                        if (i === this.score) {
                            //this.grid[headLocation.row][headLocation.column]++;
                            //this.grid[bodyLocation.row][bodyLocation.column] = this.Constants.gridValues.empty;
                        } else {
                            // handle body movement
                            this.grid[headLocation.row][headLocation.column]++;
                            this.grid[bodyLocation.row][bodyLocation.column]++;
                        }
                    }
                    this.grid[newHeadLocation.row][newHeadLocation.column] = this.Constants.gridValues.head;
                }
                this.placeRandomEgg();
            } else {
                // handle movement
                if (this.score === 0) {
                    this.grid[headLocation.row][headLocation.column]--;
                    this.grid[newHeadLocation.row][newHeadLocation.column]++;
                } else {
                    this.grid[newHeadLocation.row][newHeadLocation.column] = this.Constants.gridValues.head;
                    for (let i = 1; i <= this.score; i++) {
                        const bodyPartValue = i + 1;
                        const bodyLocation = this.findGridItemByValue(bodyPartValue);
                        console.log(`i: ${i}`);
                        console.log(`score: ${this.score}`);
                        console.log(`bodyPartValue: ${bodyPartValue}`);
                        if (i === this.score) {
                            console.log("A");
                            this.grid[headLocation.row][headLocation.column]++;
                            this.grid[bodyLocation.row][bodyLocation.column] = this.Constants.gridValues.empty;
                        } else {
                            console.log("B");
                            // handle body movement
                            this.grid[headLocation.row][headLocation.column]++;
                            this.grid[bodyLocation.row][bodyLocation.column]++;
                        }
                    }
                }
            }
            this.printGrid();
            this.drawGrid();
        }, this.Constants.default.timeout)
    }

    calculateNewPosition(row, column) {
        switch (this.direction) {
            case this.Constants.directions.up:
                return {
                    row: row - 1,
                    column: column
                };
                break;
            case this.Constants.directions.down:
                return {
                    row: row + 1,
                    column: column
                };
                break;
            case this.Constants.directions.left:
                return {
                    row: row,
                    column: column - 1
                };
                break;
            case this.Constants.directions.right:
                return {
                    row: row,
                    column: column + 1
                };
                break;
            default:
                console.log(`Invalid direction ${this.direction}`);
                break;
        }
    }

    findGridItemByValue(value) {
        for (let i = 0; i < this.grid.length; i++) {
            const row = this.grid[i];
            for (let j = 0; j < row.length; j++) {
                const item = row[j];
                if (item === value) {
                    return {
                        row: i,
                        column: j
                    };
                }
            }
        }
    }

    drawGrid() {
        const gridCssClasses = [
            this.Constants.gridCssClass.border,
            //this.Constants.gridCssClass.empty,
            this.Constants.gridCssClass.head,
            this.Constants.gridCssClass.body,
            this.Constants.gridCssClass.egg,
            //this.Constants.gridCssClass.collision,
        ];
        for (let i = 0; i < this.grid.length; i++) {
            const row = this.grid[i];
            for (let j = 0; j < row.length; j++) {
                const item = row[j];
                const cell = document.querySelector(`.${ArtysSnakeGame.generateCellName(i, j)}`);
                gridCssClasses.forEach(c => {
                    cell.classList.remove(c);
                });
                switch (item) {
                    case this.Constants.gridValues.border:
                        cell.classList.add(this.Constants.gridCssClass.border);
                        break;
                    case this.Constants.gridValues.empty:
                        //cell.classList.add(this.Constants.gridCssClass.empty);
                        break;
                    case this.Constants.gridValues.head:
                        cell.classList.add(this.Constants.gridCssClass.head);
                        break;
                    case this.Constants.gridValues.egg:
                        cell.classList.add(this.Constants.gridCssClass.egg);
                        break;
                    case this.Constants.gridValues.collision:
                        cell.classList.add(this.Constants.gridCssClass.collision);
                        break;
                    default:
                        if (Number.isInteger(item)) {
                            cell.classList.add(this.Constants.gridCssClass.body);
                        } else {
                            console.log(`Invalid grid value ${item}`);
                        }
                        break;
                }
            }
        }
    }

    buildStartingGrid() {
        const headLocationRow = this.rows - 3;
        const headLocationColumn = Math.floor(this.columns / 2);
        this.grid = [];
        for (let i = 0; i < this.rows; i++) {
            const row = [];
            for (let j = 0; j < this.columns; j++) {
                if ([0, this.rows - 1].includes(i) || [0, this.columns - 1].includes(j)) {
                    row.push(this.Constants.gridValues.border);
                } else if (i === headLocationRow && j === headLocationColumn) {
                    row.push(this.Constants.gridValues.head);
                } else {
                    row.push(this.Constants.gridValues.empty);
                }
            }
            this.grid.push(row);
        }
    }

    placeRandomEgg() {
        const emptyCells = Util.shuffle(this.getEmptyCells(this.grid));
        this.grid[emptyCells[0].row][emptyCells[0].column] = this.Constants.gridValues.egg;
    }

    isGameWinner() {
        return this.getEmptyCells(this.grid) === 0;
    }

    getEmptyCells(grid) {
        const cells = [];
        for (let i = 0; i < grid.length; i++) {
            const row = grid[i];
            for (let j = 0; j < row.length; j++) {
                const item = row[j];
                if (item === this.Constants.gridValues.empty) {
                    cells.push({
                        row: i,
                        column: j
                    });
                }
            }
        }
        return cells;
    }

    buildHTML() {
        if (!this.container || this.container instanceof HTMLElement === false) {
            throw new Error("Invalid container");
        }
        if (Number.isInteger(this.rows) === false || Number.isInteger(this.columns) === false || this.rows < this.Constants.minimum.rows || this.columns < this.Constants.minimum.columns) {
            throw new Error(`Rows must be a minimum of ${this.Constants.minimum.rows} and columns must be a minimum of ${this.Constants.minimum.columns}`);
        }
        // set css grid rows and columns
        this.container.style.gridTemplateRows = `minmax(50px, 2fr) repeat(${this.rows}, minmax(10px, 1fr)) minmax(150px, 4fr)`;
        this.container.style.gridTemplateColumns = `repeat(${this.columns}, minmax(30px, 1fr))`;

        // create header area
        const headerDiv = document.createElement("div");
        headerDiv.classList.add(this.Constants.layout.header);
        headerDiv.style.gridArea = this.Constants.layout.header;
        headerDiv.onclick = () => {
            if (this.interval) {
                clearInterval(this.interval);
            }
        };
        this.container.appendChild(headerDiv);

        // create header grid area
        const headerGridNameList = [];
        for (let i = 0; i < this.columns; i++) {
            headerGridNameList.push(this.Constants.layout.header);
        }
        this.container.style.gridTemplateAreas = `"${headerGridNameList.join(" ")}"`;

        // create game area
        for (let i = 0; i < this.rows; i++) {
            const gameGridNameList = [];
            for (let j = 0; j < this.columns; j++) {
                const cellGridName = ArtysSnakeGame.generateCellName(i, j);
                gameGridNameList.push(cellGridName);
                const div = document.createElement("div");
                div.classList.add(cellGridName);
                div.style.gridArea = cellGridName;
                this.container.appendChild(div);
            }
            this.container.style.gridTemplateAreas += `"${gameGridNameList.join(" ")}"`;
        }

        // create footer area
        const footerDiv = document.createElement("div");
        footerDiv.classList.add(this.Constants.layout.footer);
        footerDiv.style.gridArea = this.Constants.layout.footer;

        // create control buttons
        const upButton = document.createElement("button");
        upButton.id = this.Constants.directions.up;
        upButton.innerText = this.Constants.buttons.up;
        upButton.onclick = () => {
            if (app.score === 0 || app.direction !== app.Constants.directions.down) {
                app.direction = app.Constants.directions.up;
            }
        };
        const leftButton = document.createElement("button");
        leftButton.id = this.Constants.directions.left;
        leftButton.innerText = this.Constants.buttons.left;
        leftButton.onclick = () => {
            if (app.score === 0 || app.direction !== app.Constants.directions.right) {
                app.direction = app.Constants.directions.left;
            }
        };
        const rightButton = document.createElement("button");
        rightButton.id = this.Constants.directions.right;
        rightButton.innerText = this.Constants.buttons.right;
        rightButton.onclick = () => {
            if (app.score === 0 || app.direction !== app.Constants.directions.left) {
                app.direction = app.Constants.directions.right;
            }
        };
        const downButton = document.createElement("button");
        downButton.id = this.Constants.directions.down;
        downButton.classList.add(this.Constants.layout.flip);
        downButton.innerText = this.Constants.buttons.down;
        downButton.onclick = () => {
            if (app.score === 0 || app.direction !== app.Constants.directions.up) {
                app.direction = app.Constants.directions.down;
            }
        };
        const leftRightDiv = document.createElement("div");
        leftRightDiv.classList.add(this.Constants.layout.leftrightcontainer);
        leftRightDiv.appendChild(leftButton);
        leftRightDiv.appendChild(rightButton);
        footerDiv.appendChild(upButton);
        footerDiv.appendChild(leftRightDiv);
        footerDiv.appendChild(downButton);
        this.container.appendChild(footerDiv);

        // create header grid area
        const footerGridNameList = [];
        for (let i = 0; i < this.columns; i++) {
            footerGridNameList.push(this.Constants.layout.footer);
        }
        this.container.style.gridTemplateAreas += `"${footerGridNameList.join(" ")}"`;
    }

    printGrid() {
        let output = "";
        for (let i = 0; i < this.grid.length; i++) {
            const row = this.grid[i];
            output += `${row.join("  ")}\n`;
        }
        console.log(output.trim());
    }

    static generateCellName(row, column) {
        return `cellR${row}C${column}`;
    }

    destroy() {
        // TODO: destroy stuff
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}

let app = null;
window.onload = function () {
    const container = "container";
    const gameRows = 12;
    const gameColumns = 12;
    app = new ArtysSnakeGame(document.querySelector(`.${container}`), gameRows, gameColumns);
    // TODO: handle popup?
}

window.onbeforeunload = function () {
    if (app) {
        app.destroy();
    }
}