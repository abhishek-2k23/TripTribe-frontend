import { CalendarDays, Wallet, CheckSquare } from "lucide-react";

const features = [
  {
    icon: CalendarDays,
    title: "Collaborative Itineraries",
    description:
      "Build and customize itineraries in real-time. Set durations and assign tasks to different members of your group effortlessly.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Wallet,
    title: "Budget Tracking",
    description:
      "Split expenses with ease and settle up quickly. Automatic currency conversion and receipt tracking for every member.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: CheckSquare,
    title: "Checklist & Tips",
    description:
      "Check up on travel to-do lists from visa updates, packing lists, and booking deadlines to avoid last-minute issues.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 lg:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl tracking-tight text-foreground sm:text-4xl">
            Everything you need for the perfect group trip
          </h2>
          <p className="text-lg text-muted-foreground">
            Stop juggling between spreadsheets, group chats, and map apps. Voyager brings your entire travel team into one workspace.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-lg hover:shadow-foreground/5"
            >
              <div className={`mb-5 inline-flex rounded-xl p-3 ${f.bg}`}>
                <f.icon className={`h-6 w-6 ${f.color}`} />
              </div>
              <h3 className="mb-3 font-serif text-xl text-foreground">{f.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
