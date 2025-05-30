function updateFavoritesList() {
    const list = document.getElementById("favoritesList");
    if (!list) return;

    const favorites = JSON.parse(localStorage.getItem("favoriteSongs")) || [];
    list.innerHTML = "";

    if (favorites.length === 0) {
        list.innerHTML = "<p>No favorite songs yet.</p>";
        return;
    }

    favorites.forEach((song) => {
        const li = document.createElement("li");
        const youtubeLink = document.createElement("a");
        youtubeLink.href = `https://www.youtube.com/results?search_query=Taylor+Swift+${encodeURIComponent(song.title)}`;
        youtubeLink.target = "_blank";
        youtubeLink.textContent = "▶ YouTube";

        const spotifyLink = document.createElement("a");
        spotifyLink.href = `https://open.spotify.com/search/Taylor%20Swift%20${encodeURIComponent(song.title)}`;
        spotifyLink.target = "_blank";
        spotifyLink.textContent = "▶ Spotify";
        

        li.appendChild(document.createTextNode(song.title + " "));
        li.appendChild(youtubeLink);
        li.appendChild(document.createTextNode(" --- "));
        li.appendChild(spotifyLink);
        list.appendChild(li);
    });
}

// Favoriten beim Laden anzeigen
document.addEventListener("DOMContentLoaded", () => {
    updateFavoritesList();
});
