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
        // TODO: add one for border or snake colision?
        this.Constants.gridCssClass = {};
        this.Constants.gridCssClass.border = "border";
        this.Constants.gridCssClass.empty = "";
        this.Constants.gridCssClass.head = "head";
        this.Constants.gridCssClass.egg = "egg";
        // TODO: add one for border or snake colision?
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
        this.buildHTML();
        this.reset();
    }

    reset() {
        this.score = 0;
        this.direction = this.Constants.directions.up;
        this.grid = this.buildStartingGrid();
        this.drawGrid();
        // TODO: handle popup?

    }

    drawGrid() {
        const gridCssClasses = [
            this.Constants.gridCssClass.border,
            //this.Constants.gridCssClass.empty,
            this.Constants.gridCssClass.head,
            this.Constants.gridCssClass.egg,
            // TODO: add body?
            // TODO: add colision?
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
                    default:
                        console.log(`Invalid grid value ${item}`);
                        break;
                }
            }
        }
    }

    buildStartingGrid() {
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
        return `cellR${row}C${column}`;
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
        upButton.onclick = () => { app.direction = app.Constants.directions.up; };
        const leftButton = document.createElement("button");
        leftButton.id = this.Constants.directions.left;
        leftButton.innerText = this.Constants.buttons.left;
        leftButton.onclick = () => { app.direction = app.Constants.directions.left; };
        const rightButton = document.createElement("button");
        rightButton.id = this.Constants.directions.right;
        rightButton.innerText = this.Constants.buttons.right;
        rightButton.onclick = () => { app.direction = app.Constants.directions.right; };
        const downButton = document.createElement("button");
        downButton.id = this.Constants.directions.down;
        downButton.classList.add(this.Constants.layout.flip);
        downButton.innerText = this.Constants.buttons.down;
        downButton.onclick = () => { app.direction = app.Constants.directions.down; };
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

    destroy() {
        // TODO: destroy stuff
        // TODO: clear timer
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