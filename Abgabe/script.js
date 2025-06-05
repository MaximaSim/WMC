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

//hier wird die Tabelle erstellt und es dürfen nur Zahlen von 1-9 eingetragen werden 
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

//Hier werden die Funktionen nacheinander aufgerufen und alerts festgelegt
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
    const board = []; // 2D Array für das Sudoku-Board
    const rows = table.rows;
    for(let i = 0; i < 9; i++) { // Schleife für die Zeilen
        board[i] = []; //neues Array für jede Zeile
        for(let j = 0; j < 9; j++) { // Schleife für die Spalten
            const value = rows[i].cells[j].firstChild.value;  //liest den Wert aus dem Input
            board[i][j] = value === "" ? 0 : parseInt(value); //Wenn nichts eingetragen, dann 0, sonst eingetragener Wert
        }
    }
    return board; //gibt das Array mit den eingetragenen Zahlen zurück
}

function updateTable(board) {
    const rows = table.rows;
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            rows[i].cells[j].firstChild.value = board[i][j] === 0 ? "" : board[i][j]; //setzt den Wert im Input-Feld und einen leeren String, wenn der Wert 0 ist
        }
    }
}

//Hier werden die Regeln überprüft, also, dass in Zeile, Spalte oder Box keine Zahl doppelt vorkommen darf
//gibt false zurück, wenn eine zahl doppelt vorkommt
function rules(board, row, col, num) {

    for(let i = 0; i < 9; i++) {  // Überprüft Zeile
        if(board[row][i] === num) 
            return false;  
    }
    
    for(let i = 0; i < 9; i++) { // Überprüft Spalte
        if(board[i][col] === num)
            return false;
    }

    const startRow = Math.floor(row / 3) * 3; //Positon des 3x3 blocks im sudoku
    const startCol = Math.floor(col / 3) * 3;
    for(let i = 0; i < 3; i++) { //ab hier werden alle 9 Felder überprüft
        for(let j = 0; j < 3; j++) {
            if(board[startRow + i][startCol + j] === num) 
                return false;
        }
    }
    return true; //Zahlt ist gültig und kann eingetragen werden
}

// Hauptalgorithmus mit recursion
function solve(board) {
    for(let row = 0; row < 9; row++) {
        for(let col = 0; col < 9; col++) {
            // Wenn ein leeres Feld gefunden 
            if(board[row][col] === 0) {
                for(let num = 1; num <= 9; num++) {
                    //mit der Rules funktion wird für jede Zahl geprüft ob sie eingesetzt werden kann
                    if(rules(board, row, col, num)) {
                        //Zahl wird eingetragen
                        board[row][col] = num;
                        //rekursiver Aufruf und Überprüfung, ob das Sudoku gelöst werden kann, wenn ja dann true
                        if(solve(board)) {
                            return true;
                        }
                        // wenn es nicht gelöst werden kann, wird das geprüfte Feld auf 0 gesetzt
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true; //keine leeren Felder mehr, Sudoku ist gelöst
}

//hier wird der user-input überprüft, ob eine lösung möglich ist, also keine Zahl ist pro Zeile, Spalte oder Box gleich
function eingabeKontrolle(board) {
    for(let row = 0; row < 9; row++) {
        for(let col = 0; col < 9; col++) {
            const num = board[row][col];
            if(num !== 0) {
                board[row][col] = 0;
                if(!rules(board, row, col, num)) {
                    return false; //alert wird ausgegeben
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





