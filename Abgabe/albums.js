const albums = document.getElementById("albumContainer");
// Alben abrufen
fetch("https://taylor-swift-api.sarbo.workers.dev/albums")
    .then((response) => response.json())
    .then((data) => {
        const ul = document.createElement("ul");
        ul.className = "albumList";
        ul.id = "albumList";

        data.forEach((album) => {
            const li = document.createElement("li");
            li.className = "everySingleAlbum";
            li.setAttribute("data-album-id", album.album_id);

            const titlespan = document.createElement("span");
            titlespan.textContent = album.title;
            li.appendChild(titlespan);

            titlespan.addEventListener("click", () => {
                if (li.classList.contains("opened")) {
                    const songList = li.querySelector("ul");
                    if (songList) songList.remove();
                    li.classList.remove("opened");
                    return;
                }

                li.classList.add("opened");
                const albumId = li.getAttribute("data-album-id");

                // Songs abrufen
                fetch(`https://taylor-swift-api.sarbo.workers.dev/albums/${albumId}`)
                    .then((response) => response.json())
                    .then((songs) => {
                        const songList = document.createElement("ul");

                        songs.forEach((song) => {
                            const songTitel = document.createElement("li");
                            songTitel.className = "songTitle";
                            songTitel.textContent = song.title;

                            // Favoriten-Button
                            const favoriteButton = document.createElement("button");
                            favoriteButton.className = "favoriteButton";
                            favoriteButton.textContent = isFavorite(song) ? "♥" : "♡";
                            favoriteButton.addEventListener("click", (event) => {
                                event.stopPropagation();
                                toggleFavorite(song);
                                favoriteButton.textContent = isFavorite(song) ? "♥" : "♡";
                            });

                            songTitel.appendChild(favoriteButton);
                            songList.appendChild(songTitel);

                            // Lyrics
                            const lyricBox = document.getElementById("lyricBox");

                            songTitel.addEventListener("click", (event) => {
                                event.stopPropagation();
                                if (songTitel.classList.contains("opened")) {
                                    lyricBox.innerHTML = "";
                                    songTitel.classList.remove("opened");
                                    return;
                                }

                                songTitel.classList.add("opened");
                                const songId = song.song_id;

                                fetch(`https://taylor-swift-api.sarbo.workers.dev/lyrics/${songId}`)
                                    .then((response) => response.json())
                                    .then((lyrics) => {
                                        lyricBox.innerHTML = "";
                                        const lyricsFromSong = document.createElement("p");
                                        if (lyrics.lyrics === "") 
                                            lyricsFromSong.innerHTML = "Lyrics not available.";
                                        else
                                            lyricsFromSong.innerHTML = lyrics.lyrics + "...<br>" + "(Auszug aus dem Songtext)";
                                        lyricBox.appendChild(lyricsFromSong);
                                    })
                                    .catch((error) => {
                                        lyricBox.innerHTML = "Error loading lyrics.";
                                        console.error("Error fetching lyrics:", error);
                                    });
                            });
                        });

                        li.appendChild(songList);
                    })
                    .catch((error) => {
                        console.error("Error fetching songs:", error);
                    });
            });

            ul.appendChild(li);
        });

        albums.appendChild(ul);
    })
    .catch((error) => {
        console.error("Error fetching albums:", error);
        albums.textContent = "Error loading albums.";
    });

// Suchfunktion
document.getElementById("searchForm").addEventListener("input", () => {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const albumItems = document.querySelectorAll("#albumList > li.everySingleAlbum");

    albumItems.forEach((album) => {
        const title = album.querySelector("span").textContent.toLowerCase();
        album.style.display = title.includes(searchInput) ? "list-item" : "none";
    });
});

function isFavorite(song) {
    const favorites = JSON.parse(localStorage.getItem("favoriteSongs")) || [];
    return favorites.some(favSong => favSong.song_id === song.song_id);
}

// Favoriten-Logik
function toggleFavorite(song) {
    let favoriteSongs = JSON.parse(localStorage.getItem("favoriteSongs")) || [];
    const exists = favoriteSongs.some(favSong => favSong.song_id === song.song_id);

    if (exists) {
        favoriteSongs = favoriteSongs.filter(favSong => favSong.song_id !== song.song_id);
    } else {
        favoriteSongs.push(song);
    }

    localStorage.setItem("favoriteSongs", JSON.stringify(favoriteSongs));
}