import React from 'react';
import Navbar from '../components/Navbar';
import Preloader from '../components/Preloader';
import Hero from '../components/Hero';
import TrendingSection from '../components/TrendingSection';
import WrappedSection from '../components/WrappedSection';
import CommentSection from '../components/CommentSection';
import SearchSection from '../components/SearchSection';
import { artistsData, initialComments } from '../data/mockData';

export default function Home() {
  const trending1 = artistsData.slice(0, 4);
  const trending2 = artistsData.slice(4, 8);

  return (
    <>
      <Preloader />
      <Navbar />
      <Hero />
      <div 
        className="con layout-spacing"
        style={{
          backgroundImage: "url('/bg.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "2rem",
          borderRadius: "16px"
        }}
      >
        <TrendingSection title="TRENDING ARTIST" artists={trending1} direction="left" />
        <TrendingSection title="" artists={trending2} direction="right" />
      </div>
      <WrappedSection />
      <CommentSection initialComments={initialComments} />
      <SearchSection />
    </>
  );
}
