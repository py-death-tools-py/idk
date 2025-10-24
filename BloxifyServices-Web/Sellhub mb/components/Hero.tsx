"use client";

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { Package } from 'lucide-react';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const CheckMarkIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className="text-green-400"
  >
    <g>
      <polyline
        points="21 5 12 14 8 10"
        style={{
          fill: 'none',
          stroke: '#4ade80',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: '2'
        }}
      />
      <path
        d="M20.94,11A8.26,8.26,0,0,1,21,12a9,9,0,1,1-9-9,8.83,8.83,0,0,1,4,1"
        style={{
          fill: 'none',
          stroke: '#4ade80',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: '2'
        }}
      />
    </g>
  </svg>
);

function SlidingBanner() {
  const bannerText = "Bloxify Services | #1 Discord Boosting Service";

  return (
    <section
      className="w-full overflow-hidden relative"
      style={{
        background: 'linear-gradient(90deg, #2563eb, #60a5fa, #2563eb)',
        backgroundSize: '200% 100%',
        animation: 'gradientMove 15s linear infinite'
      }}
    >
      <style global jsx>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .marquee {
          display: flex;
          width: max-content;
          animation: scroll 60s linear infinite;
        }

        .marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="py-1">
        <div className="marquee">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="text-white text-sm whitespace-nowrap px-4">
              {bannerText} <span className="mx-3">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [backgroundParticles, setBackgroundParticles] = useState<Array<{
    id: number,
    x: number,
    y: number,
    baseX: number,
    baseY: number,
    opacity: number,
    size: number
  }>>([]);

  useEffect(() => {
    setIsVisible(true);

    const initParticles: Array<{
      id: number,
      x: number,
      y: number,
      baseX: number,
      baseY: number,
      opacity: number,
      size: number
    }> = [];
    if (typeof window !== 'undefined') {
      for (let i = 0; i < 50; i++) {
        initParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          baseX: Math.random() * window.innerWidth,
          baseY: Math.random() * window.innerHeight,
          opacity: Math.random() * 0.3 + 0.1,
          size: Math.random() * 2 + 1
        });
      }
    }
    setBackgroundParticles(initParticles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const animateParticles = () => {
      setBackgroundParticles(prev =>
        prev.map(particle => {
          const dx = mousePos.x - particle.baseX;
          const dy = mousePos.y - particle.baseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const moveX = (dx / distance) * force * 50;
            const moveY = (dy / distance) * force * 50;

            return {
              ...particle,
              x: particle.baseX + moveX,
              y: particle.baseY + moveY
            };
          }

          return {
            ...particle,
            x: particle.x + (particle.baseX - particle.x) * 0.05,
            y: particle.y + (particle.baseY - particle.y) * 0.05
          };
        })
      );
    };

    const interval = setInterval(animateParticles, 10);
    return () => clearInterval(interval);
  }, [mousePos]);

  const fadeUpClass = "transition-all duration-700 ease-out";
  const initialInvisible = "opacity-0 translate-y-8";
  const visible = isVisible ? "opacity-100 translate-y-0" : initialInvisible;

  const delays = {
    badge: "delay-100",
    heading: "delay-300",
    description: "delay-500",
    buttons: "delay-900",
    stats: "delay-1000",
    image: "delay-500"
  };

  return (
    <section className="relative min-h-[100vh] overflow-hidden flex flex-col justify-between">
      <div className="absolute inset-0 pointer-events-none z-20">
        {backgroundParticles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white"
            style={{
              left: particle.x - particle.size / 2,
              top: particle.y - particle.size / 2,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
              transition: 'all 0.1s ease-out'
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png"
          alt="Hero Background"
          fill
          className="object-cover object-top"
          priority
          quality={100}
          sizes="100vw"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 flex-grow">
        <div className="flex min-h-[90vh] flex-col items-center justify-center -mt-4">
          <div className="flex flex-col items-center justify-center">
            <div className="relative flex flex-col items-center space-y-8 text-center mt-20">
              <div className={`relative ${fadeUpClass} ${visible} ${delays.badge}`}>
                <span className="relative text-lg font-semibold tracking-wider text-white">
                  PREMIUM <span className="bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] bg-clip-text text-transparent">DISCORD</span> SERVICES
                  <div className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-[#3b82f6] to-transparent"></div>
                </span>
              </div>

              <div className={`relative space-y-6 ${fadeUpClass} ${visible} ${delays.heading}`}>
                <h1 className="text-6xl font-medium tracking-tight text-white sm:text-7xl" style={{ fontFamily: 'Medium, sans-serif' }}>
                  <span className="text-white">
                    Cheap <span className="bg-gradient-to-r from-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent">Reliable Discord</span> Boost
                  </span>
                  <br />
                  <span className="text-white">With <span className="bg-gradient-to-r from-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent">BloxifyServices!</span></span>
                </h1>

                <p className={`mx-auto max-w-2xl text-lg text-gray-200 ${fadeUpClass} ${visible} ${delays.description}`}>
                  Get premium Discord server boosts at unbeatable prices. Fast delivery, 24/7 support, and guaranteed reliability for your community growth.
                </p>

                <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 mt-6 ${fadeUpClass} ${visible} ${delays.description}`}>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <CheckMarkIcon />
                      </div>
                    </div>
                    <span className="text-white font-medium">Instant Delivery</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <CheckMarkIcon />
                      </div>
                    </div>
                    <span className="text-white font-medium">24/7 Support</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <CheckMarkIcon />
                      </div>
                    </div>
                    <span className="text-white font-medium">Lowest Price</span>
                  </div>
                </div>
              </div>

              <div className={`flex flex-col sm:flex-row gap-4 ${fadeUpClass} ${visible} ${delays.buttons}`}>
                <Link href="/#products">
                  <Button
                    size="default"
                    className="group relative w-32 overflow-hidden bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#2563eb]/25 border-2 border-t-[#3b82f6] border-x-[#2563eb] border-b-[#1d4ed8] flex items-center justify-center gap-2"
                  >
                    <Package size={18} />
                    Products
                  </Button>
                </Link>
                <Link href="https://discord.gg/bloxifycheap" target="_blank">
                  <Button
                    size="default"
                    className="group relative w-28 overflow-hidden bg-[#252525] text-white transition-all duration-300 hover:scale-105 hover:bg-[#252525]/90 hover:shadow-lg hover:shadow-[#252525]/25 border-2 border-[#2b2b2b]"
                    style={{ borderColor: '#2b2b2b17' }}
                  >
                    Discord
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SlidingBanner />
    </section>
  );
};

export default Hero;