import { Star as StarIcon } from "lucide-react";
import React from "react";
import RevealAnimation from "./framer/RevealAnimation";
import MobileScreenAnimation from "./framer/MobileScreenAnimation";

interface FeatureItemProps {
  text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ text }) => (
  <RevealAnimation>
    <div className="flex flex-row items-center gap-2 group">
      <div className="relative w-2 h-2">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2563eb] to-[#60a5fa] rounded-full" />
      </div>
      <div className="text-white font-medium">
        {text}
      </div>
    </div>
  </RevealAnimation>
);

const Aboutus = () => {
  const features = [
    "24/7 Customer Support",
    "Instant Delivery",
    "Most affordable pricing."
  ];

  return (
    <div
      id="aboutus"
      className="relative pt-24 flex flex-col items-center px-4 middle overflow-hidden"
      style={{ backgroundColor: '' }}
    >
      <RevealAnimation screenReveal delay={0.2}>
        <h2 className="relative mt-6 text-4xl font-bold tracking-tight">
          <span className="text-white">
            About <span className="bg-gradient-to-r from-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent">Us</span>
          </span>
          <div className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-[#2563eb] to-transparent"></div>
        </h2>
      </RevealAnimation>

      <div className="relative flex flex-col-reverse lg:flex-row gap-10 w-full mt-20 lg:items-center">
        <div className="lg:w-1/2 mt-10 lg:mt-0">
          <RevealAnimation>
            <MobileScreenAnimation />
          </RevealAnimation>
        </div>
        <div className="lg:w-1/2 flex flex-col gap-8">
          <RevealAnimation>
            <div className="font-semibold text-4xl text-white">
              We&apos;re your top choice for Discord needs.
            </div>
          </RevealAnimation>
          <RevealAnimation>
            <div className="text-muted-foreground/90 leading-relaxed">
              With over 24 months of experience, our server boosting service<br />
              stands as the pinnacle of reliability, respect, and renown<br />
              in the industry.
            </div>
          </RevealAnimation>
          <div className="flex flex-col gap-3">
            {features.map((feature, index) => (
              <FeatureItem key={index} text={feature} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;