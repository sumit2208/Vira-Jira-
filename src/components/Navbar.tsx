"use client";

import {
  SignIn,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-8 py-4 shadow-sm fixed w-full left-64 bg-white z-10">
      <h2 className="text-lg font-semibold">Dashboard Overview</h2>
      <div>
        <SignedOut> 
                    <SignIn routing="hash"/>
                </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
