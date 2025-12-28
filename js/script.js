class ArtysSnakeGame {
    constructor(container, rows, columns) {
        // singelton
        if (ArtysSnakeGame.instance) {
            return ArtysSnakeGame.instance;
        }
        ArtysSnakeGame.instance = this;

        // logic
        this.container = container;
        this.rows = rows;
        this.columns = columns;
        this.createGameHTML(rows, columns);
    }

    createGameHTML() {
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
                const cellGridName = "cellR" + i + "C" + j;
                gameGridNameList.push(cellGridName);
                const div = document.createElement("div");
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
        const leftButton = document.createElement("button");
        leftButton.id = "left";
        leftButton.innerText = "<";
        const rightButton = document.createElement("button");
        rightButton.id = "right";
        rightButton.innerText = ">";
        const downButton = document.createElement("button");
        downButton.id = "down";
        downButton.classList.add("flip");
        downButton.innerText = "^";
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
}

const app = new ArtysSnakeGame(document.querySelector(".container"), 12, 12);
window.onload = function () {
    // TODO: handle popup?
}