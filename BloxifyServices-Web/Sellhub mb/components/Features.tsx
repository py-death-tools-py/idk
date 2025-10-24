import { Zap, DollarSign, Shield, Scale, Clock, Truck } from "lucide-react";
import React from "react";
import RevealAnimation from "./framer/RevealAnimation";

const FeaturesData = [
  {
    title: "Seamless Payment",
    description: "Ordering from us is a breeze. We accept all major cryptocurrencies, Cash App, PayPal, Venmo, cards, and gift cards for your convenience.",
    icon: DollarSign
  },
  {
    title: "Cheap Prices", 
    description: "Our ultimate motto is to ensure that everyone, regardless of their location, can access high-quality services at an affordable price.",
    icon: Scale
  },
  {
    title: "Trusted & Reputable Seller",
    description: "Our customers consistently provide positive feedback, praising not only our top-tier services but also our premium support.",
    icon: Shield
  },
  {
    title: "Legal Methods",
    description: "All our services are acquired through legal channels, ensuring complete peace of mind.",
    icon: Scale
  },
  {
    title: "24/7 Support", 
    description: "Our unmatched chat support is available 24/7, ready to address any questions or concerns you may have, every single day.",
    icon: Clock
  },
  {
    title: "Automatic Delivery",
    description: "Your order will be delivered in just around 30 seconds after placement, thanks to our ultra-fast automatic delivery system.",
    icon: Truck
  },
];

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon: Icon }) => (
  <RevealAnimation>
    <div className="group relative p-6 border border-white/10 rounded-xl overflow-hidden shadow-xl h-[280px] flex flex-col" style={{ backgroundColor: '#0e0e0e' }}>
      
      <div className="relative z-10 mb-4">
        <Icon className="w-10 h-10 text-white group-hover:text-[#2563eb] transition-colors duration-300 mb-4" />
      </div>
      
      <div className="relative z-10 h-full flex flex-col">
        <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-[#2563eb] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-300 leading-relaxed text-base flex-grow">
          {description}
        </p>
      </div>
    </div>
  </RevealAnimation>
);

const Features: React.FC = () => {
  return (
    <div
      id="features"
      className="relative pt-24 flex flex-col items-center px-4 middle overflow-hidden"
      style={{ backgroundColor: '' }}
    >
      <RevealAnimation screenReveal delay={0.2}>
        <h2 className="relative mt-6 text-4xl font-bold tracking-tight">
          <span className="text-white">
            Why <span className="bg-gradient-to-r from-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent">Us?</span>
          </span>
          <div className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-[#2563eb] to-transparent"></div>
        </h2>
      </RevealAnimation>

      <div className="relative w-full mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {FeaturesData.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;