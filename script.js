const ticTacToe = (() => {
    let gameBoardArray = [null, null, null, null, null, null, null, null, null];

    let turn = null;

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
})();