"use client";

import React, { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { getGuestyId } from "@/app/all-listings/Listing";

export default function Hero() {
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchGuestyId = async (email: string) => {
      try {
        const guestyData = await getGuestyId(email);
        localStorage.setItem("GuestyId", guestyData.guesty_user_id);
        console.log("Guesty ID:", guestyData);
      } catch (error) {
        console.error("Failed to fetch Guesty ID:", error);
      }
    };

    if (email) {
      fetchGuestyId(email);
    }
  }, [email]);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

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
    <section className="relative h-[75vh]  w-full group overflow-hidden">
      <video
        ref={videoRef}
        src="/bgg.mov"
        loop
        muted
        playsInline
        className="object-cover w-full h-full transition-all duration-300 brightness-50"
      />

      <button
        onClick={togglePlayPause}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   bg-black/70 rounded-full w-14 h-14 flex items-center justify-center 
                   text-white text-2xl z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        {isPlaying ? <Pause /> : <Play />}
      </button>
    </section>
  );
}
