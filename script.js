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
    let reset_board = () => board = [["","",""],["","",""],["","",""]];
    return {getWinner, placePiece, reset_board};
})();

function createPlayer(playerPiece) {
    let name;
    let piece = playerPiece;
    return {name, piece}
}

let playerManager = (() => {
    let player1 = createPlayer("X");
    let player2 = createPlayer("O");
    let turn_indicator = document.querySelector(".turn-indicator-text");

    let set_first_turn_text = () => {
        turn_indicator.textContent = `It is ${player1.name}'s turn`;
    }

    let change_turn_text = (turn) => {
        turn_indicator.textContent = turn == 1 ? `It is ${player1.name}'s turn` : `It is ${player2.name}'s turn`;
    }

    let set_winner_text = piece => {
        let winner = player1.piece == piece ? player1.name : player2.name;
        turn_indicator.textContent = `${winner} WINS!`
    }

    return {player1, player2, set_first_turn_text, change_turn_text, set_winner_text}
})();

const gameInstance = (() => {
    let isGameOver = false;
    let winner = null;
    let turn = 1;
    let turn_counter = 0;
    
    let board_cells = document.querySelectorAll(".cell");
    for(let i=0; i < board_cells.length; i++) {
        board_cells[i].addEventListener("click", () => {
            if(isGameOver) {
                return;
            }
            let piece = turn == 1 ? playerManager.player1.piece : playerManager.player2.piece;
            let cell = document.querySelector("#cell" + (i+1));
            let isValidMove = gameBoard.placePiece(piece, cell);
            if(isValidMove) {
                turn_counter++;
                turn *= -1;
                playerManager.change_turn_text(turn);
                winner = gameBoard.getWinner();
                if(winner !== null) {
                    console.log("GAME OVER");
                    isGameOver = true;
                    playerManager.set_winner_text(winner);
                }
            }            
        })
    }

    let reset_board = () => {
        isGameOver = false;
        winner = null;
        turn = 1;
        gameBoard.reset_board();
        playerManager.set_first_turn_text();
        for(let cell of board_cells) {
            cell.replaceChildren();
        }
    }
    return {reset_board}
})()

let form_submit_btn = document.querySelector(".form-submit-btn");
form_submit_btn.addEventListener("click", e => {
    e.preventDefault();
    let player1_name = document.querySelector("input[name='player1-name']").value;
    let player2_name = document.querySelector("input[name='player2-name']").value;

    if(player1_name !== "" && player2_name !== "") {
        let main_content_container = document.querySelector(".main-content-container");
        main_content_container.classList.remove("hide");
        let player_form_container = document.querySelector(".player-form-container");
        player_form_container.classList.add("hide");
        playerManager.player1.name = player1_name;
        playerManager.player2.name = player2_name;
        playerManager.set_first_turn_text();
    }
})

let reset_btn = document.querySelector(".reset-button");
reset_btn.addEventListener("click", gameInstance.reset_board);