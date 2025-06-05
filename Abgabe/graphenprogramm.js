let matrix = [] //in dem Array wird die Adjazenzmatrix gespeichert

// File Upload von .csv
document.getElementById("csvFileInput").addEventListener("change", function(event) {

    const file = event.target.files[0];
    if (!file) 
        return;

    const reader = new FileReader();
    reader.onload = function(event) {
        matrix = event.target.result
        .trim() //enfernt die Leerzeichen
        .split("\n") //teilt den Text in Zeilen
        .filter(line => line.trim() !== "") //entfernt leere Zeilen
        .map(line => line.split(";").map(Number)); //teilt jede Zeile in Zahlen auf, die durch Semikolon getrennt sind
        
        //Zeigt die geladene Matrix an
        document.getElementById("ausgabe").textContent = "Adjazenzmatrix geladen:\n" + matrix.map(row => row.join(", ")).join("\n");
    };
    reader.readAsText(file);
});

function rechnen() {
    //Prüft ob eine Matrix vorhanden ist
    if (matrix.length === 0) {
        document.getElementById("ausgabe").textContent = "Eyyy, ich brauch ne Matrix!";
        return;
    }

    const n = matrix.length; //Anzahl der Knoten
    const distanzen = Array.from({ length: n }, () => Array(n).fill(Infinity)); //die distanzmatrix wird erstellt und mit Infinity gefüllt
    const exzenti = [];
    let ausgabe = "";

    //Breitensuche
    for (let start = 0; start < n; start++) { //für jeden Knoten wird die Breitensuche durchgeführt
        const besucht = Array(n).fill(false); //Array, das speichert, ob ein Knoten besucht wurde
        const oneDistanz = Array(n).fill(Infinity); //Array, das die Distanz zum Startknoten speichert
        const queue = []; //Warteschlange für die Breitensuche

        besucht[start] = true; //der Startknoten wird als besucht markiert
        oneDistanz[start] = 0; //die Distanz zum Startknoten ist 0
        queue.push(start); //der Startknoten kommt in die Warteschlange

        while (queue.length > 0) { //solange Knoten in der Warteschlange sind
            const current = queue.shift(); //der erste Knoten wird aus der Warteschlange entfernt
            for (let i = 0; i < n; i++) { //für jeden Knoten
                if (matrix[current][i] === 1 && !besucht[i]) { //wenn eine Kante existiert und der Knoten noch nicht besucht wurde
                    besucht[i] = true; //der Knoten wird als besucht markiert
                    oneDistanz[i] = oneDistanz[current] + 1; //die Distanz zum Knoten wird aktualisiert
                    queue.push(i); //der Knoten kommt in die Warteschlange
                }
            }
        }

        distanzen[start] = oneDistanz.slice(); //die Distanz zum Startknoten wird in die Distanzmatrix übernommen

        //Berechnung der Exzentrizität
        const maxDist = Math.max(...oneDistanz.filter(x => x < Infinity));
        exzenti.push(maxDist);
        ausgabe += `Knoten ${start}: Exzentrizität = ${maxDist}\n`;
    }
    //berechnet den Radius, Durchmesser und Zentrum und Ausgabe
    const radius = Math.min(...exzenti);
    const durchmesser = Math.max(...exzenti);
    const zentrum = exzenti.map((e, i) => (e === radius ? i : null)).filter(x => x !== null);

    ausgabe += `\nRadius = ${radius}\nDurchmesser = ${durchmesser}\nZentrum = ${zentrum.join(", ")}\n`;

    ausgabe += `\nDistanzmatrix:\n    ${[...Array(n).keys()].join(" ")}\n`;
    for (let i = 0; i < n; i++) {
        ausgabe += `${i} | ${distanzen[i].map(x => (x === Infinity ? "∞" : x)).join(" ")}\n`;
    }

    document.getElementById("ausgabe").textContent = ausgabe;
}
