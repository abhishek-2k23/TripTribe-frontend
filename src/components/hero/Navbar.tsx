import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [];
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
    const navigate = useNavigate();
  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Compass className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-foreground">TripTribe</span>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
            <Link to={"signin"}>
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Log in
          </Button>
            </Link>
            <Link to={"signin"}>
          <Button variant="hero" size="sm">
            Get Started
          </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
