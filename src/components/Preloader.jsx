import { useEffect, useState } from 'react';
import '../styles/style.css';

let hasPreloaded = false;

export default function Preloader() {
  const [visible, setVisible] = useState(!hasPreloaded);

  useEffect(() => {
    if (hasPreloaded) return;

    const timer = setTimeout(() => {
      setVisible(false);
      hasPreloaded = true;
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div id="preloader" style={{ opacity: visible ? 1 : 0 }}>
      <video id="introVideo" autoPlay muted playsInline>
        <source src="/kyu.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
    </div>
  );
}
