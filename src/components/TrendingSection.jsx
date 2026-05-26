import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/style.css';

export default function TrendingSection({ title, artists, direction = "up" }) {
  const getInitial = () => {
    if (direction === 'left') return { opacity: 0, x: -120, y: 0, scale: 0.9 };
    if (direction === 'right') return { opacity: 0, x: 120, y: 0, scale: 0.9 };
    return { opacity: 0, x: 0, y: 80, scale: 0.9 };
  };

  return (
    <div style={{ marginBottom: title ? '0' : '40px' }}>
      {title && <span className="textt cinematic" style={{ display: 'block', marginBottom: '30px' }}>{title}</span>}
      <section className="playlist-section" style={{ overflowX: 'auto', scrollSnapType: 'x mandatory' }}>
        {artists.map((artist, idx) => (
          <motion.div 
            className="playlist-card" 
            key={idx}
            initial={getInitial()}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.1, margin: "0px 0px -120px 0px" }}
            transition={{ duration: 0.8, delay: 0.3 + (idx * 0.15), ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, scale: 1.05, backgroundColor: '#2a2a2a' }}
          >
            <div className="media">
              <video 
                src={artist.videoSrc} 
                autoPlay 
                muted 
                loop 
                playsInline 
                preload="auto"
              ></video>
              <Link to={`/artist/${artist.id}`} className="play-btn">▶</Link>
            </div>
            <h3>{artist.name}</h3>
            <p>{artist.description}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
