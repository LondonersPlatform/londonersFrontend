"use client"
import React, { useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react'; // Importing Play and Pause icons from lucide-react

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null); // Specify the type for videoRef
  const [isPlaying, setIsPlaying] = useState(false); // State to track if the video is playing

  // Toggle play/pause for the video
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section className="relative h-[500px] w-full group">
      <video
        ref={videoRef}
        src="/bgg.mov" // Ensure the path is correct for your video file in the public folder
      autoPlay
        loop
        muted
        className="object-cover w-full h-full transition-all duration-300 brightness-50"
      />
      
      <button
        onClick={togglePlayPause}
        className="absolute bg-black rounded-full w-14 h-14 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-white text-2xl z-10"
      >
        {isPlaying ? <Pause /> : <Play />} {/* Toggle play/pause icon */}
      </button>
    </section>
  );
}
