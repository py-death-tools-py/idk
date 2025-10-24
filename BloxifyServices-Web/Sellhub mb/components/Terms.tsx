import React from "react";
import RevealAnimation from "./framer/RevealAnimation";

interface SectionProps {
  number: number;
  title: string;
  children: React.ReactNode;
}

const Terms: React.FC = () => {
  return (
    <div id="terms" className="relative min-h-screen pt-32 pb-16 flex flex-col items-center px-4" style={{ backgroundColor: '' }}>
      <div className="container relative mx-auto px-4 z-10 max-w-4xl">
        <div className="text-center mb-16">
          <RevealAnimation>
            <h1 className="relative text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              <span className="text-white">Terms of </span>
              <span className="bg-gradient-to-r from-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent">Service</span>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 w-24 bg-gradient-to-r from-transparent via-[#2563eb] to-transparent"></div>
            </h1>
          </RevealAnimation>
        </div>

        <div className="space-y-12">
          <Section number={1} title="Our Commitments">
            <p className="text-white/70 leading-relaxed mb-4">
              We are committed to delivering completion within 1-48 hours, subject to technical feasibility. We maintain strict adherence to legal data retention policies and guarantee compliance with platform standards, ensuring safe usage without risk of sanctions.
            </p>
          </Section>

          <Section number={2} title="Server Boosting">
            <p className="text-white/70 leading-relaxed mb-4">
              Our server boosting service provides 3-Month boosts lasting 81-91 days and 1-Month boosts lasting 25-30 days. Please disable anti-raid systems and bots before server boosts to ensure proper functionality.
            </p>
            <p className="text-white/70 leading-relaxed mb-4">
              Please note that no refunds will be provided for account removals due to server security bots. Boosts cannot be transferred between servers. If you remove any boosting accounts or if they are removed by your anti-raid bot, no replacements will be provided.
            </p>
          </Section>

          <Section number={3} title="Nitro Tokens">
            <p className="text-white/70 leading-relaxed mb-4">
              All tokens are pre-validated; however, we provide no warranty for post-purchase invalidation. CAPTCHA-free status cannot be guaranteed. These tokens are intended for server boosting only and not for personal account use.
            </p>
            <p className="text-white/70 leading-relaxed mb-4">
              Platform-initiated terminations are not eligible for compensation. 1-Month tokens are valid for 25-31 days from the date of purchase.
            </p>
          </Section>

          <Section number={4} title="Tools & Bots">
            <p className="text-white/70 leading-relaxed mb-4">
              Updates are provided when possible; however, we provide no guarantees for patched services. No compensation will be provided for security compromises. We reserve the right to terminate services; "lifetime" refers to active platform duration only.
            </p>
            <p className="text-white/70 leading-relaxed mb-4">
              License resale requires explicit authorization from our team. Unauthorized resale may result in service termination.
            </p>
          </Section>

          <Section number={5} title="Privacy Policy">
            <p className="text-white/70 leading-relaxed mb-4">
              Data collection is limited to essential platform requirements only. We respect your privacy and only collect information necessary for service delivery and platform functionality.
            </p>
          </Section>

          <Section number={6} title="Refund Policy">
            <p className="text-white/70 leading-relaxed mb-4">
              When purchasing, if the issue is on your end we cannot help - refunds and replacements are only provided if it is our fault. Our prices and Terms of Service are subject to change at any time without notice.
            </p>
            <p className="text-white/70 leading-relaxed mb-4">
              Unauthorized payment reversals result in permanent service restriction. If you have overpaid for any product, your overpaid funds will be kept as a donation, meaning we won't compensate you with any extra products or a refund.
            </p>
          </Section>

          <Section number={7} title="PayPal Payment Terms">
            <p className="text-white/70 leading-relaxed mb-4">
              If your payment was sent through Business and Services, you will not receive your product or a refund. We clearly state Friends and Family Only for all PayPal transactions. Please ensure you follow the correct payment method to avoid any issues.
            </p>
          </Section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-center text-sm text-white/50 leading-relaxed">
            <strong>Disclaimer:</strong> This website bloxify services is not affiliated with, authorized, maintained, sponsored or endorsed by Discord Inc. (discord.com) or any of its affiliates or subsidiaries.
          </p>
        </div>
      </div>
    </div>
  );
};

const Section: React.FC<SectionProps> = ({ number, title, children }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-semibold text-white/90 mb-6">
      {number}. {title}
    </h2>
    <div className="pl-8">
      {children}
    </div>
  </div>
);

export default Terms;