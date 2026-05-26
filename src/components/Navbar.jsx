import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);
  
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    

    handleScroll();
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: isScrolled ? '12px 0' : '24px 0',
        background: isScrolled ? 'rgba(10, 10, 10, 0.65)' : 'transparent',
        backdropFilter: isScrolled ? 'saturate(180%) blur(24px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'saturate(180%) blur(24px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        
        
        <Link to="/" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', zIndex: 1001 }}>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ fontSize: '28px', fontWeight: '800', letterSpacing: '4px', fontFamily: '"Oswald", sans-serif', color: '#fff' }}
          >
            DHH<span style={{ color: '#22ff88' }}>HUB</span>
          </motion.div>
        </Link>

        
        {!isMobile && (
          <nav style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center'
          }}
          onMouseLeave={() => setHoveredPath(null)}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onMouseEnter={() => setHoveredPath(item.path)}
                  style={{
                    position: 'relative',
                    padding: '8px 16px',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
                    transition: 'color 0.3s ease',
                    letterSpacing: '1px'
                  }}
                >
                  <span style={{ position: 'relative', zIndex: 2 }}>{item.name}</span>
                  {hoveredPath === item.path && (
                    <motion.div
                      layoutId="navIndicator"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        borderRadius: '20px',
                        zIndex: 1
                      }}
                      transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                    />
                  )}
                  {isActive && !hoveredPath && (
                    <motion.div
                      layoutId="activeIndicator"
                      style={{
                        position: 'absolute',
                        bottom: 4,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '20px',
                        height: '2px',
                        backgroundColor: '#22ff88',
                        borderRadius: '2px',
                        zIndex: 1
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        )}


        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {!isMobile && (
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'rgba(255,255,255,0.05)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '10px 24px',
                borderRadius: '100px',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '1px',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
            >
              GET APP
            </motion.button>
          )}

  
          {isMobile && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                width: '40px',
                height: '40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '6px',
                zIndex: 1001
              }}
            >
              <motion.div animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} style={{ width: '24px', height: '2px', background: '#fff', borderRadius: '2px' }} />
              <motion.div animate={isOpen ? { opacity: 0 } : { opacity: 1 }} style={{ width: '24px', height: '2px', background: '#fff', borderRadius: '2px' }} />
              <motion.div animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} style={{ width: '24px', height: '2px', background: '#fff', borderRadius: '2px' }} />
            </button>
          )}
        </div>
      </div>


      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(10, 10, 10, 0.95)',
              backdropFilter: 'blur(30px)',
              pointerEvents: isOpen ? 'auto' : 'none',
              display: 'flex',
              flexDirection: 'column',
              padding: '100px 24px 24px',
              zIndex: 999
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    style={{
                      fontSize: '28px',
                      fontWeight: 700,
                      color: location.pathname === item.path ? '#22ff88' : '#fff',
                      textDecoration: 'none',
                      letterSpacing: '2px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                style={{ marginTop: '20px' }}
              >
                <button
                  style={{
                    width: '100%',
                    background: '#22ff88',
                    color: '#000',
                    border: 'none',
                    padding: '16px',
                    borderRadius: '100px',
                    fontSize: '16px',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    cursor: 'pointer'
                  }}
                >
                  GET APP
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
