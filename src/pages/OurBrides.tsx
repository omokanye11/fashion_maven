import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, Heart, Star } from 'lucide-react';
import { IMAGES, getBrides } from '../store';
import { PlaceholderImage } from '../components/Layout';

export default function OurBrides() {
  const brides = getBrides();
  const [selectedBride, setSelectedBride] = useState<string | null>(null);

  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.bride1} alt="Our Brides" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 text-center px-4">
          <p className="text-gold font-sans text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-4">Our Brides</p>
          <h1 className="font-serif text-display text-white mb-4">Love Stories</h1>
          <p className="text-white/60 text-xs sm:text-base max-w-xl mx-auto leading-relaxed">
            Celebrating the beautiful brides who trusted Fashion Maven with their dream dress.
          </p>
        </div>
      </section>

      {/* Achievement Section */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gold/10 mb-4 sm:mb-6">
            <Award size={28} strokeWidth={1.5} className="text-gold sm:hidden" />
            <Award size={36} strokeWidth={1.5} className="text-gold hidden sm:block" />
          </div>
          <h2 className="font-serif text-display text-ink mb-4">200+ Brides</h2>
          <p className="text-graphite text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
            Over 200 brides have walked down the aisle in Fashion Maven creations.
            Each dress is a testament to our commitment to craftsmanship, elegance, and making
            every woman feel like the most beautiful version of herself on her special day.
          </p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-8 sm:mt-10">
            <div className="text-center">
              <p className="font-serif text-3xl sm:text-4xl text-gold">200+</p>
              <p className="text-[10px] sm:text-[11px] text-ash mt-1 tracking-wide">Happy Brides</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-3xl sm:text-4xl text-gold">5+</p>
              <p className="text-[10px] sm:text-[11px] text-ash mt-1 tracking-wide">Years of Excellence</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-3xl sm:text-4xl text-gold">100%</p>
              <p className="text-[10px] sm:text-[11px] text-ash mt-1 tracking-wide">Custom Made</p>
            </div>
          </div>
        </div>
      </section>

      {/* Brides Gallery */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="font-serif text-section-title text-ink">Our Beautiful Brides</h2>
            <p className="text-ash mt-3 text-[10px] sm:text-xs italic">
              Sample gallery — real bride photographs will be added by the brand owner
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {brides.map((bride) => (
              <div key={bride.id}
                className="bg-white rounded-lg overflow-hidden card-hover cursor-pointer"
                onClick={() => setSelectedBride(bride.id)}>
                <div className="aspect-[3/4] overflow-hidden">
                  {bride.image ? (
                    <img src={bride.image} alt={bride.brideName}
                      className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" />
                  ) : (
                    <PlaceholderImage label={`${bride.brideName}'s Photo`} className="w-full h-full" />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-base sm:text-lg font-semibold text-ink">{bride.brideName}</h3>
                  <p className="text-[10px] sm:text-[11px] text-ash tracking-wide">{bride.dressStyle} • {bride.weddingDate}</p>
                  {bride.isPlaceholder && (
                    <span className="inline-block mt-2 text-[9px] bg-pearl text-ash px-2 py-1 rounded tracking-wider uppercase">
                      Placeholder
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <Heart size={24} strokeWidth={1.5} className="text-gold mx-auto mb-4" />
            <h2 className="font-serif text-section-title text-ink">Words from Our Brides</h2>
            <p className="text-ash mt-3 text-[10px] sm:text-xs italic">
              Sample testimonials — real testimonials will be added by the brand owner
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              { text: 'Fashion Maven understood my vision from the very first meeting. My dress was absolutely perfect — I felt like a princess.', name: 'Sample Bride', year: '2024' },
              { text: 'The craftsmanship and attention to detail was beyond anything I imagined. Every guest complimented my dress.', name: 'Sample Bride', year: '2024' },
              { text: 'From the traditional engagement to the white wedding, Fashion Maven created two stunning outfits for me.', name: 'Sample Bride', year: '2023' },
              { text: 'I cannot recommend Fashion Maven enough. The entire experience was luxurious and the final result was breathtaking.', name: 'Sample Bride', year: '2023' },
            ].map((t, idx) => (
              <div key={idx} className="bg-cream p-6 sm:p-8 rounded-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} strokeWidth={1.5} className="fill-gold text-gold" />)}
                </div>
                <p className="text-graphite italic leading-relaxed mb-4 text-xs sm:text-sm">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <Heart size={12} strokeWidth={1.5} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-serif text-sm sm:text-base font-semibold text-ink">{t.name}</p>
                    <p className="text-[10px] text-ash tracking-wide">Fashion Maven Bride, {t.year}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Premium Black */}
      <section className="section-padding bg-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-display text-white mb-4">Want to Be Our Next Beautiful Bride?</h2>
          <p className="text-white/60 mb-6 sm:mb-8 text-xs sm:text-sm leading-relaxed">
            Begin your journey with Fashion Maven today. Book a consultation and let's create your dream dress.
          </p>
          <Link to="/bridal" className="btn-gold px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-sans text-[10px] sm:text-[11px] tracking-[0.15em] uppercase inline-block">
            Start Your Bridal Journey
          </Link>
        </div>
      </section>
    </div>
  );
}
