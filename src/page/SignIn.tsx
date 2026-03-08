import {Compass, Users, Globe, Map, Copyright } from "lucide-react";
import { useSignIn } from '@clerk/clerk-react';
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-adventure.jpg";

const SignIn = () => {
  const { isLoaded, signIn } = useSignIn();

  const signInWithGoogle = () => {
    if (!isLoaded) return;
    toast.loading('Signing in...');
    return signIn.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/home',
    });
  };
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left Panel - Login */}
      <div className="flex w-full flex-col justify-between bg-card px-8 py-8 lg:w-105 lg:px-12">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy text-white">
            <Compass className="w-6 h-6"/>
          </div>
          <span className="text-lg font-bold text-foreground">Trip Tribe</span>
        </div>

        {/* Login Content */}
        <div className="my-8 flex-1 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
          <p className="mt-2 text-muted-foreground">
            Join your tribe and start planning your next adventure.
          </p>

          <Button
            variant="outline"
            onClick={signInWithGoogle}
            className="mt-8 w-full gap-3 rounded-full border-border py-6 text-foreground hover:bg-muted"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </Button>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            By continuing, you agree to Trip Tribe's{" "}
            <a href="#" className="text-primary hover:underline">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <p><Copyright className="w-3 h-3"/>  </p>
          <p>Designed & Developed by abhishek kumar</p>
        </div>
      </div>

      {/* Right Panel - Dark with hero */}
      <div className="flex flex-1 flex-col bg-[#0B111E] p-6 lg:p-10">
        {/* Hero Image Card */}
        <div className="mx-auto w-full max-w-xl animate-fade-in">
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={heroImage}
              alt="Swiss Alps Expedition"
              className="h-56 w-full object-cover sm:h-72 lg:h-80"
            />
            <div className="absolute inset-0 bg-linear-to-t from-navy to-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="text-xs text-secondary-foreground/70">Next Adventure</p>
              <h3 className="text-lg font-bold text-secondary-foreground">Swiss Alps Expedition</h3>
            </div>
            <div className="absolute bottom-4 right-4 flex -space-x-2">
              <div className="h-8 w-8 rounded-full border-2 border-secondary bg-muted-foreground" />
              <div className="h-8 w-8 rounded-full border-2 border-secondary bg-muted" />
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-primary text-xs font-bold text-primary-foreground">
                +5
              </div>
            </div>
          </div>
        </div>

        {/* Feature Icons */}
        <div className="mt-8 flex justify-center gap-10" style={{ animationDelay: "0.2s" }}>
          {[
            { icon: Users, label: "Collaborate" },
            { icon: Globe, label: "Explore" },
            { icon: Map, label: "Plan" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-secondary-foreground/20 text-secondary-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-xs text-secondary-foreground/70">{label}</span>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <div className="mt-auto flex flex-col items-center pb-6 pt-10 text-center">
          <h2 className="text-2xl font-bold text-primary lg:text-3xl">
            Plan Together,
            <br />
            <span className="font-Roboto text-emerald">Travel Further.</span>
          </h2>
          <p className="mt-3 max-w-md text-sm text-primary-foreground/60">
            Your Collaborative Travel Hub for organizing unforgettable journeys with your favorite people.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-xs font-semibold text-primary">12K+ ACTIVE TRIBES</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;