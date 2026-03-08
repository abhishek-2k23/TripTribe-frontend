import { Button } from "@/components/ui/button";

export default function UnderDevelopment() {
  return (
    <div className="flex min-h-screen items-center justify-center text-white p-0">
      <div className="text-center space-y-8">

        {/* Big Outlined Heading */}
        <h1
          className="
          text-7xl md:text-8xl font-extrabold 
          text-transparent 
          bg-clip-text 
          bg-gradient-to-r 
          from-primary via-white to-primary
          tracking-tight
        "
          style={{
            WebkitTextStroke: "2px #f59e0b",
          }}
        >
          UNDER DEVELOPMENT
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-navy max-w-xl mx-auto">
          We're building something amazing. This feature is currently under
          development and will be available soon.
        </p>

        {/* Divider */}
        <div className="flex justify-center">
          <div className="h-1 w-32 bg-linear-to-r from-primary to-primary rounded-full"></div>
        </div>

        {/* Optional Button */}
        <Button
          variant="outline"
          className="
          border-primary 
          text-primary 
          hover:bg-primary 
          hover:text-slate-950
          text-lg px-6 py-5
        "
        >
          Go Back
        </Button>

      </div>
    </div>
  );
}