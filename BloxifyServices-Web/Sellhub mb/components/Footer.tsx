"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

interface QuickLink {
  name: string;
  link: string;
}

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.pageYOffset > 500);
    };
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  return visible ? (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 right-8 p-3 rounded-xl border border-white/10 bg-gradient-to-b from-[#1a0b18] to-[#140a12] overflow-hidden shadow-xl transition-all duration-300 z-50"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowUp className="w-5 h-5 text-[#2563eb]" />
    </motion.button>
  ) : null;
};

const LandingPageLinks: QuickLink[] = [
  { name: "About Us", link: "#about" },
  { name: "Products", link: "#products" },
  { name: "Features", link: "#features" },
  { name: "Reviews", link: "#reviews" },
  { name: "FAQ", link: "#faq" },
  { name: "Terms of Service", link: "/tos" }
];

const Footer: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: custom * 0.15
      }
    })
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        delay: custom * 0.05
      }
    })
  };

  return (
    <motion.footer 
      className="relative pt-24 pb-8"
      style={{ backgroundColor: '' }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-[120rem] mx-4 xl:mx-8 relative z-10">
        <div className="relative p-12">
          <div className="flex flex-col md:flex-row justify-between gap-16 relative z-10">
            <motion.div 
              className="flex flex-col gap-8 max-w-xl"
              custom={1}
              variants={contentVariants}
            >
              <a href="/" className="inline-flex">
                <div className="flex items-center gap-3">
                  <img
                    src="/logo.png"
                    alt="Bloxify"
                    className="w-12 h-12 rounded-xl"
                  />
                  <span className="text-2xl font-bold text-white">
                    Bloxify Services
                  </span>
                </div>
              </a>

              <p className="text-white/80 leading-relaxed text-base">
                Bloxify Services provides the ultimate Discord Server Boosting Service starting at just $0.27 per boosts and Nitro Upgrades at the best affordable prices. Boost your server for cheap with our budget-friendly deals, including opportunities for Free Nitro perks.
              </p>
            </motion.div>

            <motion.div 
             className="flex flex-col gap-4 mt-4"
              custom={2}
              variants={contentVariants}
            >
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {LandingPageLinks?.map((link: QuickLink, index: number) => (
                  <motion.a
                    href={link?.link}
                    key={index}
                    custom={index}
                    variants={linkVariants}
                    whileHover={{ x: 5, color: "#ffffff" }}
                    className="text-white/70 hover:text-white transition-colors duration-200 text-base font-medium"
                  >
                    {link?.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-10"
            custom={3}
            variants={contentVariants}
          />

          <motion.div 
            className="flex flex-col gap-4 relative z-10"
            custom={4}
            variants={contentVariants}
          >
            <p className="text-sm text-white/60">
              &copy; {new Date().getFullYear()} Bloxify Services. All rights reserved.
            </p>
            <p className="text-xs text-white/40 leading-relaxed">
              Bloxify Service Is Not affiliated with Discord Inc. All Discord-related trademarks and intellectual property belong to their respective owners.
            </p>
          </motion.div>
        </div>
      </div>

      <ScrollToTop />
    </motion.footer>
  );
};

export default Footer;