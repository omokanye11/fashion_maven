import { useState } from 'react';
import { IMAGES, getProducts, Category, addEnquiry } from '../store';
import { ProductCard } from '../components/Layout';
import { Check, Calendar, Send } from 'lucide-react';

export default function BridalCouture() {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const products = getProducts();

  const categories: { value: Category | 'all'; label: string }[] = [
    { value: 'all', label: 'All Designs' },
    { value: 'bridal-gowns', label: 'Wedding Gowns' },
    { value: 'reception-dresses', label: 'Reception Dresses' },
    { value: 'traditional-engagement', label: 'Traditional Engagement' },
  ];

  const filteredProducts = activeCategory === 'all'
    ? products.filter(p => p.category !== 'ready-to-wear')
    : products.filter(p => p.category === activeCategory);

  const [formData, setFormData] = useState({
    brideName: '', email: '', phone: '', weddingDate: '',
    preferredStyle: '', budget: '', notes: '', appointmentDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEnquiry(formData);
    setFormSubmitted(true);
    setTimeout(() => { setFormSubmitted(false); setShowForm(false); }, 3000);
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] sm:h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.bride1} alt="Bridal Couture" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 text-center px-4">
          <p className="text-gold font-sans text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-4">Bridal Couture</p>
          <h1 className="font-serif text-display text-white mb-4">Your Perfect <em className="text-gold">Dress</em></h1>
          <p className="text-white/60 text-xs sm:text-base max-w-xl mx-auto leading-relaxed">
            Every bride deserves a dress as unique as her love story. Let us create yours.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-5 sm:py-7 bg-white border-b border-pearl sticky top-16 sm:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map(cat => (
            <button key={cat.value} onClick={() => setActiveCategory(cat.value)}
              className={`px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-[11px] font-sans tracking-[0.1em] uppercase transition-all ${
                activeCategory === cat.value
                  ? 'bg-ink text-white'
                  : 'bg-white border border-pearl text-ink hover:border-gold'
              }`}>
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-ash text-sm sm:text-base">No designs in this category yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Consultation CTA - Premium Black */}
      <section className="section-padding bg-black texture-overlay">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <Calendar size={28} strokeWidth={1.5} className="text-gold mx-auto mb-5" />
          <h2 className="font-serif text-display text-white mb-4">Book a Consultation</h2>
          <p className="text-white/60 text-sm sm:text-base mb-8 max-w-2xl mx-auto leading-relaxed">
            Begin your bridal journey with a private consultation. We'll discuss your vision,
            take measurements, and create a dress that's uniquely yours.
          </p>
          <button onClick={() => setShowForm(true)}
            className="btn-gold px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-sans text-[10px] sm:text-[11px] tracking-[0.15em] uppercase">
            Request Consultation
          </button>
        </div>
      </section>

      {/* Enquiry Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 sm:p-8">
              {formSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <Check size={28} strokeWidth={1.5} className="text-gold" />
                  </div>
                  <h3 className="font-serif text-2xl mb-2 text-ink">Enquiry Sent!</h3>
                  <p className="text-ash text-sm">We'll be in touch soon to discuss your dream dress.</p>
                </div>
              ) : (
                <>
                  <h3 className="font-serif text-2xl sm:text-3xl mb-2 text-ink">Bridal Enquiry</h3>
                  <p className="text-ash text-xs sm:text-sm mb-6">Tell us about your dream dress</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-medium mb-1.5 tracking-wide uppercase text-ink">Your Name *</label>
                      <input type="text" required value={formData.brideName}
                        onChange={e => setFormData({ ...formData, brideName: e.target.value })}
                        className="w-full border border-pearl rounded-lg px-4 py-2.5 text-sm bg-white" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] sm:text-[11px] font-medium mb-1.5 tracking-wide uppercase text-ink">Email *</label>
                        <input type="email" required value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          className="w-full border border-pearl rounded-lg px-4 py-2.5 text-sm bg-white" />
                      </div>
                      <div>
                        <label className="block text-[10px] sm:text-[11px] font-medium mb-1.5 tracking-wide uppercase text-ink">Phone *</label>
                        <input type="tel" required value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full border border-pearl rounded-lg px-4 py-2.5 text-sm bg-white" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] sm:text-[11px] font-medium mb-1.5 tracking-wide uppercase text-ink">Wedding Date</label>
                        <input type="date" value={formData.weddingDate}
                          onChange={e => setFormData({ ...formData, weddingDate: e.target.value })}
                          className="w-full border border-pearl rounded-lg px-4 py-2.5 text-sm bg-white" />
                      </div>
                      <div>
                        <label className="block text-[10px] sm:text-[11px] font-medium mb-1.5 tracking-wide uppercase text-ink">Appointment</label>
                        <input type="date" value={formData.appointmentDate}
                          onChange={e => setFormData({ ...formData, appointmentDate: e.target.value })}
                          className="w-full border border-pearl rounded-lg px-4 py-2.5 text-sm bg-white" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-medium mb-1.5 tracking-wide uppercase text-ink">Preferred Style</label>
                      <select value={formData.preferredStyle}
                        onChange={e => setFormData({ ...formData, preferredStyle: e.target.value })}
                        className="w-full border border-pearl rounded-lg px-4 py-2.5 text-sm bg-white">
                        <option value="">Select a style</option>
                        <option value="ball-gown">Ball Gown</option>
                        <option value="mermaid">Mermaid/Trumpet</option>
                        <option value="a-line">A-Line</option>
                        <option value="sheath">Sheath</option>
                        <option value="traditional">Traditional</option>
                        <option value="other">Other/Not Sure</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-medium mb-1.5 tracking-wide uppercase text-ink">Budget Range</label>
                      <select value={formData.budget}
                        onChange={e => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full border border-pearl rounded-lg px-4 py-2.5 text-sm bg-white">
                        <option value="">Select budget range</option>
                        <option value="300k-500k">₦300,000 - ₦500,000</option>
                        <option value="500k-800k">₦500,000 - ₦800,000</option>
                        <option value="800k-1m">₦800,000 - ₦1,000,000</option>
                        <option value="1m+">₦1,000,000+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-medium mb-1.5 tracking-wide uppercase text-ink">Additional Notes</label>
                      <textarea rows={3} value={formData.notes}
                        onChange={e => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Tell us about your vision..."
                        className="w-full border border-pearl rounded-lg px-4 py-2.5 text-sm bg-white resize-none" />
                    </div>
                    <button type="submit"
                      className="w-full btn-black py-3 rounded-lg font-sans text-[10px] sm:text-[11px] tracking-[0.15em] uppercase flex items-center justify-center gap-2">
                      <Send size={14} strokeWidth={1.5} /> Submit Enquiry
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
