import { useAudio } from '../context/AudioContext';
import '../styles/style.css'; 

export default function AudioPlayer() {
  const { currentSong, isPlaying, togglePlay, progress, handleSeek, handleNext, handlePrev } = useAudio();

  return (
    <div className="non">
      <section className="music-section">
        <div className="music-container">

          <div className="song-details">
            <h3 id="title">{currentSong.title}</h3>
            <span>Now Playing</span>
          </div>

          <div className="controls">
            <button id="prev" onClick={handlePrev}>⏮</button>
            <button id="play" onClick={togglePlay}>
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button id="next" onClick={handleNext}>⏭</button>
          </div>

          <input 
            type="range" 
            id="progress" 
            value={progress} 
            onChange={(e) => handleSeek(Number(e.target.value))}
          />

        </div>
      </section>
    </div>
  );
}
