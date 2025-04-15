"use client";
import { useState } from "react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";

import {
  Home,
  FolderOpen,
  FlagTriangleRight,
  BarChartBig, 
  Menu,
  X,
} from "lucide-react";
import { Button, Typography } from "@mui/joy";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <div className="lg:hidden  fixed top-4 left-4 z-50 ">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white bg-gray-800 p-2 rounded-md"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`w-64 bg-[#F7F6FF] text-black h-screen fixed top-0 left-0 p-6 flex flex-col justify-between transition-transform z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div>
          <div className="flex justify-between items-center mb-6"> 
            <Typography
              sx={{ 
                fontSize: "1.25rem",
                fontWeight: "bold",
                ml: isOpen ? 2.5 : 0,
              }}
            >
              Vira
            </Typography>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          <div className="border-1 border-b-black mb-5  "></div>

          <ul className="space-y-4">
            <Link
              href="./dashboard"
              className="flex items-center gap-3 cursor-pointer hover:text-gray-500"
            >
              <Home size={18} /> Dashboard
            </Link>
            <Link
              href="./projectt"
              className="flex items-center gap-3 cursor-pointer hover:text-gray-500"
            >
              <FolderOpen size={18} /> Projects
            </Link>

            <Link
              href="/issuepage"
              className="flex items-center gap-3 cursor-pointer hover:text-gray-500"
            >
              <FlagTriangleRight size={18} /> Issues
            </Link>

            <Link
              href="./reportss"
              className="flex items-center gap-3 cursor-pointer hover:text-gray-500"
            >
              <BarChartBig size={18} /> Reports
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
