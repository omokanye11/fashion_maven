import { useState } from 'react';
import { Phone, Mail, MapPin, Send, Instagram, Facebook, MessageCircle, Check } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      {/* Hero */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold font-sans text-[10px] sm:text-[11px] tracking-[0.2em] uppercase mb-3">Get in Touch</p>
          <h1 className="font-serif text-section-title text-ink mb-4">Contact Us</h1>
          <p className="text-ash text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            We'd love to hear from you. Whether you have a question, want to book a consultation,
            or just want to say hello — reach out!
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl mb-6 text-ink">Send a Message</h2>
              {submitted ? (
                <div className="bg-cream border border-gold/20 rounded-lg p-8 text-center">
                  <Check size={32} strokeWidth={1.5} className="text-gold mx-auto mb-4" />
                  <h3 className="font-serif text-2xl mb-2 text-ink">Message Sent!</h3>
                  <p className="text-ash text-sm">We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-medium mb-1.5 tracking-wide uppercase text-ink">Name *</label>
                      <input type="text" required value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border border-pearl rounded-lg px-4 py-3 text-sm bg-white" />
                    </div>
                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-medium mb-1.5 tracking-wide uppercase text-ink">Email *</label>
                      <input type="email" required value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border border-pearl rounded-lg px-4 py-3 text-sm bg-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-medium mb-1.5 tracking-wide uppercase text-ink">Phone</label>
                      <input type="tel" value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full border border-pearl rounded-lg px-4 py-3 text-sm bg-white" />
                    </div>
                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-medium mb-1.5 tracking-wide uppercase text-ink">Subject</label>
                      <select value={formData.subject}
                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full border border-pearl rounded-lg px-4 py-3 text-sm bg-white">
                        <option value="">Select a subject</option>
                        <option value="bridal">Bridal Enquiry</option>
                        <option value="order">Order Question</option>
                        <option value="custom">Custom Design</option>
                        <option value="general">General Enquiry</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-medium mb-1.5 tracking-wide uppercase text-ink">Message *</label>
                    <textarea rows={5} required value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us how we can help..."
                      className="w-full border border-pearl rounded-lg px-4 py-3 text-sm bg-white resize-none" />
                  </div>
                  <button type="submit"
                    className="btn-black px-6 sm:px-8 py-3 rounded-lg font-sans text-[10px] sm:text-[11px] tracking-[0.15em] uppercase flex items-center gap-2">
                    <Send size={14} strokeWidth={1.5} /> Send Message
                  </button>
                  <p className="text-[10px] text-ash">
                    Note: This is a demo form. In production, messages will be sent to the brand owner.
                  </p>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl mb-6 text-ink">Reach Us Directly</h2>
                <div className="space-y-4 sm:space-y-5">
                  <a href="https://wa.me/" target="_blank" rel="noopener noreferrer"
                    className="flex items-start gap-3 sm:gap-4 p-4 bg-cream rounded-lg hover:bg-silk transition-colors group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                      <MessageCircle size={16} strokeWidth={1.5} className="text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-ink group-hover:text-gold transition-colors text-sm sm:text-base">WhatsApp</h3>
                      <p className="text-[10px] sm:text-[11px] text-ash">Chat with us directly on WhatsApp for quick responses</p>
                      <p className="text-[9px] text-ash/60 mt-1">WhatsApp number to be updated by brand owner</p>
                    </div>
                  </a>

                  <a href="mailto:hello@fashionmaven.com"
                    className="flex items-start gap-3 sm:gap-4 p-4 bg-cream rounded-lg hover:bg-silk transition-colors group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Mail size={16} strokeWidth={1.5} className="text-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-ink group-hover:text-gold transition-colors text-sm sm:text-base">Email</h3>
                      <p className="text-[10px] sm:text-[11px] text-ash">hello@fashionmaven.com</p>
                      <p className="text-[9px] text-ash/60 mt-1">Email to be updated by brand owner</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-3 sm:gap-4 p-4 bg-cream rounded-lg">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-pearl flex items-center justify-center flex-shrink-0">
                      <MapPin size={16} strokeWidth={1.5} className="text-ink" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-ink text-sm sm:text-base">Studio Address</h3>
                      <p className="text-[10px] sm:text-[11px] text-ash">Lagos, Nigeria</p>
                      <p className="text-[9px] text-ash/60 mt-1">Full address to be updated by brand owner</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-serif text-lg sm:text-xl mb-4 text-ink">Follow Us</h3>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-pearl flex items-center justify-center hover:border-gold hover:text-gold transition-all">
                    <Instagram size={16} strokeWidth={1.5} />
                  </a>
                  <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-pearl flex items-center justify-center hover:border-gold hover:text-gold transition-all">
                    <Facebook size={16} strokeWidth={1.5} />
                  </a>
                </div>
                <p className="text-[10px] text-ash mt-3">Social media handles to be updated by brand owner</p>
              </div>

              {/* Business Hours */}
              <div className="bg-cream p-4 sm:p-6 rounded-lg">
                <h3 className="font-serif text-lg sm:text-xl mb-3 text-ink">Studio Hours</h3>
                <div className="space-y-2 text-[10px] sm:text-xs text-graphite">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>By Appointment</span>
                  </div>
                </div>
                <p className="text-[10px] text-ash mt-3">Hours to be confirmed by brand owner</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
