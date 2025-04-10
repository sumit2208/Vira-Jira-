"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import Hero from "@/components/Hero"; 

const HomePage = () => {
  return (
    <>
      <SignedOut>
        {/* Unauthenticated view */}
        <Hero />
      </SignedOut>

      <SignedIn>
        {/* Authenticated view */} 
      </SignedIn>
    </>
  );
};

export default HomePage;
