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








