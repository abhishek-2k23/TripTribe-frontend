import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-6">
        <div className="rounded-3xl bg-navy px-8 py-16 text-center sm:px-16">
          <h2 className="mb-4 text-3xl text-navy-foreground sm:text-4xl">
            Ready for your next adventure?
          </h2>
          <p className="mx-auto mb-10 max-w-md text-navy-foreground/70">
            Join 50,000+ travelers planning their dream trips on Voyager today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={"signin"}>
            
            <Button variant="hero" size="lg">
              Start Planning Now
            </Button>
            </Link>
            
            <Button variant="navyOutline" size="lg">
              Contact Sales
            </Button>
          </div>
          <p className="mt-6 text-xs text-navy-foreground/40">
            No credit card required · Free 14-day trial · Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
