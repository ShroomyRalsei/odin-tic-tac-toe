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
})();