import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Hardware from "@/components/Hardware";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Pricing />
      <Hardware />
      <Waitlist />
      <Footer />
    </main>
  );
}