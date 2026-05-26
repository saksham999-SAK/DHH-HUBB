import { useRef, useEffect } from 'react';
import '../styles/style.css';

export default function Hero() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const intensity = 140; 
    const ease = 0.05;   

    function lerp(a, b, n) {
      return a + (b - a) * n;
    }

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * intensity;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * intensity;
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    let animationFrameId;
    function animate() {
      currentX = lerp(currentX, targetX, ease);
      currentY = lerp(currentY, targetY, ease);

      text.style.transform = `translate(${currentX}px, ${currentY}px) rotateX(${-currentY / 6}deg) rotateY(${currentX / 6}deg)`;

      animationFrameId = requestAnimationFrame(animate);
    }

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    animate();

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="imgg" ref={containerRef}>
      <p className="t" ref={textRef}>
        WELCOME <br />
        TO <br /> DHH HUB
      </p>
    </div>
  );
}
