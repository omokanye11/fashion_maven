import { useState } from 'react';
import { Phone, Mail, MapPin, Send, Instagram, Facebook, MessageCircle, Check } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to a backend
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-ivory py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-champagne-gold font-sans text-sm tracking-[0.2em] uppercase mb-3">Get in Touch</p>
          <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-4">Contact Us</h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            We'd love to hear from you. Whether you have a question, want to book a consultation,
            or just want to say hello — reach out!
          </p>
        </div>
      </section>

      <section className="py-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="font-serif text-3xl mb-6">Send a Message</h2>
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <Check size={40} className="text-green-600 mx-auto mb-4" />
                  <h3 className="font-serif text-2xl mb-2">Message Sent!</h3>
                  <p className="text-gray-500">We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name *</label>
                      <input type="text" required value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border border-nude rounded-lg px-4 py-3 focus:outline-none focus:border-champagne-gold bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email *</label>
                      <input type="email" required value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border border-nude rounded-lg px-4 py-3 focus:outline-none focus:border-champagne-gold bg-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      <input type="tel" value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full border border-nude rounded-lg px-4 py-3 focus:outline-none focus:border-champagne-gold bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Subject</label>
                      <select value={formData.subject}
                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full border border-nude rounded-lg px-4 py-3 focus:outline-none focus:border-champagne-gold bg-white">
                        <option value="">Select a subject</option>
                        <option value="bridal">Bridal Enquiry</option>
                        <option value="order">Order Question</option>
                        <option value="custom">Custom Design</option>
                        <option value="general">General Enquiry</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Message *</label>
                    <textarea rows={5} required value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us how we can help..."
                      className="w-full border border-nude rounded-lg px-4 py-3 focus:outline-none focus:border-champagne-gold bg-white resize-none" />
                  </div>
                  <button type="submit"
                    className="btn-gold text-white px-8 py-3 rounded-lg font-sans text-sm tracking-wider uppercase flex items-center gap-2">
                    <Send size={16} /> Send Message
                  </button>
                  <p className="text-xs text-gray-400">
                    Note: This is a demo form. In production, messages will be sent to the brand owner.
                  </p>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-3xl mb-6">Reach Us Directly</h2>
                <div className="space-y-6">
                  <a href="https://wa.me/" target="_blank" rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 bg-white rounded-xl border border-nude-light hover:border-champagne-gold transition-colors group">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <MessageCircle size={20} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-charcoal group-hover:text-champagne-gold transition-colors">WhatsApp</h3>
                      <p className="text-sm text-gray-500">Chat with us directly on WhatsApp for quick responses</p>
                      <p className="text-xs text-gray-400 mt-1">WhatsApp number to be updated by brand owner</p>
                    </div>
                  </a>

                  <a href="mailto:hello@fashionmaven.com"
                    className="flex items-start gap-4 p-4 bg-white rounded-xl border border-nude-light hover:border-champagne-gold transition-colors group">
                    <div className="w-12 h-12 rounded-full bg-champagne-gold/10 flex items-center justify-center flex-shrink-0">
                      <Mail size={20} className="text-champagne-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-charcoal group-hover:text-champagne-gold transition-colors">Email</h3>
                      <p className="text-sm text-gray-500">hello@fashionmaven.com</p>
                      <p className="text-xs text-gray-400 mt-1">Email to be updated by brand owner</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-nude-light">
                    <div className="w-12 h-12 rounded-full bg-nude-light flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} className="text-charcoal" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-charcoal">Studio Address</h3>
                      <p className="text-sm text-gray-500">Lagos, Nigeria</p>
                      <p className="text-xs text-gray-400 mt-1">Full address to be updated by brand owner</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-serif text-xl mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  <a href="#" className="w-12 h-12 rounded-full border border-nude flex items-center justify-center hover:border-champagne-gold hover:text-champagne-gold transition-colors">
                    <Instagram size={20} />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full border border-nude flex items-center justify-center hover:border-champagne-gold hover:text-champagne-gold transition-colors">
                    <Facebook size={20} />
                  </a>
                </div>
                <p className="text-xs text-gray-400 mt-3">Social media handles to be updated by brand owner</p>
              </div>

              {/* Business Hours */}
              <div className="bg-nude-light p-6 rounded-xl">
                <h3 className="font-serif text-xl mb-3">Studio Hours</h3>
                <div className="space-y-2 text-sm text-gray-600">
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
                <p className="text-xs text-gray-400 mt-3">Hours to be confirmed by brand owner</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
