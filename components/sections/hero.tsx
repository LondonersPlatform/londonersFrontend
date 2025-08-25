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
      

<section className="relative lg:h-[80vh] h-[60vh] w-full overflow-hidden">
  {/* Background Video */}
  <video
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  className="absolute inset-0 w-full h-full object-fill"
>
  <source src="/lond.mp4" type="video/mp4" />
</video>


  {/* Content inside video bg */}
 
</section>

    </>
  );
}
