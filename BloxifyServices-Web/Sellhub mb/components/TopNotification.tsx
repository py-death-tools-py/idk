"use client";

import Link from "next/link";
import { ArrowRight, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { LINKS, NOTIFICATION } from "./config";

const showNotification = NOTIFICATION.showNotification;
const notificationText = NOTIFICATION.notificationText;
const notificationLink = NOTIFICATION.notificationLink;

const TopNotification = () => {
  const [isHovered, setIsHovered] = useState(false);

  if (!showNotification) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: 0.4,
        ease: "easeOut"
      }}
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800">
        <div 
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGM0LjQxOCAwIDgtMy41ODIgOC04cy0zLjU4Mi04LTgtOC04IDMuNTgyLTggOCAzLjU4MiA4IDggOHoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] 
          opacity-5"
          style={{
            backgroundSize: '30px 30px',
            backgroundPosition: 'center'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <Link 
          href={notificationLink} 
          target="_blank"
          className="block group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div 
            className="px-4 sm:px-6 lg:px-8"
            whileHover={{ scale: 0.995 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative py-2 sm:py-1.5">
              <div className="flex items-center justify-center gap-2 sm:gap-3 text-white">
                <Bell className="w-3.5 h-3.5 relative z-10 flex-shrink-0" aria-hidden="true" />
                <span className="text-xs sm:text-[13px] font-medium tracking-tight text-center leading-tight">
                  {notificationText}
                </span>
                <motion.div
                  animate={{ x: isHovered ? 3 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ArrowRight 
                    className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" 
                    aria-hidden="true"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </Link>
      </div>

      {/* Subtle border lines */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-white/0 via-white/30 to-white/0" />
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-white/0 via-white/30 to-white/0" />
    </motion.div>
  );
};

export default TopNotification;