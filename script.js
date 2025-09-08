const gameBoard = (() => {
    let gameBoard = [
        '0', '1', '2',
        '3', '4', '5',
        '6', '7', '8',];

    function checkWinner() {
        
    }

    function createPlayer(name, mark) {
        addMarker = (i) => {
            gameBoard[i] = mark;
            checkWinner();
        };
        return {name, mark, addMarker};
    };

    const player1 = createPlayer('sukhee', 'o');
    player1.addMarker(2);

    const player2 = createPlayer('david', 'x');
    player2.addMarker(1);

/*
        ylagchiin patternuud
        1. 0,1,2
        2. 0,3,6
        3. 0,4,8
        4. 1,4,7
        5. 2,5,8
        6. 3,4,5
        7. 6,7,8
        8. 2,4,6

        - if gameBoard(0,1,2 === marker) {
            winner
        }
*/
    return {gameBoard};
})();





console.log(gameBoard);

/* 

- player uud uuriin gesen mark tai bn
- player uud daraallasan songolt hiij bolohgui


- player uud eeljilj songolt hiine
- playeriin markiig awch gameBoard luu shahna
- gameBoard ylagchiin pattern bgaag shalgana
- pattern taarsan tohioldold togloom duusna
- pattern taaraagui bol daraagiin toglogch songolt hiine


*/