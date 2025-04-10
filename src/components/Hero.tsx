"use client";
import { 
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut, 
    UserButton,
  } from '@clerk/nextjs'
import Image from "next/image";
import React from "react";
import LandingPage from "../assets/landing.png";

const Hero = () => {
  return (
    <section className="h-screen w-full bg-[#1B2432] text-white flex items-center justify-between px-16">
      <div className="max-w-xl space-y-4">
        <h1 className="text-5xl font-bold leading-tight">
          Modern Task Management for Teams
        </h1>
        <p className="text-lg opacity-90">
          Streamline your workflow, collaborate effectively, and achieve more with our powerful task management platform.
        </p>
        <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 transition px-6 py-2 rounded-xl font-semibold text-white">
          <SignedOut>
                    <SignInButton />
                    <SignUpButton />
                  </SignedOut>  
        </button>
         
      </div>

      <div className="hidden md:block">
        <Image src={LandingPage} alt="landing illustration" width={500} height={500} />
      </div>
    </section>
  );
};

export default Hero;
