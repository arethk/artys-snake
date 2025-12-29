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
        this.Constants.gridValues = {};
        this.Constants.gridValues.border = null;
        this.Constants.gridValues.empty = 0;
        this.Constants.gridValues.head = 1;
        this.Constants.gridValues.egg = "E";
        this.Constants.directions = {};
        this.Constants.directions.up = "up";
        this.Constants.directions.down = "down";
        this.Constants.directions.left = "left";
        this.Constants.directions.right = "right";

        // action
        this.buildHTML();
        this.reset();
    }

    reset() {
        this.score = 0;
        this.direction = this.Constants.directions.up;
        this.grid = this.buildDefaultGrid();
        this.drawGrid();
    }

    drawGrid() {
        for (let i = 0; i < this.grid.length; i++) {
            const row = this.grid[i];
            for (let j = 0; j < row.length; j++) {
                const item = row[j];
                const cell = document.querySelector("." + ArtysSnakeGame.generateCellName(i, j));
                switch (item) {
                    case this.Constants.gridValues.border:
                        cell.classList = "border";
                        break;
                    case this.Constants.gridValues.empty:
                        cell.classList = "";
                        break;
                    case this.Constants.gridValues.head:
                        cell.classList = "head";
                        break;
                    case this.Constants.gridValues.egg:
                        cell.classList = "egg";
                        break;
                    default:
                        console.log("Invalid grid value");
                        break;
                }
            }
        }
    }

    buildDefaultGrid() {
        const headLocationRow = this.rows - 3;
        const headLocationColumn = Math.floor(this.columns / 2);
        const grid = [];
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
            grid.push(row);
        }
        // TODO: make this random???
        grid[3][3] = this.Constants.gridValues.egg;
        return grid;
    }

    static generateCellName(row, column) {
        return "cellR" + row + "C" + column;
    }

    buildHTML() {
        if (!this.container || this.container instanceof HTMLElement === false) {
            throw new Error("Invalid container");
        }
        if (Number.isInteger(this.rows) === false || Number.isInteger(this.columns) === false || this.rows < 5 || this.columns < 5) {
            throw new Error("Rows must be a minimum of 5 and columns must be a minimum of 5");
        }
        // set css grid rows and columns
        this.container.style.gridTemplateRows = "minmax(50px, 2fr) repeat(" + this.rows + ", minmax(10px, 1fr)) minmax(150px, 4fr)";
        this.container.style.gridTemplateColumns = "repeat(" + this.columns + ", minmax(30px, 1fr))";

        // create header area
        const headerGridName = "header";
        const headerDiv = document.createElement("div");
        headerDiv.classList.add("header");
        headerDiv.style.gridArea = headerGridName;
        this.container.appendChild(headerDiv);

        // create header grid area
        const headerGridNameList = [];
        for (let i = 0; i < this.columns; i++) {
            headerGridNameList.push(headerGridName);
        }
        this.container.style.gridTemplateAreas = '"' + headerGridNameList.join(" ") + '"';

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
            this.container.style.gridTemplateAreas += '"' + gameGridNameList.join(" ") + '"';
        }

        // create footer area
        const footerGridName = "footer";
        const footerDiv = document.createElement("div");
        footerDiv.classList.add("footer");
        footerDiv.style.gridArea = footerGridName;

        // create control buttons
        const upButton = document.createElement("button");
        upButton.id = "up";
        upButton.innerText = "^";
        upButton.onclick = () => { app.direction = app.Constants.directions.up; };
        const leftButton = document.createElement("button");
        leftButton.id = "left";
        leftButton.innerText = "<";
        leftButton.onclick = () => { app.direction = app.Constants.directions.left; };
        const rightButton = document.createElement("button");
        rightButton.id = "right";
        rightButton.innerText = ">";
        rightButton.onclick = () => { app.direction = app.Constants.directions.right; };
        const downButton = document.createElement("button");
        downButton.id = "down";
        downButton.classList.add("flip");
        downButton.innerText = "^";
        downButton.onclick = () => { app.direction = app.Constants.directions.down; };
        const leftRightDiv = document.createElement("div");
        leftRightDiv.classList.add("left-right-container");
        leftRightDiv.appendChild(leftButton);
        leftRightDiv.appendChild(rightButton);
        footerDiv.appendChild(upButton);
        footerDiv.appendChild(leftRightDiv);
        footerDiv.appendChild(downButton);
        this.container.appendChild(footerDiv);

        // create header grid area
        const footerGridNameList = [];
        for (let i = 0; i < this.columns; i++) {
            footerGridNameList.push(footerGridName);
        }
        this.container.style.gridTemplateAreas += '"' + footerGridNameList.join(" ") + '"';
    }

    destroy() {
        // TODO: destroy stuff
    }
}

let app = null;
window.onload = function () {
    const gameRows = 12;
    const gameColumns = 12;
    app = new ArtysSnakeGame(document.querySelector(".container"), gameRows, gameColumns);
    // TODO: handle popup?
}

window.onbeforeunload = function () {
    if (app) {
        app.destroy();
    }
}