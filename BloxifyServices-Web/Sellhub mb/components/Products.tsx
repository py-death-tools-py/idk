"use client";
import React, { useEffect, useState } from "react";
import DisplayProducts from "./DisplayProducts";
import RevealAnimation from "./framer/RevealAnimation";

const Products = () => {
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBackgroundLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleHashScroll = () => {
      if (window.location.hash === '#products') {
        const element = document.getElementById('products-section');
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    handleHashScroll();
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, []);

  return (
    <section
      id="products-section"
      className="relative min-h-screen pt-8 flex flex-col items-center px-4 overflow-hidden"
      style={{
        backgroundColor: ''
      }}
    >
      <div className="container relative mx-auto px-4 z-30">
        <div className="mb-16 text-center pt-8">
          <RevealAnimation screenReveal delay={0.2}>
            <h2 className="relative mt-6 text-4xl font-bold tracking-tight">
              <span className="text-white">
                <span className="bg-gradient-to-r from-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent">Products</span>
              </span>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 w-20 bg-gradient-to-r from-transparent via-[#2563eb] to-transparent"></div>
            </h2>
          </RevealAnimation>
        </div>

        <div className="w-full pb-8">
          <DisplayProducts />
        </div>
      </div>

      <style jsx>{`
        @font-face {
          font-family: 'CustomMedium';
          src: url('/fonts/Medium.otf') format('opentype');
          font-weight: 500;
          font-style: normal;
          font-display: swap;
        }

        .custom-font {
          font-family: 'CustomMedium', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        }
      `}</style>
    </section>
  );
};

export default Products;