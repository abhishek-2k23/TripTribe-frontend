import { Plane, Building2, Globe, MapPin } from "lucide-react";

const partners = [
  { name: "SkyWays", icon: Plane },
  { name: "NomadStay", icon: Building2 },
  { name: "Wanderlust", icon: Globe },
  { name: "GlobalPath", icon: MapPin },
];

const TrustedBy = () => {
  return (
    <section className="border-y border-border bg-card py-10">
      <div className="container mx-auto px-6">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Trusted by world-class travelers & partners
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10">
          {partners.map((p) => (
            <div key={p.name} className="flex items-center gap-2 text-muted-foreground/60">
              <p.icon className="h-5 w-5" />
              <span className="text-sm font-semibold tracking-wide">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
