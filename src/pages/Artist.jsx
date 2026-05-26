import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { artistsData } from '../data/mockData';
import { useAudio } from '../context/AudioContext';

import '../styles/ap.css'; 

export default function Artist() {
  const { id } = useParams();
  const { playSong, isPlaying, currentSong, togglePlay } = useAudio();
  
  const artist = artistsData.find(a => a.id === id);

  if (!artist) {
    return (
      <div>
        <div style={{color: 'white', padding: '100px', textAlign: 'center'}}>
          <h1>Artist Not Found</h1>
          <Link style={{color: 'green'}} to="/">Go Back Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh', color: 'white' }}>
      <section className="artist-hero">
        <div className="overlay"></div>

        <div className="artist-content" style={{ zIndex: 10, position: 'relative' }}>
          <div className="verified">
            <span className="check">✔</span>
            <span>Verified Artist</span>
          </div>

          <h1>{artist.name}</h1>
          <p>{artist.monthlyListeners} monthly listeners</p>
        </div>
      </section>

      <div className="track-list" style={{ paddingBottom: '140px' }}>
        {artist.tracks.map((track, idx) => {
          const isActive = currentSong?.songUrl === track.songUrl;
          
          return (
            <motion.div 
              className="track" 
              key={idx}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.1, margin: "0px 0px -120px 0px" }}
              transition={{ duration: 0.6, delay: 0.1 + (idx * 0.1), ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}
            >
              <div className="left">
                <span className="index">{idx + 1}</span>
                <button className="play" onClick={() => playSong({ id: track.songUrl, title: track.title, url: `/songs/${track.songUrl}.mp3` }, artist.tracks.map(t => ({ id: t.songUrl, title: t.title, url: `/songs/${t.songUrl}.mp3` })))}>
                  {isActive && isPlaying ? "⏸" : "▶"}
                </button>
                <img src={track.image || artist.imageSrc} alt="" />
                <div className="title">
                  <h4>{track.title}</h4>
                  {track.explicit && <span className="explicit">E</span>}
                </div>
              </div>
              <div className="streams">{track.streams}</div>
              <div className="duration">{track.duration}</div>
            </motion.div>
          )
        })}
      </div>
    </div>
  );
}
