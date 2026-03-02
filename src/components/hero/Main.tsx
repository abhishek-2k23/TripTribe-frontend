import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import heroMockup from "@/assets/hero.png"
import { Link } from "react-router-dom"

const Main = () => {
  return (
    <section className="relative overflow-hidden bg-card py-20 lg:py-28">
      <div className="container mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="max-w-xl animate-fade-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-accent-foreground">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              New: AI Powered Itineraries
            </div>
            <h1 className="mb-6 text-4xl leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Plan Trips Together,{" "}
              <span className="italic text-primary">Explore Further.</span>
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              The all-in-one collaborative platform for modern travelers. Sync
              schedules, split costs, and discover the world with your favorite
              people.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to={"signin"}>
                <Button variant="hero" size="lg" className="gap-2">
                  Start Planning <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative animate-fade-up [animation-delay:200ms]">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-foreground/5">
              <img
                src={heroMockup}
                alt="Voyager app showing collaborative travel planning with map and itinerary"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Main
