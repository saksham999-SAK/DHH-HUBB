import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

function Counter({ from, to }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (isInView) {
      const controls = animate(from, to, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate: (v) => setCount(Math.floor(v))
      });
      return () => controls.stop();
    } else {
      setCount(from);
    }
  }, [isInView, from, to]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

const Slide = ({ children, bg = "black" }) => (
  <section style={{
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: bg,
    position: 'relative',
    overflow: 'hidden',
    padding: '80px 40px',
    borderBottom: '1px solid rgba(255,255,255,0.05)'
  }}>
    <div style={{ width: '100%', maxWidth: '1400px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {children}
    </div>
  </section>
);

function CardShowcase({ title, items, highlightColor }) {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const itemVariant = { hidden: { y: 100, opacity: 0, rotateX: 45 }, show: { y: 0, opacity: 1, rotateX: 0, transition: { type: 'spring', bounce: 0.4, duration: 0.8 } } };
  
  return (
    <Slide bg="#000">
       <motion.h1 
         initial={{ y: 50, opacity: 0 }} 
         whileInView={{ y: 0, opacity: 1 }} 
         style={{ fontSize: '6rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '80px', color: '#fff', textShadow: '0 20px 40px rgba(0,0,0,0.5)', textAlign: 'center' }}
       >
         {title}
       </motion.h1>
       <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.2 }} style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
         {items.map((it, i) => (
           <motion.div 
             key={i}
             variants={itemVariant} 
             whileHover={{ y: -20, scale: 1.05, rotate: (i % 2 === 0 ? 3 : -3), boxShadow: `0 0 60px ${highlightColor}AA` }} 
             style={{ background: '#111', padding: '20px', borderRadius: '24px', border: `1px solid ${highlightColor}40`, boxShadow: `0 0 20px ${highlightColor}40`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
           >
             <img src={it.img} alt={it.label} style={{ width: '280px', height: '340px', objectFit: 'cover', borderRadius: '16px' }} />
             <h3 style={{ marginTop: '24px', fontSize: '1.5rem', fontWeight: 800, textAlign: 'center', color: '#fff', letterSpacing: '1px' }}>{it.label}</h3>
           </motion.div>
         ))}
       </motion.div>
    </Slide>
  );
}

export default function Wrapped() {
  const topAlbums = [
    { img: '/AA1.jpeg', label: 'P-POP' },
    { img: '/AA2.jpeg', label: 'LUNCH BREAK' },
    { img: '/AA3.jpeg', label: 'SHAKTI KSHAMA' },
    { img: '/AA4.jpeg', label: 'WALK ON WATER' }
  ];

  const topSongs = [
    { img: '/b1.jpeg', label: 'BOYFRIEND' },
    { img: '/b2.jpeg', label: 'BANDA KAAM KA' },
    { img: '/b3.jpeg', label: 'RED' },
    { img: '/b5.jpeg', label: 'BILLO RANI' }
  ];

  const crySongs = [
    { img: '/s1.jpeg', label: 'UNTIL I FOUND LOVE' },
    { img: '/S2.jpeg', label: 'LOVER' },
    { img: '/S8.jpeg', label: 'BACK TO FRIEND' },
    { img: '/S5.jpeg', label: 'NIGHT CHANGES' }
  ];

  return (
    <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      

      <Slide bg="#000">
        <motion.img 
          initial={{ scale: 1.5, opacity: 0, rotate: -10 }} 
          whileInView={{ scale: 1, opacity: 1, rotate: 0 }} 
          viewport={{ once: false }}
          transition={{ duration: 1.5, type: 'spring', bounce: 0.3 }}
          src="/2025.jpeg" 
          style={{ height: '400px', width: '800px', objectFit: 'cover', borderRadius: '40px', boxShadow: '0 40px 100px rgba(0,0,0,0.8)' }} 
        />
        <motion.h1 
          initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}
          style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', marginTop: '60px', fontWeight: 900, color: '#fff', letterSpacing: '4px', textAlign: 'center' }}
        >
          WRAPPED FOR 
        </motion.h1>
        <motion.h2 
          initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.9 }}
          style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', color: '#22ff88', textTransform: 'uppercase', textAlign: 'center', fontWeight: 900, lineHeight: 1, textShadow: '0 0 40px rgba(34,255,136,0.5)' }}
        >
          SAKSHAM BOLDHAN
        </motion.h2>
      </Slide>

    \
      <Slide bg="#000">
        <div style={{ display: 'flex', gap: '60px', alignItems: 'center', width: '100%', justifyContent: 'space-between', padding: '0 5%', flexWrap: 'wrap' }}>
          <motion.div style={{ flex: 1, minWidth: '300px' }} initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1, type: 'spring' }}>
            <h1 style={{ fontSize: 'clamp(4rem, 7vw, 7rem)', lineHeight: 1, fontWeight: 900, color: '#FF2D55' }}>YOU LISTENED.</h1>
            <h2 style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', color: '#fff', opacity: 0.9, marginTop: '10px' }}>WE COUNTED.</h2>
            <div style={{ fontSize: 'clamp(5rem, 10vw, 10rem)', fontWeight: 900, color: '#fff', marginTop: '40px', textShadow: '0 10px 40px rgba(255,255,255,0.2)' }}>
              <Counter from={0} to={19999} />
            </div>
            <p style={{ fontSize: '2rem', letterSpacing: '4px', color: '#888', marginTop: '-20px' }}>MINUTES</p>
          </motion.div>
          <motion.div style={{ flex: 1, minWidth: '300px' }} initial={{ x: 100, opacity: 0, rotateY: 30 }} whileInView={{ x: 0, opacity: 1, rotateY: 0 }} transition={{ duration: 1.2 }}>
            <video src="/yash.mp4" autoPlay muted loop playsInline style={{ width: '100%', borderRadius: '40px', boxShadow: '0 0 80px rgba(255, 45, 85, 0.5)' }} />
          </motion.div>
        </div>
      </Slide>

\
      <Slide bg="#000">
        <div style={{ display: 'flex', gap: '60px', alignItems: 'center', width: '100%', justifyContent: 'space-between', padding: '0 5%', flexWrap: 'wrap-reverse' }}>
          <motion.div style={{ flex: 1, minWidth: '300px' }} initial={{ x: -100, opacity: 0, rotateY: -30 }} whileInView={{ x: 0, opacity: 1, rotateY: 0 }} transition={{ duration: 1.2 }}>
            <video src="/king.mp4" autoPlay muted loop playsInline style={{ width: '100%', borderRadius: '40px', boxShadow: '0 0 80px rgba(29, 185, 84, 0.5)' }} />
          </motion.div>
          <motion.div style={{ flex: 1, minWidth: '300px', textAlign: 'right' }} initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1, type: 'spring' }}>
            <h1 style={{ fontSize: 'clamp(4rem, 6vw, 6rem)', lineHeight: 1.1, fontWeight: 900, color: '#fff' }}>YOUR LISTENING</h1>
            <h2 style={{ fontSize: 'clamp(4rem, 6vw, 6rem)', color: '#1DB954', marginTop: '10px' }}>AGE.</h2>
            <div style={{ fontSize: 'clamp(6rem, 12vw, 12rem)', fontWeight: 900, color: '#fff', marginTop: '20px', textShadow: '0 10px 40px rgba(255,255,255,0.2)' }}>
              <Counter from={0} to={21} />
            </div>
            <p style={{ fontSize: '2rem', letterSpacing: '4px', color: '#888', marginTop: '-20px' }}>YEARS OLD</p>
          </motion.div>
        </div>
      </Slide>

     
      <CardShowcase title="TOP ALBUM" items={topAlbums} highlightColor="#AF1952" />
      <CardShowcase title="TOP SONG" items={topSongs} highlightColor="#FF2D55" />
      <CardShowcase title="CRY AARA H" items={crySongs} highlightColor="#1DB954" />




      <Slide bg="#000">
         <motion.h1 initial={{ y: -50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', color: '#fff', marginBottom: '60px', textAlign: 'center', textTransform: 'uppercase' }}>BUT THE BEST SINGER IS</motion.h1>
         <motion.div initial={{ scale: 0.8, opacity: 0, borderRadius: '100px' }} whileInView={{ scale: 1, opacity: 1, borderRadius: '40px' }} transition={{ duration: 1 }} style={{ width: '90%', height: '70vh', overflow: 'hidden', boxShadow: '0 0 120px rgba(255, 215, 0, 0.5)' }}>
            <video src="/v5.mp4" autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}></video>
         </motion.div>
      </Slide>

   
      <Slide bg="#000">
         <motion.h1 
           initial={{ scale: 0.5, opacity: 0 }} 
           whileInView={{ scale: [0.5, 1.2, 1], opacity: 1 }} 
           transition={{ duration: 1 }}
           style={{ fontSize: 'clamp(5rem, 9vw, 9rem)', color: '#FFD700', fontWeight: 900, textTransform: 'uppercase', textShadow: '0 0 60px rgba(255,215,0,0.6)', zIndex: 10, textAlign: 'center', lineHeight: 1 }}
         >
           THE GOAT <br /> THE GOAT
         </motion.h1>
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '60px', flexWrap: 'wrap' }}>
           {['/v1.jpg', '/v2.jpg', '/v3.jpg', '/v5.jpg', '/v7.jpg'].map((img, idx) => (
             <motion.img 
               key={idx}
               initial={{ opacity: 0, y: 100, rotate: (idx % 2 === 0 ? -20 : 20) }}
               whileInView={{ opacity: 1, y: 0, rotate: (idx - 2) * 5 }}
               transition={{ delay: idx * 0.15, type: 'spring', bounce: 0.4 }}
               whileHover={{ y: -30, scale: 1.1, rotate: 0, zIndex: 20, boxShadow: '0 0 60px rgba(255, 215, 0, 0.8)' }}
               src={img} 
               style={{ width: '220px', height: '320px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)', cursor: 'pointer', border: '1px solid rgba(255, 215, 0, 0.3)' }}
             />
           ))}
         </div>
      </Slide>

    </div>
  );
}
