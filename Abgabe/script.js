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








<<<<<<< HEAD
=======
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
                                                const lyricsFromSong = document.createElement("div");
                                                lyricsFromSong.id = "lyrics";
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
>>>>>>> adc88a8f4c89472160f89195aa4bf286674d17b7
