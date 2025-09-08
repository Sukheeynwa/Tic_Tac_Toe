const game = (() => {
    const gameBoard = [0,1,2,3,4,5,6,7,8];
    const winningCombination = [[0,1,2], [0,3,6], [0,4,8], [1,4,7], [2,5,8], [3,4,5], [6,7,8], [2,4,6]];

    function checkWinner(points) {
        return winningCombination.some(
            combo => combo.every(i => points.includes(i))
        );
    };

    function createPlayer(name, marker) {
        let points = [];
        addPoint = (i) => {
            const index = gameBoard.indexOf(i);
            gameBoard.splice(index, 1);
            points.push(i);
            if(checkWinner(points)) {
                console.log(`${name} won!`);
            };
        };
        getPoint = () => {
            console.log(points);
        };
        return {name, marker, addPoint, getPoint};
    };

    function togglePlayer() {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        };
    };
    
    const player1 = createPlayer('sukhee', 'x');
    const player2 = createPlayer('steve', 'o');
    let currentPlayer = player1;

    const grid = document.querySelectorAll('.cell');

    grid.forEach((cell, i) => {
        cell.addEventListener('click', (e)=> {
            if(gameBoard.includes(i)) {
                e.target.textContent = currentPlayer.marker;
                currentPlayer.addPoint(i);
                togglePlayer();
                console.log(gameBoard);
            } else {
                console.log("CHOOSE AGAIN!")
            }
        });
    });

    return {gameBoard, createPlayer, currentPlayer};
})();





/* 
012
345
678

div deer daraad 

- player uud uuriin gesen mark tai bn
- player uud daraallasan songolt hiij bolohgui


- player uud eeljilj songolt hiine
- playeriin markiig awch gameBoard luu shahna
- gameBoard ylagchiin pattern bgaag shalgana
- pattern taarsan tohioldold togloom duusna
- pattern taaraagui bol daraagiin toglogch songolt hiine


*/