const startBtn = document.querySelector(".start-btn");

const formContainer = document.querySelector(".form-container");

const gameContainer = document.querySelector(".game-container")

const restartButton = document.querySelector(".restart-button")

const ticTacToe = (() => {
    let gameBoardArray = [null, null, null, null, null, null, null, null, null];

    let turn = null;

    const createForm = () => {
        if(formContainer.innerHTML == "") {
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
        //check for diagonals
        if(gameBoardArray[0] == turn && gameBoardArray[4] == turn && gameBoardArray[8] == turn || gameBoardArray[2] == turn && gameBoardArray[4] == turn && gameBoardArray[6] == turn) {
            console.log(`${turn} WINS`);
            turn = null;
            gameBoardArray = [null, null, null, null, null, null, null, null, null];
            return true;
        }

        else {
            //check for horizontal rows
            for(i = 0; i < 9; i+= 3) {
                if(gameBoardArray[i] == turn && gameBoardArray[i+1] == turn && gameBoardArray[i+2] == turn) {
                    console.log(`${turn} WINS`);
                    turn = null;
                    gameBoardArray = [null, null, null, null, null, null, null, null, null]
                    return true;
                }
            }
            //check for vertical rows
            for(i = 0; i < 3; i++) {
                if(gameBoardArray[i] == turn && gameBoardArray[i+3] == turn && gameBoardArray[i+6] == turn) {
                    console.log(`${turn} WINS`);
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
        chooseCell
    }
})();