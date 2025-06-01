let matrix = []

document.getElementById("csvFileInput").addEventListener("change", function(event) {

    const file = event.target.files[0];
    if (!file) 
        return;
    const reader = new FileReader();
    reader.onload = function(event) {
        matrix = event.target.result
        .trim()
        .split("\n")
        .filter(line => line.trim() !== "")
        .map(line => line.split(";").map(Number));
        
        document.getElementById("ausgabe").textContent = "Adjazenzmatrix geladen:\n" + matrix.map(row => row.join(", ")).join("\n");
    };
    reader.readAsText(file);
});

function rechnen() {
    if (matrix.length === 0) {
        document.getElementById("ausgabe").textContent = "Eyyy, ich brauch ne Matrix!";
        return;
    }

    const n = matrix.length;
    const distanzen = Array.from({ length: n }, () => Array(n).fill(Infinity));
    const exzenti = [];
    let ausgabe = "";

    for (let start = 0; start < n; start++) {
        const besucht = Array(n).fill(false);
        const oneDistanz = Array(n).fill(Infinity);
        const queue = [];

        besucht[start] = true;
        oneDistanz[start] = 0;
        queue.push(start);

        while (queue.length > 0) {
            const current = queue.shift();
            for (let i = 0; i < n; i++) {
                if (matrix[current][i] === 1 && !besucht[i]) {
                    besucht[i] = true;
                    oneDistanz[i] = oneDistanz[current] + 1;
                    queue.push(i);
                }
            }
        }

        distanzen[start] = oneDistanz.slice();

        const maxDist = Math.max(...oneDistanz.filter(x => x < Infinity));
        exzenti.push(maxDist);
        ausgabe += `Knoten ${start}: Exzentrizität = ${maxDist}\n`;
    }

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
