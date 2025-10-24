"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon, Mail, ExternalLink } from "lucide-react"; 
import Link from "next/link";
import { LINKS, LandingPageLinks } from "./config";
import { DiscordIcon } from "@/assests/svgs";

export function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          className="px-2 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
          aria-label="Open menu"
        >
          <MenuIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent 
        className="border-white/10"
        style={{ backgroundColor: 'rgb(38 22 41 / 97%)', backdropFilter: 'blur(12px)' }}
      >
        <SheetHeader>
          <SheetTitle className="text-start bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent font-semibold">
            Menu
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          <nav className="flex flex-col items-center justify-center flex-1 gap-2">
            {LandingPageLinks?.map((link, index) => (
              <Link 
                key={link.name} 
                href={link.link} 
                className="w-full max-w-xs text-center py-3 px-4 rounded-lg hover:bg-white/5 transition-colors"
              >
                <span className="text-gray-300 hover:text-white transition-colors font-medium">
                  {link.name}
                </span>
              </Link>
            ))}
          </nav>

          <div className="space-y-3 pb-6">
            <Link href="#contact">
              <Button 
                className="w-full bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 text-white font-semibold transition-all duration-300 group rounded-full"
              >
                <Mail className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                Contact Us
                <ExternalLink className="h-3.5 w-3.5 ml-2 opacity-50 group-hover:opacity-100 transition-opacity" />
              </Button>
            </Link>
            <Link href={LINKS.DISCORD} target="_blank">
              <Button 
                className="w-full text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg rounded-full group"
                style={{ backgroundColor: '#ff76ed' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = 'black';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ff76ed';
                  e.currentTarget.style.color = 'white';
                }}
              >
                <DiscordIcon className="h-[18px] w-[18px] mr-2 group-hover:scale-110 transition-transform" />
                Join Discord
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}