import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, Heart, Star } from 'lucide-react';
import { IMAGES, getBrides } from '../store';
import { PlaceholderImage } from '../components/Layout';

export default function OurBrides() {
  const brides = getBrides();
  const [selectedBride, setSelectedBride] = useState<string | null>(null);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.bride1} alt="Our Brides" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center px-4">
          <p className="text-champagne-gold font-sans text-sm tracking-[0.3em] uppercase mb-4">Our Brides</p>
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-4">Love Stories</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Celebrating the beautiful brides who trusted Fashion Maven with their dream dress.
          </p>
        </div>
      </section>

      {/* Achievement Section */}
      <section className="py-16 bg-ivory">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-champagne-gold/10 mb-6">
            <Award size={48} className="text-champagne-gold" />
          </div>
          <h2 className="font-serif text-5xl md:text-6xl text-charcoal mb-4">200+ Brides</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Over 200 brides have walked down the aisle in Fashion Maven creations.
            Each dress is a testament to our commitment to craftsmanship, elegance, and making
            every woman feel like the most beautiful version of herself on her special day.
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            <div className="text-center">
              <p className="font-serif text-4xl text-champagne-gold">200+</p>
              <p className="text-sm text-gray-500 mt-1">Happy Brides</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-4xl text-champagne-gold">5+</p>
              <p className="text-sm text-gray-500 mt-1">Years of Excellence</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-4xl text-champagne-gold">100%</p>
              <p className="text-sm text-gray-500 mt-1">Custom Made</p>
            </div>
          </div>
        </div>
      </section>

      {/* Brides Gallery */}
      <section className="py-16 bg-nude-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl text-charcoal">Our Beautiful Brides</h2>
            <p className="text-gray-500 mt-3 text-sm italic">
              Sample gallery — real bride photographs will be added by the brand owner
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {brides.map((bride) => (
              <div key={bride.id}
                className="bg-white rounded-xl overflow-hidden card-hover cursor-pointer"
                onClick={() => setSelectedBride(bride.id)}>
                <div className="aspect-[3/4] overflow-hidden">
                  {bride.image ? (
                    <img src={bride.image} alt={bride.brideName}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <PlaceholderImage label={`${bride.brideName}'s Photo`} className="w-full h-full" />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-lg font-semibold">{bride.brideName}</h3>
                  <p className="text-sm text-gray-500">{bride.dressStyle} • {bride.weddingDate}</p>
                  {bride.isPlaceholder && (
                    <span className="inline-block mt-2 text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded">
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
      <section className="py-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Heart size={32} className="text-champagne-gold mx-auto mb-4" />
            <h2 className="font-serif text-4xl text-charcoal">Words from Our Brides</h2>
            <p className="text-gray-500 mt-3 text-sm italic">
              Sample testimonials — real testimonials will be added by the brand owner
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { text: 'Fashion Maven understood my vision from the very first meeting. My dress was absolutely perfect — I felt like a princess.', name: 'Sample Bride', year: '2024' },
              { text: 'The craftsmanship and attention to detail was beyond anything I imagined. Every guest complimented my dress.', name: 'Sample Bride', year: '2024' },
              { text: 'From the traditional engagement to the white wedding, Fashion Maven created two stunning outfits for me.', name: 'Sample Bride', year: '2023' },
              { text: 'I cannot recommend Fashion Maven enough. The entire experience was luxurious and the final result was breathtaking.', name: 'Sample Bride', year: '2023' },
            ].map((t, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl border border-nude-light">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-champagne-gold text-champagne-gold" />)}
                </div>
                <p className="text-gray-600 italic leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-champagne-gold/20 flex items-center justify-center">
                    <Heart size={14} className="text-champagne-gold" />
                  </div>
                  <div>
                    <p className="font-serif font-semibold">{t.name}</p>
                    <p className="text-xs text-gray-400">Fashion Maven Bride, {t.year}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-charcoal">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl text-white mb-4">Want to Be Our Next Beautiful Bride?</h2>
          <p className="text-white/70 mb-8">
            Begin your journey with Fashion Maven today. Book a consultation and let's create your dream dress.
          </p>
          <Link to="/bridal" className="btn-gold text-white px-8 py-4 rounded-lg font-sans text-sm tracking-wider uppercase inline-block">
            Start Your Bridal Journey
          </Link>
        </div>
      </section>
    </div>
  );
}
