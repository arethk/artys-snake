const GAME_ROWS = 10;
const GAME_COLUMNS = 10;
window.onload = function () {
    const container = document.querySelector(".container");
    //const totalDivs = (GAME_ROWS + 2) * GAME_COLUMNS;

    /*
    document.getElementById("myDIV").style.gridTemplateRows = "200px";

    TODO: rows:
    11fr repeat(10, 1fr) 11fr

    BIG subtract 2 BIG
    */
   container.style.gridTemplateRows = "repeat(" + (GAME_ROWS + 2) + ", 1fr)";
   container.style.gridTemplateColumns = "repeat(" + GAME_COLUMNS + ", 1fr)";

    // create header area
    for (let i = 0; i < GAME_COLUMNS; i++) {
        const div = document.createElement("div");
        div.classList.add("header");
        container.appendChild(div);
    }

    // create game area
    for (let i = 0; i < GAME_ROWS * GAME_COLUMNS; i++) {
        const div = document.createElement("div");
        container.appendChild(div);
    }

    // create footer area
    for (let i = 0; i < GAME_COLUMNS; i++) {
        const div = document.createElement("div");
        div.classList.add("footer");
        container.appendChild(div);
    }
}