// script.js
document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const message = document.getElementById("message");
    const restartButton = document.getElementById("restart");
    let currentPlayer = "X";
    let gameState = ["", "", "", "", "", "", "", "", ""];
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    restartButton.addEventListener("click", restartGame);

    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = cell.getAttribute("data-index");

        if (gameState[cellIndex] !== "" || checkWinner()) {
            return;
        }

        gameState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWinner()) {
            message.textContent = `Player ${currentPlayer} wins!`;
        } else if (!gameState.includes("")) {
            message.textContent = "It's a draw!";
        } else {
            currentPlayer = "O"; // Switch to AI's turn
            setTimeout(aiMove, 500); // Delay AI's move for a better user experience
        }
    }

    function aiMove() {
        let availableCells = [];
        gameState.forEach((cell, index) => {
            if (cell === "") {
                availableCells.push(index);
            }
        });

        if (availableCells.length === 0) {
            return;
        }

        const randomIndex = Math.floor(Math.random() * availableCells.length);
        const cellIndex = availableCells[randomIndex];

        gameState[cellIndex] = "O";
        cells[cellIndex].textContent = "O";

        if (checkWinner()) {
            message.textContent = "Player O wins!";
        } else if (!gameState.includes("")) {
            message.textContent = "It's a draw!";
        } else {
            currentPlayer = "X"; // Switch back to human player
        }
    }

    function checkWinner() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            const a = gameState[winCondition[0]];
            const b = gameState[winCondition[1]];
            const c = gameState[winCondition[2]];
            if (a === "" || b === "" || c === "") {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }
        return roundWon;
    }

    function restartGame() {
        gameState = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => (cell.textContent = ""));
        currentPlayer = "X";
        message.textContent = "";
    }
});
