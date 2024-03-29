const startBtn = document.querySelector(".start-btn");

const formContainer = document.querySelector(".form-container");

const gameContainer = document.querySelector(".game-container")

const restartBtn = document.querySelector(".restart-button")

startBtn.addEventListener("click", () => {
    if(gameContainer.innerHTML == "") {
        ticTacToe.createForm();
    }
})

restartBtn.addEventListener("click", () => {
    if(gameContainer.innerHTML != "") {
        gameContainer.innerHTML = "";
        ticTacToe.createForm();
    }
})

const ticTacToe = (() => {
    let gameBoardArray = [null, null, null, null, null, null, null, null, null];

    let turn = null;

    const createForm = () => {
        if(formContainer.innerHTML == "") {
            gameBoardArray = [null, null, null, null, null, null, null, null, null];
            const form = document.createElement("form");

            const fieldset = document.createElement("fieldset");

            const setPlayerOneName = document.createElement("input");

            const setPlayerTwoName = document.createElement("input");

            setPlayerOneName.setAttribute("placeholder", "P1 Name");

            setPlayerTwoName.setAttribute("placeholder", "P2 Name");

            setPlayerOneName.setAttribute("required", "true");

            setPlayerTwoName.setAttribute("required", "true");

            const okButton = document.createElement("button");

            okButton.textContent = "OK";

            okButton.setAttribute("type", "text");

            okButton.addEventListener('click', (event) => {
                if(setPlayerOneName.value != "" && setPlayerTwoName.value != "") {
                    event.preventDefault();

                    startGame();

                    createBoard(setPlayerOneName.value, setPlayerTwoName.value);

                    formContainer.removeChild(form);
                }
            })

            formContainer.appendChild(form);

            form.appendChild(fieldset);

            fieldset.appendChild(setPlayerOneName);

            fieldset.appendChild(setPlayerTwoName);

            fieldset.appendChild(okButton);
        }
    }

    const createBoard = (playerOne, playerTwo) => {
        const showPlayerOneName = document.createElement("h3");

        const showCurrentTurn = document.createElement("h3");

        const showPlayerTwoName = document.createElement("h3");

        showPlayerOneName.textContent = `P1: ${playerOne}`;

        showPlayerTwoName.textContent = `P2: ${playerTwo}`;

        showCurrentTurn.textContent = `${turn} Turn`;

        const boardContainer = document.createElement("div");

        gameContainer.appendChild(showPlayerOneName);

        gameContainer.appendChild(showCurrentTurn);

        gameContainer.appendChild(showPlayerTwoName);

        gameContainer.appendChild(boardContainer);

        for(i = 1; i <= 9; i++) {
            let iterationCount = `${i}`;

            const boardCell = document.createElement("div");

            boardCell.setAttribute("id", `cell-${+iterationCount}`);

            boardCell.addEventListener("click", () => {
                if (turn == "P1") {
                    boardCell.textContent = "O";

                    showCurrentTurn.textContent = "P2 Turn";

                    chooseCell(`${+iterationCount}`);
                }
                else if (turn == "P2") {
                    boardCell.textContent = "X";

                    showCurrentTurn.textContent = "P1 Turn";

                    chooseCell(`${+iterationCount}`);
                }
            })

            boardContainer.appendChild(boardCell);
        }
    }

    const startGame = () => {
        const coinFlip = Math.random();

        function determineFirstTurn(num) {
            if(num <= 0.5) {
                console.log("P1 turn");
                turn = "P1";
            }
            else {
                console.log("P2 turn");
                turn = "P2";
            }
        }

        determineFirstTurn(coinFlip);
    }

    const chooseCell = (num) =>{
        if (gameBoardArray[num-1] == null) {
            gameBoardArray[num-1] = `${turn}`;
            const isGameOver = checkIfGameOver();
            isGameOver;
            if(isGameOver == false) {
                changeTurn();
            }
        }
        else {
            alert("This board cell is already occupied.");
        }
        console.log(gameBoardArray);
    }

    const changeTurn = () => {
        if (turn == "P1") {
            turn = "P2";
        }
        else if (turn == "P2") {
            turn = "P1";
        }
    }

    function checkIfGameOver() {
        //check for tie
        if(gameBoardArray[0] != null && gameBoardArray[1] != null && gameBoardArray[2] != null && gameBoardArray[3] != null && gameBoardArray[4] != null && gameBoardArray[5] != null && gameBoardArray[6] != null && gameBoardArray[7] != null && gameBoardArray[8] != null) {
            gameContainer.innerHTML = "";

            const tieText = document.createElement("h1");

            tieText.textContent = `IT'S A TIE`;

            tieText.setAttribute("style", "grid-area:1/1/2/4;");

            gameContainer.appendChild(tieText);

            turn = null;

            gameBoardArray = [null, null, null, null, null, null, null, null, null]
                return true;
        }
        //check for diagonals
        else if(gameBoardArray[0] == turn && gameBoardArray[4] == turn && gameBoardArray[8] == turn || gameBoardArray[2] == turn && gameBoardArray[4] == turn && gameBoardArray[6] == turn) {
            gameContainer.innerHTML = "";

            const victoryText = document.createElement("h1");

            victoryText.textContent = `${turn} WINS`;

            victoryText.setAttribute("style", "grid-area:1/1/2/4;");

            gameContainer.appendChild(victoryText);

            turn = null;

            gameBoardArray = [null, null, null, null, null, null, null, null, null];
            return true;
        }

        else {
            //check for horizontal rows
            for(i = 0; i < 9; i+= 3) {
                if(gameBoardArray[i] == turn && gameBoardArray[i+1] == turn && gameBoardArray[i+2] == turn) {
                    gameContainer.innerHTML = "";

                    const victoryText = document.createElement("h1");

                    victoryText.textContent = `${turn} WINS`;

                    victoryText.setAttribute("style", "grid-area:1/1/2/4;");

                    gameContainer.appendChild(victoryText);

                    turn = null;

                    gameBoardArray = [null, null, null, null, null, null, null, null, null]
                    return true;
                }
            }
            //check for vertical columns
            for(i = 0; i < 3; i++) {
                if(gameBoardArray[i] == turn && gameBoardArray[i+3] == turn && gameBoardArray[i+6] == turn) {
                    gameContainer.innerHTML = "";

                    const victoryText = document.createElement("h1");

                    victoryText.textContent = `${turn} WINS`;

                    victoryText.setAttribute("style", "grid-area:1/1/2/4;");

                    gameContainer.appendChild(victoryText);

                    turn = null;

                    gameBoardArray = [null, null, null, null, null, null, null, null, null]
                    return true;
                }
            }
        }
        return false;
    }

    return {
        startGame,
        changeTurn,
        chooseCell,
        createForm
    }
})();