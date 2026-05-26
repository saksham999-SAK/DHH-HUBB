import { Link } from 'react-router-dom';
import '../styles/style.css';

export default function WrappedSection() {
  return (
    <div className="co">
      <div className="mid">
        <video className="bg-video" src="/b3.mp4" autoPlay muted loop playsInline></video>
        <div className="overlay"></div>

        <div className="playlist-cardd">
          <div className="mediaa">
            <video src="/bgg.mp4" autoPlay muted loop playsInline preload="auto"></video>
            <Link to="/wrapped" className="play-btn">▶</Link>
          </div>
          <h3>DHH WRAPPED</h3>
          <p>Click on play button to see the wrapped</p>
        </div>
      </div>
    </div>
  );
}
