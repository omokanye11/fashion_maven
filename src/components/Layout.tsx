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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => { document.body.classList.remove('menu-open'); };
  }, [isOpen]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/bridal', label: 'Bridal' },
    { to: '/shop', label: 'Shop' },
    { to: '/our-brides', label: 'Our Brides' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white shadow-[0_1px_0_rgba(0,0,0,0.05)]' : 'bg-white/95 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link to="/" className="flex items-center">
              <span className="font-serif text-xl sm:text-2xl md:text-[1.7rem] font-semibold tracking-[0.05em] text-ink">
                FASHION<span className="text-gold ml-1">MAVEN</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`font-sans text-[11px] tracking-[0.15em] uppercase transition-all duration-300 luxury-underline ${
                    location.pathname === link.to ? 'text-gold' : 'text-ink hover:text-gold'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 mr-1 text-ink hover:text-gold transition-colors"
                aria-label="Shopping bag"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 text-ink"
                aria-label="Menu"
              >
                {isOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-pearl animate-fade-in max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="px-6 py-6 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block font-sans text-xs tracking-[0.15em] uppercase py-3 border-b border-pearl/50 ${
                    location.pathname === link.to ? 'text-gold' : 'text-ink'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/admin" className="block font-sans text-[10px] tracking-[0.15em] uppercase py-3 text-ash">
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
  const { items, removeItem, updateQuantity, total } = useCart();
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
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm sm:max-w-md bg-white shadow-2xl overflow-y-auto">
        <div className="p-5 sm:p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl text-ink">
              {checkoutStep === 'cart' ? 'Shopping Bag' : 'Checkout'}
            </h2>
            <button onClick={onClose} className="p-2 text-ink hover:text-gold transition-colors">
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>

          {checkoutStep === 'cart' ? (
            <>
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag size={40} strokeWidth={1} className="mx-auto text-stone mb-4" />
                  <p className="text-ash text-sm">Your bag is empty</p>
                  <Link to="/shop" onClick={onClose} className="mt-6 inline-block text-gold text-sm luxury-underline">
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-8">
                    {items.map((item, idx) => (
                      <div key={idx} className="flex gap-4 p-3 bg-cream rounded-lg">
                        <div className="w-20 h-24 bg-pearl rounded overflow-hidden flex-shrink-0">
                          {item.product.images[0] ? (
                            <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full placeholder-image flex items-center justify-center text-[10px] text-ash">
                              Placeholder
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-sm font-semibold text-ink truncate">{item.product.name}</h4>
                          <p className="text-[11px] text-ash mt-1 tracking-wide">Size: {item.size} • {item.color}</p>
                          <p className="text-sm font-medium text-gold mt-1">{formatPrice(item.product.price)}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                              className="w-6 h-6 rounded border border-pearl flex items-center justify-center text-[11px] text-ink hover:border-gold">-</button>
                            <span className="text-xs text-ink w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                              className="w-6 h-6 rounded border border-pearl flex items-center justify-center text-[11px] text-ink hover:border-gold">+</button>
                            <button onClick={() => removeItem(item.product.id, item.size, item.color)}
                              className="ml-auto text-[10px] text-ash hover:text-red-500 uppercase tracking-wider">Remove</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-pearl pt-6">
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-sans text-xs tracking-[0.15em] uppercase text-ink">Total</span>
                      <span className="font-serif text-2xl text-gold">{formatPrice(total)}</span>
                    </div>
                    <button onClick={() => setCheckoutStep('checkout')}
                      className="w-full btn-black py-3.5 rounded-lg font-sans text-[11px] tracking-[0.15em] uppercase">
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="space-y-5">
              <div>
                <label className="block text-[11px] font-medium mb-2 tracking-wide uppercase text-ink">Full Name</label>
                <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)}
                  className="w-full border border-pearl rounded-lg px-4 py-3 text-sm bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-medium mb-2 tracking-wide uppercase text-ink">Email</label>
                <input type="email" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)}
                  className="w-full border border-pearl rounded-lg px-4 py-3 text-sm bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-medium mb-2 tracking-wide uppercase text-ink">Phone / WhatsApp</label>
                <input type="tel" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)}
                  className="w-full border border-pearl rounded-lg px-4 py-3 text-sm bg-white" />
              </div>
              <div className="bg-cream p-5 rounded-lg">
                <p className="font-sans text-xs tracking-wide">Order Total: <span className="text-gold font-medium">{formatPrice(total)}</span></p>
                <p className="text-[11px] text-ash mt-1">{items.length} item(s) in your bag</p>
              </div>
              <p className="text-[10px] text-ash italic">
                ⚠️ Demo Mode: Orders are sent via WhatsApp. No actual payment is processed.
              </p>
              <button onClick={handleWhatsAppOrder}
                className="w-full bg-green-700 text-white py-3.5 rounded-lg font-sans text-[11px] tracking-[0.15em] uppercase hover:bg-green-800 transition-colors flex items-center justify-center gap-2">
                <Phone size={14} strokeWidth={1.5} /> Order via WhatsApp
              </button>
              <button onClick={() => setCheckoutStep('cart')}
                className="w-full btn-outline-black py-3.5 rounded-lg font-sans text-[11px] tracking-[0.15em] uppercase">
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
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-serif text-xl sm:text-2xl mb-4 sm:mb-5 tracking-wide">
              FASHION<span className="text-gold ml-1">MAVEN</span>
            </h3>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-xs">
              Premium Nigerian bridal couture and ready-to-wear fashion. Crafting dreams into reality since our founding.
            </p>
          </div>
          <div>
            <h4 className="font-sans text-[10px] uppercase tracking-[0.2em] mb-5 text-gold">Quick Links</h4>
            <div className="space-y-3">
              <Link to="/bridal" className="block text-white/60 text-xs sm:text-sm hover:text-white transition-colors tracking-wide">Bridal Couture</Link>
              <Link to="/shop" className="block text-white/60 text-xs sm:text-sm hover:text-white transition-colors tracking-wide">Ready-to-Wear</Link>
              <Link to="/our-brides" className="block text-white/60 text-xs sm:text-sm hover:text-white transition-colors tracking-wide">Our Brides</Link>
              <Link to="/about" className="block text-white/60 text-xs sm:text-sm hover:text-white transition-colors tracking-wide">About Us</Link>
            </div>
          </div>
          <div>
            <h4 className="font-sans text-[10px] uppercase tracking-[0.2em] mb-5 text-gold">Contact</h4>
            <div className="space-y-3">
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 text-xs sm:text-sm hover:text-white transition-colors">
                <Phone size={12} strokeWidth={1.5} /> WhatsApp
              </a>
              <a href="mailto:hello@fashionmaven.com"
                className="flex items-center gap-2 text-white/60 text-xs sm:text-sm hover:text-white transition-colors">
                <Mail size={12} strokeWidth={1.5} /> hello@fashionmaven.com
              </a>
              <div className="flex items-center gap-2 text-white/60 text-xs sm:text-sm">
                <MapPin size={12} strokeWidth={1.5} /> Lagos, Nigeria
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-sans text-[10px] uppercase tracking-[0.2em] mb-5 text-gold">Follow Us</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-all">
                <Instagram size={16} strokeWidth={1.5} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-all">
                <Facebook size={16} strokeWidth={1.5} />
              </a>
            </div>
            <p className="text-[10px] text-white/40 mt-4">
              Social media handles to be updated by the brand owner.
            </p>
          </div>
        </div>
        <div className="divider-gold mt-12 mb-8 opacity-30" />
        <div className="text-center">
          <p className="text-white/40 text-[10px] sm:text-xs tracking-wider">
            © {new Date().getFullYear()} FASHION MAVEN. ALL RIGHTS RESERVED.
            <Link to="/admin" className="ml-3 text-white/30 hover:text-white/60">ADMIN</Link>
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
        <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gold/10 flex items-center justify-center">
          <span className="text-gold text-sm">✦</span>
        </div>
        {label && <p className="text-[10px] text-ash font-sans tracking-wide">{label}</p>}
        <p className="text-[9px] text-ash/60 mt-1 tracking-wider">FASHION MAVEN</p>
      </div>
    </div>
  );
}

// ============ PRODUCT CARD ============
export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/shop/${product.id}`} className="card-hover group block">
      <div className="relative overflow-hidden rounded-lg aspect-[3/4] bg-cream">
        {product.images[0] ? (
          <img src={product.images[0]} alt={product.name}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
        ) : (
          <PlaceholderImage label={product.name} className="w-full h-full" />
        )}
        {product.isPlaceholder && (
          <span className="absolute top-3 left-3 bg-black/80 text-white text-[9px] px-2.5 py-1 rounded tracking-wider uppercase">
            Placeholder
          </span>
        )}
        {!product.available && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <span className="bg-white text-ink px-4 py-2 text-[10px] font-semibold tracking-[0.15em] uppercase">Sold Out</span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="text-white text-[11px] font-sans tracking-wider flex items-center gap-1 uppercase">
            View Details <ChevronRight size={12} />
          </span>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-serif text-base sm:text-lg font-semibold text-ink group-hover:text-gold transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-xs text-ash mt-1 tracking-wide">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
