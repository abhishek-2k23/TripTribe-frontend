import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* ================= NAVBAR ================= */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <h1 className="text-xl font-bold text-blue-700">
          TripCollab
        </h1>

        <Link to="/sign-in">
          <Button className="bg-blue-700 hover:bg-blue-800">
            Login
          </Button>
        </Link>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section className="flex-1 flex items-center justify-center bg-linear-to-br from-blue-700 via-blue-600 to-indigo-800 text-white px-6">

        <div className="max-w-4xl text-center flex flex-col gap-6">

          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Plan Trips Together,
            <br />
            Without the Chaos.
          </h2>

          <p className="text-lg text-blue-100">
            Collaborate with friends, organize itineraries,
            track expenses, and manage everything in one place.
          </p>

          <div className="flex justify-center gap-4">
            <Link to="/sign-up">
              <Button className="bg-white text-blue-700 hover:bg-gray-100">
                Get Started
              </Button>
            </Link>

            <Link to="/signin">
              <Button variant="outline" className="border-white text-blue-700  hover:bg-white hover:text-blue-700 ">
                Login
              </Button>
            </Link>
          </div>

        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="py-16 px-8 bg-gray-50">

        <div className="max-w-6xl mx-auto flex flex-col gap-12">

          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-800">
              Everything You Need For Group Travel
            </h3>
            <p className="text-gray-500 mt-2">
              Built for collaboration, clarity, and simplicity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <Card className="rounded-2xl shadow-md">
              <CardContent className="p-6 flex flex-col gap-3">
                <h4 className="text-xl font-semibold text-blue-700">
                  Collaborative Itinerary
                </h4>
                <p className="text-gray-600 text-sm">
                  Build day-wise plans, add activities, and reorder
                  everything with drag & drop.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-md">
              <CardContent className="p-6 flex flex-col gap-3">
                <h4 className="text-xl font-semibold text-blue-700">
                  Smart Budget Tracking
                </h4>
                <p className="text-gray-600 text-sm">
                  Track expenses, split costs, and see summaries
                  in real time.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-md">
              <CardContent className="p-6 flex flex-col gap-3">
                <h4 className="text-xl font-semibold text-blue-700">
                  Role-Based Access
                </h4>
                <p className="text-gray-600 text-sm">
                  Owners, Editors, and Viewers — full control
                  over who can do what.
                </p>
              </CardContent>
            </Card>

          </div>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-6 text-center text-gray-500 text-sm bg-white border-t">
        © {new Date().getFullYear()} TripCollab. All rights reserved.
      </footer>

    </div>
  );
}