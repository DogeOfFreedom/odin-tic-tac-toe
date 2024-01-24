const gameBoard = (() => {
    let winner = "";
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
    let boardSpaces = {
        1: [0,0],
        2: [0,1],
        3: [0,2],
        4: [1,0],
        5: [1,1],
        6: [1,2],
        7: [2,0],
        8: [2,1],
        9: [2,2],
    }
    let isGameOver = () => {
        for(let boardCheck of boardChecks) {
            let pieces = [];
            for(let boardCell of boardCheck) {
                let [y, x] = boardCell;
                pieces.push(board[y][x]);
            }
            if(!pieces.includes("")) {
                if(pieces.every(x => x === pieces[0])) {
                    winner = pieces[0];
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
    let placePiece = (piece, cell) => {     
        let cell_no = cell.id[cell.id.length-1];        
        let [row, col] = boardSpaces[cell_no];       
        if(board[row][col] == "") {
            board[row][col] = piece;
            let playerPiece = document.createElement("img");
            let img_link = piece == "X" ? "icons/cross.png" : "icons/knot.png";
            playerPiece.src = img_link;
            playerPiece.classList.add("player-piece");
            cell.appendChild(playerPiece);
            return true;
        }
        console.log("invalid move");
        return false;

    }
    let getWinner = () => {
        if(isGameOver()) {
            return winner;
        } else {
            return null;
        }        
    }
    return {getWinner, placePiece};
})();

function createPlayer(playerName, playerPiece) {
    let name = playerName;
    let piece = playerPiece;
    return {name, piece}
}

const gameInstance = (() => {
    let player1;
    let player2;
    let isGameOver = false;
    let winner = null;
    let turn = 1;
    
    let board_cells = document.querySelectorAll(".cell");
    for(let i=0; i < board_cells.length; i++) {
        board_cells[i].addEventListener("click", () => {
            if(isGameOver) {
                return;
            }

            let piece = turn == 1 ? "X" : "O";
            let cell = document.querySelector("#cell" + (i+1));
            let isValidMove = gameBoard.placePiece(piece, cell);
            if(isValidMove) {
                turn *= -1;
                winner = gameBoard.getWinner();
                if(winner !== null) {
                    console.log("GAME OVER");
                    isGameOver = true;
                }
            }            
        })
    }

    let createPlayer1 = name => player1 = createPlayer(name, "X");
    let createPlayer2 = name => player2 = createPlayer(name, "O");
    return {createPlayer1, createPlayer2, turn}
})()

let form_submit_btn = document.querySelector(".form-submit-btn");
form_submit_btn.addEventListener("click", e => {
    e.preventDefault();

    let main_content_container = document.querySelector(".main-content-container");
    main_content_container.classList.remove("hide");
    let player_form_container = document.querySelector(".player-form-container");
    player_form_container.classList.add("hide");

    let player1_name = document.querySelector("input[name='player1-name']").value;
    let player2_name = document.querySelector("input[name='player2-name']").value;
    gameInstance.createPlayer1(player1_name);
    gameInstance.createPlayer2(player2_name);
})