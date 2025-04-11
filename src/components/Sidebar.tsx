"use client";
import { useState } from "react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import {
  Home,
  FolderOpen,
  FlagTriangleRight,
  BarChartBig,
  Settings2,
  Menu,
  X,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white bg-gray-800 p-2 rounded-md"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`w-64 bg-gray-800 text-white h-screen fixed top-0 left-0 p-6 flex flex-col justify-between transition-transform z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className= {`text-xl font-bold  ${isOpen? "ml-10":""}  `}>Vira</h1>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

            <div className="border-1 border-b-black mb-5  "></div>

          <ul className="space-y-4">
            <li className="flex items-center gap-3 cursor-pointer hover:text-gray-500">
              <Home size={18} /> Dashboard
            </li>
            <li className="flex items-center gap-3 cursor-pointer hover:text-gray-500">
              <FolderOpen size={18} /> Projects
            </li>
            <li className="flex items-center gap-3 cursor-pointer hover:text-gray-500">
              <FlagTriangleRight size={18} /> Issues
            </li>
            <li className="flex items-center gap-3 cursor-pointer hover:text-gray-500">
              <BarChartBig size={18} /> Reports
            </li>
            <li className="flex items-center gap-3 cursor-pointer hover:text-gray-500">
              <Settings2 size={18} /> Settings
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
