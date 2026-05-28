import { useAudio } from '../context/AudioContext';
import '../styles/style.css'; 

export default function AudioPlayer() {
  // Make sure duration is also exposed by your context!
  const { 
    currentSong, 
    isPlaying, 
    togglePlay, 
    progress, 
    duration, // <-- Add this if you haven't already
    handleSeek, 
    handleNext, 
    handlePrev 
  } = useAudio();

  // Guard clause in case currentSong is null initially
  if (!currentSong) {
    return <div className="music-container">No song selected</div>;
  }

  return (
    <div className="non">
      <section className="music-section">
        <div className="music-container">

          <div className="song-details">
            {/* Safe navigation with optional chaining */}
            <h3 id="title">{currentSong?.title || "Unknown Title"}</h3>
            <span>Now Playing</span>
          </div>

          <div className="controls">
            <button id="prev" onClick={handlePrev}>⏮</button>
            <button id="play" onClick={togglePlay}>
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button id="next" onClick={handleNext}>⏭</button>
          </div>

          {/* Fixed progress bar with min and max */}
          <input 
            type="range" 
            id="progress" 
            min="0"
            max={duration || 100} 
            value={progress} 
            onChange={(e) => handleSeek(Number(e.target.value))}
          />

        </div>
      </section>
    </div>
  );
}