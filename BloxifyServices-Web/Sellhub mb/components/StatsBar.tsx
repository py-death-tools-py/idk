"use client";

import React from 'react';
import { DollarSign, Rocket, Star } from 'lucide-react';

const steps = [
  {
    number: "1",
    icon: <DollarSign className="w-6 h-6 text-[#6bbec4]" />,
    title: "Place an order",
    description: "Select the plan that fits your requirements and place your order."
  },
  {
    number: "2",
    icon: <Rocket className="w-6 h-6 text-[#6bbec4]" />,
    title: "Get your boosts",
    description: "Once the payment has been confirmed we'll automatically proceed your order."
  },
  {
    number: "3",
    icon: <Star className="w-6 h-6 text-[#6bbec4]" />,
    title: "Enjoy full experience",
    description: "Within a few minutes you'll be able to use all premium features that a boosted server can offer."
  }
];

const StatsBar = () => {
  return (
    <div className="w-full py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          How it works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group bg-gradient-to-r from-[#4d9fcf]/5 to-[#6bbec4]/5 rounded-2xl p-6 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-300"
            >
              {/* Step number */}
              <div className="absolute -top-4 left-6 bg-gradient-to-r from-[#4d9fcf] to-[#6bbec4] rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
                {step.number}
              </div>
              
              {/* Icon */}
              <div className="mb-4 p-3 bg-white/5 rounded-xl w-fit group-hover:bg-white/10 transition-colors duration-300">
                {step.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {step.description}
              </p>
              
              {/* Connector line for non-last items */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-[#4d9fcf]/20 to-[#6bbec4]/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;