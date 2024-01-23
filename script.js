const gameBoard = (() => {
    let board = [["","",""],["","",""],["","",""]];
    let boardChecks = [
        [[0,0], [0,1], [0,2]],
        [[1,0], [1,1], [1,2]],
        [[2,0], [2,1], [2,2]],
        [[0,0], [1,0], [2,0]],
        [[0,1], [1,1], [2,1]],
        [[0,2], [1,2], [2,2]],
        [[0,0], [1,1], [2,2]],
        [[0,2], [1,1], [2,0]]
    ]
    let isGameOver = () => {
        for(let boardCheck of boardChecks) {
            let symbols = [];
            for(let boardCell of boardCheck) {
                let [y, x] = boardCell;
                symbols.push(board[y][x]);
            }
            if(!symbols.includes("")) {
                if(symbols.every(x => x === symbols[0])) {
                    return true;
                } else {
                    continue;
                }
            } else {
                continue;
            }
        }
        return false;
    }

    let placeSymbol = (symbol, row, col) => {
        if(board[row][col] == "") {
            board[row][col] = symbol;
        }
        console.log(board);
    }

    return {isGameOver, placeSymbol};
})();
