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
        li.textContent = song.title;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => {
            toggleFavorite(song);
            updateFavoritesList();
        });

        li.appendChild(removeButton);
        list.appendChild(li);
    });
}

// Favoriten beim Laden anzeigen
document.addEventListener("DOMContentLoaded", () => {
    updateFavoritesList();
});
