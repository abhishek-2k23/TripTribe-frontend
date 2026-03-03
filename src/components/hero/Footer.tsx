// import { Compass } from "lucide-react";

// const columns = [
//   { title: "Product", links: ["Features", "Integrations", "Pricing", "Changelog"] },
//   { title: "Company", links: ["About Us", "Careers", "Blog", "Press"] },
//   { title: "Support", links: ["Help Center", "Guides", "Contact", "Status"] },
//   { title: "Legal", links: ["Privacy", "Terms", "Cookies", "Licenses"] },
// ];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card pb-10">
      <div className="container mx-auto px-6">
        {/* <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <Compass className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-foreground">Voyager</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Making group travel planning effortless and fun for everyone, everywhere.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-semibold text-foreground">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div> */}

        <div className=" border-t border-border pt-8 text-center text-xs text-muted-foreground">
          © 2026 TripTribe. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
