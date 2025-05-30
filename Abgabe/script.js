// Song of the Day
const sotd = document.getElementById("sotd");
fetch("https://taylor-swift-api.sarbo.workers.dev/songs")
    .then((response) => response.json())
    .then(songs => {
        const randomSong = songs[Math.floor(Math.random() * songs.length)];
        sotd.innerHTML = `&#127926; ${randomSong.title} &#127926;`;
    })
    .catch((error) => {
        console.error("Error fetching lyrics:", error);
        sotd.textContent = "Error loading lyrics.";
    });

//Sudokusolver

const table = document.getElementById("sudokuTable");

for(let row = 0; row < 9; row++) {
    const tr = document.createElement("tr"); //tr = html Element table row
    for(let col = 0; col < 9; col++) { 
        const td = document.createElement("td"); // td = html Element table data
        const input = document.createElement("input");
        input.type = "number";
        input.min = "1";
        input.max = "9";
        input.maxlength = "1";
        td.appendChild(input); 
        tr.appendChild(td);    
    }
    table.appendChild(tr);
}

function finalLoesung() {
    const board = eingetrageneZahlen();
    if(!eingabeKontrolle(board)) {
        alert("Impossible, like a bad Taylor Swift song");
        return;
    }
    if (solve(board)) {
        updateTable(board);
    } else {
        alert("Impossible, like a bad Taylor Swift song");
    }
}

function eingetrageneZahlen() {
    const board = [];
    const rows = table.rows;
    for(let i = 0; i < 9; i++) {
        board[i] = [];
        for(let j = 0; j < 9; j++) {
            const value = rows[i].cells[j].firstChild.value;
            board[i][j] = value === "" ? 0 : parseInt(value);
        }
    }
    return board;
}

function updateTable(board) {
    const rows = table.rows;
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            rows[i].cells[j].firstChild.value = board[i][j] === 0 ? "" : board[i][j];
        }
    }
}

function rules(board, row, col, num) {

    for(let i = 0; i < 9; i++) {
        if(board[row][i] === num)
            return false;  
    }
    
    for(let i = 0; i < 9; i++) {
        if(board[i][col] === num)
            return false;
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(board[startRow + i][startCol + j] === num) 
                return false;
        }
    }
    return true;
}

function solve(board) {
    for(let row = 0; row < 9; row++) {
        for(let col = 0; col < 9; col++) {
            if(board[row][col] === 0) {
                for(let num = 1; num <= 9; num++) {
                    if(rules(board, row, col, num)) {
                        board[row][col] = num;
                        if(solve(board)) {
                            return true;
                        }
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true; 
}

function eingabeKontrolle(board) {
    for(let row = 0; row < 9; row++) {
        for(let col = 0; col < 9; col++) {
            const num = board[row][col];
            if(num !== 0) {
                board[row][col] = 0;
                if(!rules(board, row, col, num)) {
                    return false;
                }
                board[row][col] = num; 
            }
        }
    }
    return true;
}

function resetSudoku() {
    const inputs = document.querySelectorAll("#sudokuTable input");
    inputs.forEach(input => input.value = "");
}





