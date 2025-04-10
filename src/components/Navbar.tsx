import React from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
const Navbar = () => {
  return (
    <div className="flex h-full justify-between items-center">
      <ul
        className="flex p-5 gap-4  w-full"
        style={{ backgroundColor: "#182130" }}
      >
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        <li>Home</li>
      </ul>
      <div>
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
