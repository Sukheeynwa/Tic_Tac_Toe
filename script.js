const game = (() => {

    const gameContainer = document.querySelector('#game-container');

    function player(name, marker) {
        let points = [];
        return {name, marker, points};
    };

    const player1 = player('sukhee', 'X');
    const player2 = player('steve', 'O');
 
    const state = (() => {
        const lines = [[0,1,2], [0,3,6], [0,4,8], [1,4,7], [2,5,8], [3,4,5], [6,7,8], [2,4,6]];
        let board = [0,1,2,3,4,5,6,7,8];
        let winner = false;
        let draw = false;
        let current = player1;

        return {lines, board, winner, draw, current};
    })();

    function checkState() {
        if (state.winner) {
            View.renderWinner();
        } else if (state.draw) {
            View.renderDraw();
        };
    };

    const Model = (() => {
        function getWinner(player) {
            if (state.lines.some(line => line.every(i => player.points.includes(i)))) {
                state.winner = true;
            } else if (state.board.length === 0) {
                state.draw = true;
            } else {
                toggle();
            };
        };

        function play(i) {
            const index = state.board.indexOf(i);
            state.board.splice(index, 1);
            state.current.points.push(i);

            getWinner(state.current);
            checkState();
        };

        function reset() {
            state.board = [0,1,2,3,4,5,6,7,8];
            state.winner = false;
            state.draw = false;
            player1.points = [];
            player2.points = [];
            View.renderBoard();
            View.modal.close();
        };

        function toggle() {
            if(state.current === player1) {
                state.current = player2;
            } else {
                state.current = player1;
            };
        };

        return {play, reset};
    })();

    const View = (() => {
        const statusTitle = document.querySelector('#status-title');
        const statusCell = document.querySelector('.status-cell');
        const modal = document.querySelector('#winner-modal');
        const modalTitle = document.querySelector('.title');

        function renderWinner() {
            modalTitle.textContent = `${state.current.name.toUpperCase()} WON!`;
            modal.showModal();
        };

        function renderDraw() {
            modalTitle.textContent = `GAME TIED!`;
            modal.showModal();
        };

        function renderBoard() {
            gameContainer.innerHTML = '';
            for (i = 0; i <= 8; i++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                gameContainer.appendChild(cell);
            };
        };

        function renderStatus() {
            statusCell.textContent = state.current.marker;
            statusCell.className = `status-cell ${state.current.marker}`;
            statusTitle.textContent = `${state.current.name.toUpperCase()}'S TURN`
        };

        function paint(cell) {
            cell.textContent = state.current.marker;
            cell.className = `cell ${state.current.marker}`;
        };

        return {renderWinner, renderDraw, renderBoard, renderStatus, paint, modal};
    })();

    const Control = (() => {
        const startGameButton = document.querySelector('#start-game');
        const resetButton = document.querySelector('#reset-button');

        startGameButton.addEventListener('click', () => {View.renderBoard(); View.renderStatus()});
        resetButton.addEventListener('click', Model.reset);

        gameContainer.addEventListener('click', (e)=> {
            const cell = e.target.closest('.cell');
            if (!cell || !gameContainer.contains(cell)) return;
            const i = Array.from(gameContainer.children).indexOf(cell);

            if(state.board.includes(i)) {
                View.paint(cell);
                Model.play(i);
                View.renderStatus();
            };
        });
    })();
})();

