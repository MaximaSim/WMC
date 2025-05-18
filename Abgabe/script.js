const sotd = document.getElementById("sotd");
fetch("https://taylor-swift-api.sarbo.workers.dev/songs")
    .then((response) => response.json())
    .then(songs => {
        const randomSong = songs[Math.floor(Math.random() * songs.length)];
        sotd.innerHTML = `&#127926${randomSong.title}&#127926`;
    })
    .catch((error) => {
        console.error("Error fetching lyrics:", error);
        sotd.textContent = "Error loading lyrics.";
    });

const albums=document.getElementById("albumContainer");

fetch("https://taylor-swift-api.sarbo.workers.dev/albums")
    .then((response) => response.json())
    .then((data) => {
            console.log(data);
            const ul = document.createElement("ul");
            ul.id = "albumList";

            data.forEach((album) => {
                const li = document.createElement("li");
                li.id = "everySingleAlbum";
                li.setAttribute("data-album-id", album.album_id); 

                const titlespan = document.createElement("span");
                titlespan.textContent = album.title;
                li.appendChild(titlespan);

                titlespan.addEventListener("click", () => {
                    if(li.classList.contains("opened")) {
                        const songList = li.querySelector("ul");
                        songList.id = "songList";
                        if (songList) 
                            songList.remove();
                        li.classList.remove("opened");   
                        return;}
                    li.classList.add("opened");
                    const albumId = li.getAttribute("data-album-id");

                    fetch(`https://taylor-swift-api.sarbo.workers.dev/albums/${albumId}`)
                        .then((response) => response.json())
                        .then((songs) => {
                            const songList = document.createElement("ul");

                            songs.forEach((song) => {
                                const songTitel = document.createElement("li");
                                songTitel.id = "songTitle";
                                songTitel.textContent = song.title;
                                songList.appendChild(songTitel);

                                songTitel.addEventListener("click", (event) => {
                                    event.stopPropagation();
                                    if (songTitel.classList.contains("opened")) {
                                        const lyricsFromSong = songTitel.querySelector("p");
                                        if (lyricsFromSong) 
                                            lyricsFromSong.remove();
                                        songTitel.classList.remove("opened");
                                        return;
                                    }
                                    songTitel.classList.add("opened");
                                    const songId = song.song_id;

                                    fetch(`https://taylor-swift-api.sarbo.workers.dev/lyrics/${songId}`)
                                        .then((response) => response.json())
                                        .then((lyrics) => {
                                                const lyricsFromSong = document.createElement("p");
                                                lyricsFromSong.textContent = `"${lyrics.lyrics}"\n\n(Auszug aus den Songtext)`;
                                                songTitel.appendChild(lyricsFromSong);	
                                            })
                                        .catch((error) => {
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