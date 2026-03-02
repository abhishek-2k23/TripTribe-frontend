import { Star } from "lucide-react";
import avatarImg from "../../assets/testimonial-avatar.png"

const Testimonial = () => {
  return (
    <section className="bg-card py-20 lg:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 flex justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-primary text-primary" />
            ))}
          </div>
          <blockquote className="mb-8 font-serif text-2xl leading-relaxed text-foreground sm:text-3xl">
            "Voyager completely changed how we travel. We planned a 2-week Japan trip with 6 people and there wasn't a single spreadsheet involved. Best travel app ever!"
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <img
              src={avatarImg}
              alt="Daniel Jenkins"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="text-left">
              <p className="font-semibold text-foreground">Daniel Jenkins</p>
              <p className="text-sm text-muted-foreground">Adventure Blogger & Group Traveler</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
