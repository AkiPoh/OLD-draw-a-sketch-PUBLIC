const adjustSettingsDiv = document.querySelector("#adjustSettings");
const inputGridSize = document.querySelector("#gridSize")
const enterButton = document.querySelector("#enterButton");
const gridContainerDiv = document.querySelector("#gridContainer");
let inputErrorGiven = false;

function createGrid (gridSize = 32) {
    for (let rowNumber = 0; rowNumber < gridSize; rowNumber++) {
        const gridRow = document.createElement("div");
        gridRow.classList.add("gridRow");
        for (let columnNumber = 0; columnNumber < gridSize; columnNumber++){
            const gridElement = document.createElement("div");
            gridElement.classList.add("gridElement");
            gridElement.addEventListener("mouseover", function() {
                this.classList.add("colored");
            });
            gridRow.appendChild(gridElement);
        }
        gridContainerDiv.appendChild(gridRow);
    }
}

function resetGrid () {
    const gridRows = document.querySelectorAll(".gridRow");
    gridRows.forEach(row => row.remove());
}

createGrid();
inputGridSize.value = "16";

enterButton.addEventListener("click", function() {
    size = inputGridSize.value;
    if (size % 1 === 0 && size >= 4 && size <= 32) {
        resetGrid();
        createGrid(size);
    } else if (inputErrorGiven === false) {
        inputGridSize.value = "";
        const errorDiv = document.createElement("div");
        errorDiv.textContent = "ENTER VALID INPUT!";
        adjustSettingsDiv.appendChild(errorDiv);
        inputErrorGiven = true;
    }
});