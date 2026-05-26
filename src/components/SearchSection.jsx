import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SEARCH_USERS } from '../data/searchUsers.js';

export default function SearchSection() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const filteredUsers = SEARCH_USERS.filter(user => 
    user.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{
      width: '100%',
      padding: '100px 40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #000 0%, #111 50%, #000 100%)'
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <motion.h1 
          style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
            fontWeight: 900, 
            color: '#22ff88', 
            textTransform: 'uppercase', 
            letterSpacing: '4px',
            marginBottom: '40px',
            textAlign: 'center',
            textShadow: '0 10px 40px rgba(34,255,136,0.3)'
          }}
        >
          Search Your Fav Artist
        </motion.h1>

        <motion.div 
          animate={{ 
            scale: isFocused ? 1.02 : 1, 
            boxShadow: isFocused ? '0 10px 40px rgba(34,255,136,0.2)' : '0 10px 20px rgba(0,0,0,0.5)',
            borderColor: isFocused ? 'rgba(34,255,136,0.5)' : 'rgba(255,255,255,0.1)'
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '600px',
            marginBottom: '80px',
            borderRadius: '100px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            padding: '2px',
            zIndex: 10
          }}
        >
          <div style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', color: isFocused ? '#22ff88' : '#888', transition: 'color 0.3s ease' }}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
               <circle cx="11" cy="11" r="8"></circle>
               <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
             </svg>
          </div>
          <input
            type="text"
            placeholder="Artists, songs, or podcasts..."
            value={query}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={e => setQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '22px 24px 22px 64px',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontSize: '1.2rem',
              fontWeight: 500,
              letterSpacing: '1px'
            }}
          />
        </motion.div>

        <motion.div 
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '30px',
            width: '100%'
          }}
        >
          <AnimatePresence>
            {filteredUsers.map((user, i) => (
              <motion.div
                key={user.name}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.4, type: 'spring' }}
                whileHover={{ y: -10, scale: 1.03 }}
              >
                <Link to={`/artist/${user.name.toLowerCase().replace(/ /g, '-')}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    position: 'relative',
                    height: '350px',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                    background: '#1a1a1a',
                    cursor: 'pointer'
                  }}>
                    <motion.img 
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                      src={user.pic} 
                      alt={user.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.95) 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: '30px'
                    }}>
                      <h3 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {user.name}
                      </h3>
                      <p style={{ margin: '8px 0 0 0', fontSize: '0.95rem', color: '#b3b3b3', fontWeight: 500, lineHeight: 1.4 }}>
                        {user.bio || 'Verified Artist'}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
            {filteredUsers.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', color: '#666' }}
              >
                <svg style={{ margin: '0 auto 20px' }} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>No matches found</h2>
                <p style={{ fontSize: '1.2rem' }}>We couldn't find any artists for "{query}"</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </motion.div>
    </div>
  );
}
