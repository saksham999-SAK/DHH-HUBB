import { createContext, useContext, useState, useRef, useEffect } from 'react';
import { songsData } from '../data/mockData';
const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

export function AudioProvider({ children }) {
  const [queue, setQueue] = useState([{
    id: songsData[0].id,
    title: songsData[0].title,
    url: songsData[0].url
  }]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSong = queue[currentIndex];

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(e => console.error("Playback failed", e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
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
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.log(e));
      }
    }, 50);
  };

  const handleNext = () => {
    if (currentIndex < queue.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsPlaying(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / fileDuration()) * 100;
      setProgress(p || 0);
    }
  };

  const fileDuration = () => audioRef.current?.duration || 1;

  const handleSeek = (val) => {
    if (audioRef.current) {
      audioRef.current.currentTime = (val * fileDuration()) / 100;
      setProgress(val);
    }
  };

  return (
    <AudioContext.Provider value={{
      currentSong, isPlaying, playSong, togglePlay, progress, handleSeek, handleNext, handlePrev, queue, currentIndex
    }}>
      {children}
      <audio 
        ref={audioRef} 
        src={currentSong ? currentSong.url : undefined} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => {
          if (currentIndex < queue.length - 1) {
            handleNext();
          } else {
            setIsPlaying(false);
          }
        }}
      ></audio>
    </AudioContext.Provider>
  );
}
