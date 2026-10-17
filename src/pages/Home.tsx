import { Link } from 'react-router-dom';
import { ArrowRight, Star, Heart, Award } from 'lucide-react';
import { IMAGES, getProducts, formatPrice, Category, getCategoryLabel } from '../store';
import { ProductCard } from '../components/Layout';

export default function Home() {
  const products = getProducts();
  const featuredProducts = products.filter(p => p.featured);
  const bridalProducts = products.filter(p => p.category === 'bridal-gowns');

  const collections = [
    { title: 'Bridal Gowns', category: 'bridal-gowns' as Category, image: IMAGES.hero, desc: 'Custom couture wedding dresses' },
    { title: 'Reception Dresses', category: 'reception-dresses' as Category, image: IMAGES.collection, desc: 'Elegant celebration wear' },
    { title: 'Traditional Engagement', category: 'traditional-engagement' as Category, image: IMAGES.traditional, desc: 'Cultural bridal fashion' },
    { title: 'Ready-to-Wear', category: 'ready-to-wear' as Category, image: IMAGES.atelier, desc: 'Everyday luxury pieces' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.hero} alt="Fashion Maven Bridal Couture"
            className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <p className="text-yellow font-sans text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 animate-fade-in-up">
              Premium Nigerian Bridal Couture
            </p>
            <h1 className="font-serif text-responsive-hero text-white leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Your Dream Dress, <br /><em className="text-yellow">Beautifully Made.</em>
            </h1>
            <p className="text-white/80 text-base sm:text-lg md:text-xl font-sans font-light leading-relaxed mb-8 max-w-lg animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Bespoke bridal couture and ready-to-wear fashion, crafted with love for the modern Nigerian woman.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <Link to="/bridal"
                className="btn-yellow px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-sans text-xs sm:text-sm tracking-wider uppercase text-center">
                Explore Bridal Couture
              </Link>
              <Link to="/shop"
                className="btn-outline-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-sans text-xs sm:text-sm tracking-wider uppercase text-center">
                Shop Ready-to-Wear
              </Link>
            </div>
          </div>
        </div>
        {/* Achievement Badge */}
        <div className="absolute bottom-6 sm:bottom-10 right-4 sm:right-10 flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-md rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-white/20">
          <Award className="text-yellow" size={20} />
          <div>
            <p className="text-white font-serif text-base sm:text-lg font-semibold">200+ Brides</p>
            <p className="text-white/60 text-[10px] sm:text-xs">Trusted & Beautiful</p>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-black py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-4 sm:gap-8 md:gap-16">
          <div className="flex items-center gap-2 text-white/80">
            <Star size={14} className="text-yellow" />
            <span className="text-xs sm:text-sm font-sans">Trusted by 200+ Brides</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <Heart size={14} className="text-yellow" />
            <span className="text-xs sm:text-sm font-sans">Handcrafted with Love</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <Award size={14} className="text-yellow" />
            <span className="text-xs sm:text-sm font-sans">Premium Quality</span>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-16 sm:py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-yellow font-sans text-xs sm:text-sm tracking-[0.2em] uppercase mb-3">Our Collections</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-black">Explore Our World</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {collections.map((col, idx) => (
              <Link key={idx} to={col.category === 'ready-to-wear' ? '/shop' : '/bridal'}
                className="group relative overflow-hidden rounded-xl aspect-[3/4] card-hover">
                <img src={col.image} alt={col.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <h3 className="font-serif text-xl sm:text-2xl text-white mb-1">{col.title}</h3>
                  <p className="text-white/70 text-xs sm:text-sm">{col.desc}</p>
                  <span className="inline-flex items-center gap-1 text-yellow text-xs sm:text-sm mt-3 group-hover:gap-2 transition-all">
                    Explore <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 sm:py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-yellow font-sans text-xs sm:text-sm tracking-[0.2em] uppercase mb-3">Curated For You</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-black">Featured Designs</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-10 sm:mt-12">
            <Link to="/shop"
              className="inline-flex items-center gap-2 btn-outline-black px-6 sm:px-8 py-3 rounded-lg font-sans text-xs sm:text-sm tracking-wider uppercase">
              View All Designs <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 200+ Brides Achievement */}
      <section className="py-16 sm:py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={IMAGES.bride1} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-yellow/20 mb-4 sm:mb-6">
            <Award size={28} className="text-yellow sm:hidden" />
            <Award size={36} className="text-yellow hidden sm:block" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white mb-4">200+ Brides</h2>
          <p className="text-white/70 text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto mb-6 sm:mb-8">
            Over 200 brides have trusted Fashion Maven to create their dream wedding dress.
            Each gown tells a unique love story, crafted with precision and passion.
          </p>
          <Link to="/our-brides"
            className="inline-flex items-center gap-2 text-yellow font-sans text-xs sm:text-sm tracking-wider uppercase hover:gap-3 transition-all">
            See Our Brides <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-yellow font-sans text-xs sm:text-sm tracking-[0.2em] uppercase mb-3">Love Notes</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-black">What Our Brides Say</h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-3 italic">
              (Sample testimonials — real testimonials from Fashion Maven brides will be added here)
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { name: 'Sample Bride 1', text: 'Fashion Maven made my dream dress come to life. The attention to detail was incredible.', year: '2024' },
              { name: 'Sample Bride 2', text: 'I felt like a queen on my wedding day. The craftsmanship was beyond my expectations.', year: '2024' },
              { name: 'Sample Bride 3', text: 'From the first consultation to the final fitting, the experience was pure luxury.', year: '2023' },
            ].map((t, idx) => (
              <div key={idx} className="bg-light-gray p-6 sm:p-8 rounded-xl border border-mid-gray card-hover">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-yellow text-yellow" />)}
                </div>
                <p className="text-gray-600 italic mb-4 leading-relaxed text-sm sm:text-base">"{t.text}"</p>
                <div className="border-t border-mid-gray pt-4">
                  <p className="font-serif text-base sm:text-lg font-semibold">{t.name}</p>
                  <p className="text-xs sm:text-sm text-gray-400">Bride, {t.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Gallery Section */}
      <section className="py-16 sm:py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-yellow font-sans text-xs sm:text-sm tracking-[0.2em] uppercase mb-3">@fashionmaven</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-black">Follow Our Journey</h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-3">Instagram handle to be updated by the brand owner</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[IMAGES.hero, IMAGES.collection, IMAGES.bride1, IMAGES.traditional, IMAGES.atelier, IMAGES.hero, IMAGES.collection, IMAGES.bride1].map((img, idx) => (
              <div key={idx} className="aspect-square rounded-lg overflow-hidden group cursor-pointer">
                <img src={img} alt={`Gallery ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-black mb-6">
            Ready to Find <em className="text-yellow">Your Dress?</em>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
            Whether you're looking for a bespoke bridal gown or a stunning ready-to-wear piece,
            Fashion Maven is here to make you feel extraordinary.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/bridal"
              className="btn-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-sans text-xs sm:text-sm tracking-wider uppercase">
              Book Bridal Consultation
            </Link>
            <Link to="/contact"
              className="btn-outline-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-sans text-xs sm:text-sm tracking-wider uppercase">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
