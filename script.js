const adjustSettingsDiv = document.querySelector("#adjustSettings");
const inputGridSize = document.querySelector("#gridSize")
const enterButton = document.querySelector("#enterButton");
const gridContainerDiv = document.querySelector("#gridContainer");
let inputErrorGiven = false;
const START_SIZE = 32;
let previousSize = START_SIZE;

function createGrid (gridSize = START_SIZE) {
    for (let rowNumber = 0; rowNumber < gridSize; rowNumber++) {
        const gridRow = document.createElement("div");
        gridRow.classList.add("gridRow");
        for (let columnNumber = 0; columnNumber < gridSize; columnNumber++){
            const gridElement = document.createElement("div");
            gridElement.classList.add("gridElement");
            gridElement.addEventListener("mouseover", function() {
                this.classList.add("colored");
            });
            gridElement.addEventListener("touchmove", function(e) {
                e.preventDefault(); //prevent scrolling
                const touchPoint = e.touches[0]; //selects first touch point
                const elementThatTouched = document.elementFromPoint(touchPoint.clientX, touchPoint.clientY); //selects specfic element that was touched
                if (elementThatTouched && elementThatTouched.classList.contains("gridElement")) {
                    elementThatTouched.classList.add("colored");
                }            
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
inputGridSize.value = START_SIZE;

enterButton.addEventListener("click", function() {
    size = inputGridSize.value;
    if (size % 1 === 0 && size >= 4 && size <= 32) {
        resetGrid();
        createGrid(size);
        previousSize = size;
        if (inputErrorGiven === true) {
            document.querySelector("#errorDiv").remove();
            inputErrorGiven = false;
        }
    } else if (inputErrorGiven === false) {
        inputGridSize.value = previousSize;
        const errorDiv = document.createElement("div");
        errorDiv.textContent = "ENTER VALID INPUT!";
        errorDiv.setAttribute("id", "errorDiv")
        adjustSettingsDiv.appendChild(errorDiv);
        inputErrorGiven = true;
    } else {
        inputGridSize.value = previousSize;
    }
});