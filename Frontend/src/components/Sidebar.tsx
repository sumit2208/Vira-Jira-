"use client";
import { useState } from "react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import {
  Home,
  FolderOpen,
  FlagTriangleRight,
  Menu,
  X,
} from "lucide-react";
import { Button, Typography } from "@mui/joy";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/dashborad" },
    { icon: FolderOpen, label: "Projects", href: "/projectt" },
    { icon: FlagTriangleRight, label: "Issues", href: "/issuepage" },
  ];

  return (
    <>
      {/* Mobile toggle button - only show on mobile */}
      <div className="lg:hidden  ">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-50 bg-gray-800 hover:bg-gray-700 border border-gray-600 transition-all duration-300 shadow-lg"
          sx={{
            minHeight: '44px',
            minWidth: '44px',
            borderRadius: '12px',
            color: 'white',
            backgroundColor: '#1f2937',
            '&:hover': {
              backgroundColor: '#374151',
            }
          }}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          
          fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900
          border-r border-gray-700/50 backdrop-blur-xl z-50
          transform transition-transform duration-300 ease-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          shadow-2xl lg:shadow-none
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-700/50 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
          <Typography
            level="h3"
            sx={{
              color: 'white',
              fontWeight: 700,
              fontSize: '1.5rem',
              letterSpacing: '0.05em',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            Vira
          </Typography>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 pr-10">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className="
                    group flex items-center gap-4 px-4 py-3 rounded-xl
                    text-gray-300 hover:text-white hover:bg-white/10
                    transition-all duration-200 ease-out
                    border border-transparent hover:border-white/20
                    hover:shadow-lg hover:translate-x-1
                  "
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-200">
                    <Icon size={20} className="group-hover:scale-110 transition-transform duration-200" />
                  </div>
                  <Typography
                    level="body-md"
                    sx={{
                      fontWeight: 500,
                      fontSize: '0.95rem',
                      color: 'inherit',
                    }}
                  >
                    {item.label}
                  </Typography>
                  <div className="ml-auto w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rotate-90" />
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-700/50">
          <SignedIn>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200">
              <div className="p-1 rounded-lg bg-gradient-to-br from-blue-500/30 to-purple-500/30">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8 rounded-lg",
                      userButtonPopoverCard: "shadow-2xl border border-gray-700",
                    },
                  }}
                />
              </div>
              <div className="flex-1">
                <Typography
                  level="body-sm"
                  sx={{
                    color: 'rgba(255,255,255,0.9)',
                    fontWeight: 500,
                  }}
                >
                  Account
                </Typography>
                <Typography
                  level="body-xs"
                  sx={{
                    color: 'rgba(255,255,255,0.6)',
                  }}
                >
                  Manage profile
                </Typography>
              </div>
            </div>
          </SignedIn>
        </div>
      </div>
    </>
  );
};

export default Sidebar;