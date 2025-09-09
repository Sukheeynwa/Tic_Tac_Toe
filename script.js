const game = (() => {
    const winningCombination = [[0,1,2], [0,3,6], [0,4,8], [1,4,7], [2,5,8], [3,4,5], [6,7,8], [2,4,6]];
    const winnerModal = document.querySelector('#winner-modal');
    const winnerModalTitle = document.querySelector('.title');
    const resetButton = document.querySelector('#reset-button');
    const statusTitle = document.querySelector('#status-title');
    const statusCell = document.querySelector('.status-cell');
    const grid = document.querySelectorAll('.cell');

    const player1 = createPlayer('sukhee', 'X');
    const player2 = createPlayer('steve', 'O');

    let gameBoard = [0,1,2,3,4,5,6,7,8];
    let currentPlayer = player2;
    
    function createPlayer(name, marker) {
        const points = [];
        return {name, marker, points};
    };

    function checkWinner(player) {
        if (winningCombination.some(combo => combo.every(i => player.points.includes(i)))) {
            winnerModalTitle.textContent = `${player.name.toUpperCase()} WON!`;
            winnerModal.showModal();
        } else {
            checkBoard(gameBoard);
        };
    };

    function checkBoard(board) {
        if (board.length === 0) {
            winnerModalTitle.textContent = `GAME TIED!`;
            winnerModal.showModal();
        };
    };

    function resetGame() {
        gameBoard = [0,1,2,3,4,5,6,7,8];
        player1.points = [];
        player2.points = [];
        grid.forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
        });
        winnerModal.close();
    };

    function addPoint(player, i) {
        const index = gameBoard.indexOf(i);
        gameBoard.splice(index, 1);
        player.points.push(i);
    };

    function togglePlayer() {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        };
        statusCell.textContent = currentPlayer.marker;
        statusCell.className = `status-cell ${currentPlayer.marker}`;
        statusTitle.textContent = `${currentPlayer.name.toUpperCase()}'S TURN`
    };

    grid.forEach((cell, i) => {
        cell.addEventListener('click', (e)=> {
            if(gameBoard.includes(i)) {
                e.target.textContent = currentPlayer.marker;
                e.target.className = `cell ${currentPlayer.marker}`;
                addPoint(currentPlayer, i);
                checkWinner(currentPlayer);
                togglePlayer();
            };
        });
    });

    resetButton.addEventListener('click', resetGame);

    togglePlayer();

    return {};
})();