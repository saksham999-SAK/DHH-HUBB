const audio = document.getElementById("audio");
const playBtns = document.querySelectorAll(".play"); 
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const progress = document.getElementById("progress");

let songIndex = 0;
const songs = ["1", "2", "3","4", "5", "6","7","8", "9", "10",];

function loadSong(song) {
  title.innerText = song;
  audio.src = `songs/${song}.mp3`;
}

loadSong(songs[songIndex]);

playBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      playBtns.forEach(b => b.textContent = "⏸");
    } else {
      audio.pause();
      playBtns.forEach(b => b.textContent = "▶");
    }
  });
});

nextBtn.onclick = () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  audio.play();
  playBtn.textContent = "⏸";
};

prevBtn.onclick = () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  audio.play();
  playBtn.textContent = "⏸";
};

audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
});

progress.oninput = () => {
  audio.currentTime = (progress.value * audio.duration) / 100;
};

