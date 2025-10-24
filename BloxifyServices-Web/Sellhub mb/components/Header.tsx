"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { Sidebar } from "./Sidebar";
import { LINKS, LandingPageLinks, NOTIFICATION } from "./config";

const Header = () => {
  const showNotification = NOTIFICATION.showNotification;

  return (
    <header 
      className={`absolute left-0 right-0 z-50 w-full ${
        showNotification ? 'top-12 sm:top-11' : 'top-0'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-20 md:h-24 pt-4 w-full relative">
          <div className="absolute left-0 flex items-center -ml-3 md:ml-0">
            <Link href="/" className="flex items-center">
              <div className="flex items-center space-x-2 md:space-x-3 md:ml-1">
                <div className="hidden md:block md:ml-2"></div>
                <Image
                  src="/logo.png"
                  alt="CordBoosts.com Logo"
                  width={60}
                  height={60}
                  className="w-15 h-15 md:w-16 md:h-16"
                />
                <span 
                  className="text-2xl md:text-3xl text-white md:-ml-1" 
                  style={{ fontFamily: 'Medium, sans-serif' }}
                >
                  Bloxify Services
                </span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-0.5">
            {LandingPageLinks?.filter(link => link.name !== 'Status').map((link) => (
              <Link key={link.name} href={link.link}>
                <span className="text-white/60 hover:text-white transition-all duration-200 text-sm px-2 py-1 rounded-md">
                  {link.name === 'Testimonials' ? 'Reviews' : link.name}
                </span>
              </Link>
            ))}
          </nav>

          <div className="absolute right-0 hidden md:flex items-center">
            <Link href={LINKS.DISCORD} target="_blank">
              <Button 
                size="sm" 
                className="group relative w-28 overflow-hidden bg-[#252525] text-white transition-all duration-300 hover:scale-105 hover:bg-[#252525]/90 hover:shadow-lg hover:shadow-[#252525]/25 border-2 border-[#2b2b2b] rounded-xl px-7 py-5 text-sm font-normal"
                style={{ borderColor: '#2b2b2b17' }}
              >
                Discord
              </Button>
            </Link>
          </div>

          <div className="absolute right-0 md:hidden">
            <Sidebar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;