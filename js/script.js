const GAME_ROWS = 12;
const GAME_COLUMNS = 12;
window.onload = function () {
    const container = document.querySelector(".container");
    // set css grid rows and columns
    container.style.gridTemplateRows = "minmax(50px, 2fr) repeat(" + GAME_ROWS + ", minmax(10px, 1fr)) minmax(150px, 4fr)";
    container.style.gridTemplateColumns = "repeat(" + GAME_COLUMNS + ", minmax(30px, 1fr))";

    // create header area
    const headerGridName = "header";
    const headerDiv = document.createElement("div");
    headerDiv.classList.add("header");
    headerDiv.style.gridArea = headerGridName;
    container.appendChild(headerDiv);

    // create header grid area
    const headerGridNameList = [];
    for (let i = 0; i < GAME_COLUMNS; i++) {
        headerGridNameList.push(headerGridName);
    }
    container.style.gridTemplateAreas = '"' + headerGridNameList.join(" ") + '"';

    // create game area
    for (let i = 0; i < GAME_ROWS; i++) {
        const gameGridNameList = [];
        for (let j = 0; j < GAME_COLUMNS; j++) {
            const cellGridName = "cellR" + i + "C" + j;
            gameGridNameList.push(cellGridName);
            const div = document.createElement("div");
            div.style.gridArea = cellGridName;
            container.appendChild(div);
        }
        container.style.gridTemplateAreas += '"' + gameGridNameList.join(" ") + '"';
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
    container.appendChild(footerDiv);

    // create header grid area
    const footerGridNameList = [];
    for (let i = 0; i < GAME_COLUMNS; i++) {
        footerGridNameList.push(footerGridName);
    }
    container.style.gridTemplateAreas += '"' + footerGridNameList.join(" ") + '"';
}