import { Link } from 'react-router-dom';
import { Heart, Scissors, Sparkles, Award } from 'lucide-react';
import { IMAGES } from '../store';

export default function About() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.atelier} alt="Fashion Maven Atelier" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 text-center px-4">
          <p className="text-yellow font-sans text-xs sm:text-sm tracking-[0.3em] uppercase mb-4">Our Story</p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl text-white">About Fashion Maven</h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
            <div>
              <p className="text-yellow font-sans text-xs sm:text-sm tracking-[0.2em] uppercase mb-3">Our Story</p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-black mb-6">
                Crafting Dreams, <em>One Stitch at a Time</em>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Fashion Maven was born from a deep passion for fashion and a desire to make every woman
                  feel extraordinary. As a Nigerian fashion design company, we specialize in creating
                  bespoke wedding dresses and premium ready-to-wear fashion that celebrates the beauty,
                  strength, and elegance of the modern African woman.
                </p>
                <p>
                  With over 200 brides who have trusted us to create their dream wedding dresses, we
                  understand that a wedding gown is more than just a dress — it's a symbol of love,
                  a reflection of personality, and a memory that lasts a lifetime.
                </p>
                <p>
                  Every piece that leaves our atelier is crafted with meticulous attention to detail,
                  premium fabrics, and the kind of care that comes from genuinely loving what we do.
                  From the first sketch to the final stitch, we pour our heart into making you feel
                  like the most beautiful version of yourself.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img src={IMAGES.atelier} alt="Fashion Maven Workshop"
                  className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-yellow text-black p-4 sm:p-6 rounded-xl shadow-lg">
                <p className="font-serif text-2xl sm:text-3xl font-bold">200+</p>
                <p className="text-xs sm:text-sm">Brides & Counting</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-yellow font-sans text-xs sm:text-sm tracking-[0.2em] uppercase mb-3">What We Stand For</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-black">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon: Heart, title: 'Passion', desc: 'Every design is created with love and a genuine desire to make you feel beautiful.' },
              { icon: Scissors, title: 'Craftsmanship', desc: 'We believe in the art of sewing — every stitch, every seam is executed with precision.' },
              { icon: Sparkles, title: 'Excellence', desc: 'We use only premium fabrics and materials, ensuring your dress looks and feels luxurious.' },
              { icon: Award, title: 'Trust', desc: 'Over 200 brides have trusted us. We honour that trust with every creation.' },
            ].map((value, idx) => (
              <div key={idx} className="bg-white p-6 sm:p-8 rounded-xl text-center card-hover">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-yellow/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon size={20} className="text-yellow sm:hidden" />
                  <value.icon size={24} className="text-yellow hidden sm:block" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-yellow font-sans text-xs sm:text-sm tracking-[0.2em] uppercase mb-3">The Journey</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-black">Our Bridal Process</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { step: '01', title: 'Consultation', desc: 'We meet to discuss your vision, style preferences, and wedding details.' },
              { step: '02', title: 'Design', desc: 'We create sketches and select fabrics that bring your dream dress to life.' },
              { step: '03', title: 'Fittings', desc: 'Multiple fittings ensure the perfect fit and allow for adjustments.' },
              { step: '04', title: 'The Big Day', desc: 'You walk down the aisle in a dress made exclusively for you.' },
            ].map((step, idx) => (
              <div key={idx} className="text-center relative">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-4 font-serif text-lg sm:text-xl font-bold">
                  {step.step}
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-mid-gray" />
                )}
                <h3 className="font-serif text-lg sm:text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-6">
            Let's Create Something <em className="text-yellow">Beautiful</em>
          </h2>
          <p className="text-white/70 text-sm sm:text-lg mb-6 sm:mb-8">
            Whether you need a bespoke bridal gown or a stunning ready-to-wear piece,
            we'd love to bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/bridal"
              className="btn-yellow px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-sans text-xs sm:text-sm tracking-wider uppercase">
              Book a Consultation
            </Link>
            <Link to="/shop"
              className="btn-outline-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-sans text-xs sm:text-sm tracking-wider uppercase">
              Shop Collection
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
