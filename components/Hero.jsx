"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="pt-4 pb-20 pl-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title ">
          Manage Your Finances <br /> With Intelligence
        </h1>
        <p className="text-xl text-gray-600 mt-5 mb-8 max-w-2xl mx-auto font-medium">
          An AI-powered financial management platform that helps you track,
          analyze, and optimize your spending with real-time insights.
        </p>
        <div className="flex justify-center">
          <Link href="/dashboard">
            <Button size="lg" variant="outline" className="px-8 text-[16px] font-semibold hover:bg-black hover:text-white rounded hover:scale-125 transition-all duration-700">
              Get Started
            </Button>
          </Link>
        
        </div>
        <div className="hero-image-wrapper mt-5 md:mt-0">
          <div ref={imageRef} className="hero-image">
            <Image
              src="/banner.jpeg"
              width={1200}
              height={480}
              alt="Dashboard Preview"
              className="rounded-lg shadow-2xl border mx-auto mb-6"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;