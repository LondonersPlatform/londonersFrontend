"use client";

import React, { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { getGuestyId } from "@/app/all-listings/Listing";
import Head from "next/head";

export default function Hero() {
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchGuestyId = async (email: string) => {
      try {
        const guestyData = await getGuestyId(email);
        localStorage.setItem("GuestyId", guestyData.guesty_user_id);
     
      } catch (error) {
        console.error("Failed to fetch Guesty ID:", error);
      }
    };

    if (email) {
      fetchGuestyId(email);
    }
  }, [email]);


  return (



    <>
      

      <section className="relative h-[75vh] w-full overflow-hidden">

<video
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  poster="./hero.gif" // Add this image
  className="object-cover w-full h-full brightness-50 transition-all duration-300"
>
  <source src="/lond.mp4" type="video/mp4" />
</video>

       

      </section>
    </>
  );
}
