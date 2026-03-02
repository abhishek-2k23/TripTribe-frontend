import CTA from "@/components/hero/CTA";
import Features from "@/components/hero/Features";
import Footer from "@/components/hero/Footer";
import Main from "@/components/hero/Main";
import Navbar from "@/components/hero/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Main />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;