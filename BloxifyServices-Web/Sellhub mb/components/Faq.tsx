"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import RevealAnimation from "./framer/RevealAnimation";

const faqData = [
  {
    id: "1",
    title: "How can I get in touch with support after I bought the product?",
    description: "To get in touch with support after making a purchase, you can use the built-in ticketing system. Simply visit the contact page to submit your details and we will get back to you ASAP.",
    points: []
  },
  {
    id: "2", 
    title: "Can I make payments using my preferred method?",
    description: "Yes, we support a wide range of payment methods, including popular fiat options like Credit Cards as well as various cryptocurrencies. This enables you to make payments using the method that is most convenient for you.",
    points: []
  },
  {
    id: "3",
    title: "Is it safe to make payments?",
    description: "Yes, we take security very seriously. We use advanced fraud prevention measures to protect against fraudulent transactions and we securely store all payment information.",
    points: []
  },
  {
    id: "4",
    title: "How do I make a purchase?",
    description: "Making a purchase is easy. Simply browse the available products and add the ones you wish to purchase to your cart. When you are ready to checkout, you will be prompted to enter your payment information and complete the transaction.",
    points: []
  },
  {
    id: "5",
    title: "What is the return policy for purchases?",
    description: "The return policy for purchases will vary depending on the specific product being purchased. It is important to review the return policy for each product before making a purchase to ensure that you understand the terms and conditions.",
    points: []
  }
];

interface FAQ {
  id: string;
  title: string;
  description: string;
  points: string[];
}

interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ faq, isOpen, onToggle }) => {
  return (
    <RevealAnimation>
     <div className="border border-white/10 rounded-xl overflow-hidden" style={{ backgroundColor: '#0e0e0e' }}>
        <button
          onClick={onToggle}
          className="w-full px-6 py-5 flex items-center justify-between text-left"
        >
          <h3 className="text-lg font-medium text-white pr-4">{faq.title}</h3>
          <div className="flex-shrink-0 text-white/70">
            {isOpen ? (
              <ChevronUp className="w-5 h-5 text-[#2563eb]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#2563eb]" />
            )}
          </div>
        </button>
        
        {isOpen && (
          <div className="px-6 pb-6 border-t border-white/5">
            <div className="pt-4">
              <p className="text-[#2563eb] leading-relaxed mb-4">{faq.description}</p>
              {faq.points.length > 0 && (
                <div className="space-y-2">
                  {faq.points.map((point, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-4 h-4 flex-shrink-0 bg-gradient-to-r from-[#2563eb] to-[#60a5fa] rounded-full flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-[#2563eb]">{point}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </RevealAnimation>
  );
};

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div
      id="faq"
      className="relative pt-24 flex flex-col items-center px-4 middle overflow-hidden"
      style={{ backgroundColor: '' }}
    >
      <RevealAnimation screenReveal delay={0.2}>
        <h2 className="relative mt-6 text-4xl font-bold tracking-tight">
          <span className="text-white">
            Frequently Asked <span className="bg-gradient-to-r from-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent">Questions</span>
          </span>
          <div className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-[#2563eb] to-transparent"></div>
        </h2>
      </RevealAnimation>

      <div className="relative w-full mt-20">
        <div className="max-w-4xl mx-auto space-y-4">
          {faqData.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openItems.has(faq.id)}
              onToggle={() => toggleItem(faq.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;