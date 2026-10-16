import React, { createContext, useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Instagram, Facebook, Phone, Mail, MapPin, ChevronRight } from 'lucide-react';
import { CartItem, Product, formatPrice } from '../store';

// ============ CART CONTEXT ============
interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size: string, color: string) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, qty: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType>({
  items: [], addItem: () => {}, removeItem: () => {}, updateQuantity: () => {},
  clearCart: () => {}, total: 0, itemCount: 0,
});

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('fm_cart');
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('fm_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, size: string, color: string) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.size === size && i.color === color);
      if (existing) {
        return prev.map(i => i.product.id === product.id && i.size === size && i.color === color
          ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { product, size, color, quantity: 1 }];
    });
  };

  const removeItem = (productId: string, size: string, color: string) => {
    setItems(prev => prev.filter(i => !(i.product.id === productId && i.size === size && i.color === color)));
  };

  const updateQuantity = (productId: string, size: string, color: string, qty: number) => {
    if (qty <= 0) { removeItem(productId, size, color); return; }
    setItems(prev => prev.map(i => i.product.id === productId && i.size === size && i.color === color
      ? { ...i, quantity: qty } : i));
  };

  const clearCart = () => setItems([]);
  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

// ============ NAVBAR ============
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/bridal', label: 'Bridal Couture' },
    { to: '/shop', label: 'Shop' },
    { to: '/our-brides', label: 'Our Brides' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-ivory/95 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-serif text-2xl md:text-3xl font-semibold tracking-wide text-charcoal">
                FASHION <span className="text-gradient-gold">MAVEN</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`font-sans text-sm tracking-wider uppercase transition-colors duration-200 hover:text-champagne-gold ${
                    location.pathname === link.to ? 'text-champagne-gold border-b border-champagne-gold pb-1' : 'text-charcoal'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 hover:text-champagne-gold transition-colors"
              >
                <ShoppingBag size={22} />
                {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-ivory border-t border-nude animate-fade-in">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block font-sans text-sm tracking-wider uppercase py-2 ${
                    location.pathname === link.to ? 'text-champagne-gold' : 'text-charcoal'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/admin" className="block font-sans text-xs tracking-wider uppercase py-2 text-gray-400">
                Admin
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Cart Drawer */}
      {cartOpen && <CartDrawer onClose={() => setCartOpen(false)} />}
    </>
  );
}

// ============ CART DRAWER ============
function CartDrawer({ onClose }: { onClose: () => void }) {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const handleWhatsAppOrder = () => {
    const itemsList = items.map(i =>
      `• ${i.product.name} (${i.size}, ${i.color}) x${i.quantity} - ${formatPrice(i.product.price * i.quantity)}`
    ).join('\n');
    const message = `*Fashion Maven Order*\n\n*Customer:* ${customerName}\n*Email:* ${customerEmail}\n*Phone:* ${customerPhone}\n\n*Items:*\n${itemsList}\n\n*Total:* ${formatPrice(total)}`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-ivory shadow-2xl overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl">
              {checkoutStep === 'cart' ? 'Shopping Bag' : 'Checkout'}
            </h2>
            <button onClick={onClose} className="p-2 hover:text-champagne-gold">
              <X size={24} />
            </button>
          </div>

          {checkoutStep === 'cart' ? (
            <>
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag size={48} className="mx-auto text-nude mb-4" />
                  <p className="text-gray-500">Your bag is empty</p>
                  <Link to="/shop" onClick={onClose} className="mt-4 inline-block text-champagne-gold underline">
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {items.map((item, idx) => (
                      <div key={idx} className="flex gap-4 p-3 bg-white rounded-lg border border-nude-light">
                        <div className="w-20 h-24 bg-nude-light rounded overflow-hidden flex-shrink-0">
                          {item.product.images[0] ? (
                            <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full placeholder-image flex items-center justify-center text-xs text-gray-400">
                              Placeholder
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-sm font-semibold truncate">{item.product.name}</h4>
                          <p className="text-xs text-gray-500 mt-1">Size: {item.size} • {item.color}</p>
                          <p className="text-sm font-semibold text-champagne-gold mt-1">{formatPrice(item.product.price)}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                              className="w-6 h-6 rounded border flex items-center justify-center text-xs">-</button>
                            <span className="text-sm">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                              className="w-6 h-6 rounded border flex items-center justify-center text-xs">+</button>
                            <button onClick={() => removeItem(item.product.id, item.size, item.color)}
                              className="ml-auto text-xs text-red-400 hover:text-red-600">Remove</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-nude pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold">Total</span>
                      <span className="font-serif text-xl text-champagne-gold">{formatPrice(total)}</span>
                    </div>
                    <button onClick={() => setCheckoutStep('checkout')}
                      className="w-full btn-gold text-white py-3 rounded-lg font-semibold tracking-wider text-sm uppercase">
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)}
                  className="w-full border border-nude rounded-lg px-4 py-2 focus:outline-none focus:border-champagne-gold" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)}
                  className="w-full border border-nude rounded-lg px-4 py-2 focus:outline-none focus:border-champagne-gold" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone / WhatsApp</label>
                <input type="tel" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)}
                  className="w-full border border-nude rounded-lg px-4 py-2 focus:outline-none focus:border-champagne-gold" />
              </div>
              <div className="bg-nude-light p-4 rounded-lg">
                <p className="font-semibold text-sm">Order Total: <span className="text-champagne-gold">{formatPrice(total)}</span></p>
                <p className="text-xs text-gray-500 mt-1">{items.length} item(s) in your bag</p>
              </div>
              <p className="text-xs text-gray-500 italic">
                ⚠️ Demo Mode: Orders are sent via WhatsApp. No actual payment is processed.
              </p>
              <button onClick={handleWhatsAppOrder}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold tracking-wider text-sm uppercase hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                <Phone size={16} /> Order via WhatsApp
              </button>
              <button onClick={() => setCheckoutStep('cart')}
                className="w-full border border-charcoal py-3 rounded-lg font-semibold tracking-wider text-sm uppercase hover:bg-charcoal hover:text-white transition-colors">
                Back to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============ FOOTER ============
export function Footer() {
  return (
    <footer className="bg-soft-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <h3 className="font-serif text-2xl mb-4">
              FASHION <span className="text-champagne-gold">MAVEN</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium Nigerian bridal couture and ready-to-wear fashion. Crafting dreams into reality since our founding.
            </p>
          </div>
          <div>
            <h4 className="font-sans text-sm uppercase tracking-wider mb-4 text-champagne-gold">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/bridal" className="block text-gray-400 text-sm hover:text-white transition-colors">Bridal Couture</Link>
              <Link to="/shop" className="block text-gray-400 text-sm hover:text-white transition-colors">Ready-to-Wear</Link>
              <Link to="/our-brides" className="block text-gray-400 text-sm hover:text-white transition-colors">Our Brides</Link>
              <Link to="/about" className="block text-gray-400 text-sm hover:text-white transition-colors">About Us</Link>
            </div>
          </div>
          <div>
            <h4 className="font-sans text-sm uppercase tracking-wider mb-4 text-champagne-gold">Contact</h4>
            <div className="space-y-3">
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors">
                <Phone size={14} /> WhatsApp
              </a>
              <a href="mailto:hello@fashionmaven.com"
                className="flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors">
                <Mail size={14} /> hello@fashionmaven.com
              </a>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin size={14} /> Lagos, Nigeria
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-sans text-sm uppercase tracking-wider mb-4 text-champagne-gold">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-champagne-gold hover:text-champagne-gold transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-champagne-gold hover:text-champagne-gold transition-colors">
                <Facebook size={18} />
              </a>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Social media handles to be updated by the brand owner.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Fashion Maven. All rights reserved. | 
            <Link to="/admin" className="ml-2 text-gray-600 hover:text-gray-400">Admin</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ============ PLACEHOLDER IMAGE COMPONENT ============
export function PlaceholderImage({ label, className = '' }: { label?: string; className?: string }) {
  return (
    <div className={`placeholder-image ${className}`}>
      <div className="relative z-10 text-center p-4">
        <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-champagne-gold/20 flex items-center justify-center">
          <span className="text-champagne-gold text-lg">✦</span>
        </div>
        {label && <p className="text-xs text-gray-500 font-sans">{label}</p>}
        <p className="text-[10px] text-gray-400 mt-1">Photo by Fashion Maven</p>
      </div>
    </div>
  );
}

// ============ PRODUCT CARD ============
export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/shop/${product.id}`} className="card-hover group block">
      <div className="relative overflow-hidden rounded-lg aspect-[3/4] bg-nude-light">
        {product.images[0] ? (
          <img src={product.images[0]} alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <PlaceholderImage label={product.name} className="w-full h-full" />
        )}
        {product.isPlaceholder && (
          <span className="absolute top-2 left-2 bg-gray-800/70 text-white text-[10px] px-2 py-1 rounded">
            Placeholder
          </span>
        )}
        {!product.available && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-charcoal px-4 py-2 text-sm font-semibold">Sold Out</span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-white text-sm font-sans flex items-center gap-1">
            View Details <ChevronRight size={14} />
          </span>
        </div>
      </div>
      <div className="mt-3">
        <h3 className="font-serif text-lg font-semibold text-charcoal group-hover:text-champagne-gold transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
