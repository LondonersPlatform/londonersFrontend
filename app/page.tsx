
import { useState, useEffect } from "react"
import Header from "@/components/layout/header"
import Hero from "@/components/sections/hero"
import FeaturedListings from "@/components/sections/featured-listings"
import Amenities from "@/components/sections/amenities"
import Experience from "@/components/sections/experience"
import Contact from "@/components/sections/contact"
import Footer from "@/components/layout/footer"

export default function Home() {

  return (
    <div className="flex min-h-screen flex-col">
  
      <Hero />
      <FeaturedListings />
      <Amenities />
      <Experience />
      <Contact />
   
    </div>
  )
}

