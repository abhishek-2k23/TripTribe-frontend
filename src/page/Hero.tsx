import CTA from "@/components/hero/CTA";
import Features from "@/components/hero/Features";
import Footer from "@/components/hero/Footer";
import Main from "@/components/hero/Main";
import Navbar from "@/components/hero/Navbar";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const Index = () => {
   const { isSignedIn, isLoaded } = useUser();

  // if (!isLoaded) return null;

  // if (isSignedIn) {
  //   return <Navigate to="/home" replace />;
  // }
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