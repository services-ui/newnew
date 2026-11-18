import { TestimonialCarousel } from "@/components/ui/testimonial";
import RevealText from "@/components/ui/RevealText";

const TESTIMONIAL_DATA = [
  {
    id: 1,
    name: "Vishal Agarwal",
    role: "Regional Collection Manager, SK Finance Limited, Jaipur",
    description: "Meeting Nitesh and his team in 2013 changed the way I looked at money and my future. I started with a SIP of just ₹7,500/month, and today, despite life's ups and downs, I've built a ₹62.5 lakh portfolio with complete confidence. They have been more than financial consultant, they have been family, guiding me at every step of my journey."
  },
  {
    id: 2,
    name: "Samresh Kumar",
    role: "ELV Lead, Sterling & Wilson Data Centre Pvt. Ltd.",
    description: "Thanks to Nitesh Luthra and the entire Team Fintness for being a constant source of guidance and support in my financial journey. Their advice and disciplined planning gave me the confidence to achieve financial stability and move closer to true financial freedom. I’m truly grateful for their unwavering support."
  },
  {
    id: 3,
    name: "S Sathish",
    role: "Insurance Client",
    description: "A big thank you to Team Fintness for your excellent support throughout my insurance journey. Your professionalism, product knowledge, and prompt assistance made the entire process smooth and hassle free. Highly recommended for anyone looking for reliable insurance guidance!"
  }
];

export default function Testimonials() {
  return (
    <section id="events" className="sec relative overflow-hidden bg-paper" aria-labelledby="testimonials-title">
      <div className="wrap">
        <h2 id="testimonials-title" className="max-w-[44rem]">
          <span className="eyebrow">Testimonials</span>
          <RevealText as="span" className="t-h1 mt-5 block" parts={["Voices of Success"]} />
        </h2>

        <TestimonialCarousel testimonials={TESTIMONIAL_DATA} className="mt-12 lg:mt-16" />
      </div>
    </section>
  );
}
