import { createContext, useContext, useState, useRef, useEffect } from 'react';
import { songsData } from '../data/mockData';

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

export function AudioProvider({ children }) {
  // FIX: Pass the entire songsData array so the queue isn't stuck at 1 song
  const [queue, setQueue] = useState(songsData || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0); 
  
  const audioRef = useRef(null);
  const currentSong = queue[currentIndex];

  // Effect 1: Fires automatically when the track changes
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    setProgress(0);
    audioRef.current.load(); // Forces HTML5 player to load the new URL source

    if (isPlaying) {
      audioRef.current.play().catch(e => console.error("Playback failed on track change", e));
    }
  }, [currentSong]); 

  // Effect 2: Fires when you hit play/pause
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    if (isPlaying) {
      audioRef.current.play().catch(e => console.error("Playback failed on toggle", e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]); 

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const playSong = (songObj, newQueue = null) => {
    if (currentSong?.id === songObj.id) {
      togglePlay();
      return;
    }
    
    if (newQueue && newQueue.length > 0) {
      setQueue(newQueue);
      const idx = newQueue.findIndex(s => s.id === songObj.id);
      setCurrentIndex(idx !== -1 ? idx : 0);
    } else {
      setQueue([songObj]);
      setCurrentIndex(0);
    }
    
    setIsPlaying(true);
  };

  const handleNext = () => {
    if (currentIndex < queue.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0); // Optional: Loops back to the first song
    }
    setIsPlaying(true);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(queue.length - 1); // Optional: Loops back to the last song
    }
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (val) => {
    if (audioRef.current) {
      audioRef.current.currentTime = val;
      setProgress(val);
    }
  };

  return (
    <AudioContext.Provider value={{
      currentSong, 
      isPlaying, 
      playSong, 
      togglePlay, 
      progress, 
      duration, 
      handleSeek, 
      handleNext, 
      handlePrev, 
      queue, 
      currentIndex
    }}>
      {children}
      <audio 
        ref={audioRef} 
        src={currentSong?.url} 
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleNext} // Seamlessly triggers next song when one finishes
      ></audio>
    </AudioContext.Provider>
  );
}