import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import AudioPlayer from './components/AudioPlayer';
import { AudioProvider } from './context/AudioContext';

const Home = lazy(() => import('./pages/Home'));
const Artist = lazy(() => import('./pages/Artist'));
const Wrapped = lazy(() => import('./pages/Wrapped'));

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/artist/:id" element={<PageWrapper><Artist /></PageWrapper>} />
        <Route path="/wrapped" element={<PageWrapper><Wrapped /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <AudioProvider>
        <Suspense fallback={<div style={{ color: 'white', backgroundColor: 'black', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>}>
          <AnimatedRoutes />
        </Suspense>
        {/* Global persistent audio player across pages */}
        <AudioPlayer />
      </AudioProvider>
    </Router>
  );
}

export default App;
