import Aboutus from "@/components/Aboutus";
import CrispApp from "@/components/Crisp";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import TopNotification from "@/components/TopNotification";
import Features from "@/components/Features";
import SlidingBanner from "@/components/SlidingBanner";

export default function Home() {
  return (
    <>
      <CrispApp />
      <TopNotification />
      <Header />
      <Hero />
      <Aboutus />
      <Products />
      <Features />
      <Faq />
      <Footer />
      
     
    </>
  );
}

export const dynamic = "force-dynamic";