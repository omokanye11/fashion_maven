import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Phone, Check } from 'lucide-react';
import { getProducts, formatPrice, getCategoryLabel } from '../store';
import { useCart, PlaceholderImage } from '../components/Layout';

export default function ProductDetail() {
  const { id } = useParams();
  const products = getProducts();
  const product = products.find(p => p.id === id);
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-display mb-4 text-ink">Design Not Found</h2>
          <Link to="/shop" className="text-gold text-sm luxury-underline">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    addItem(product, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWhatsAppOrder = () => {
    const message = `Hi Fashion Maven! I'm interested in:\n\n*${product.name}*\nSize: ${selectedSize || 'Not selected'}\nColor: ${selectedColor || 'Not selected'}\nPrice: ${formatPrice(product.price)}\n\nCould you please share more details?`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <Link to="/shop" className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] text-ash hover:text-gold mb-4 sm:mb-6 tracking-wider uppercase">
          <ArrowLeft size={14} strokeWidth={1.5} /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-[3/4] rounded-lg overflow-hidden bg-cream">
              {product.images[0] ? (
                <img src={product.images[0]} alt={product.name}
                  className="w-full h-full object-cover" />
              ) : (
                <PlaceholderImage label={product.name} className="w-full h-full" />
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(1).map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-lg overflow-hidden">
                    <img src={img} alt={`${product.name} ${idx + 2}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="lg:py-8">
            <p className="text-gold font-sans text-[10px] sm:text-[11px] tracking-[0.15em] uppercase mb-2">
              {getCategoryLabel(product.category)}
            </p>
            <h1 className="font-serif text-display text-ink mb-4">{product.name}</h1>
            <p className="font-serif text-2xl sm:text-3xl text-gold mb-4 sm:mb-6">{formatPrice(product.price)}</p>
            <p className="text-graphite leading-relaxed mb-6 sm:mb-8 text-xs sm:text-sm">{product.description}</p>

            {product.isPlaceholder && (
              <div className="bg-cream border border-pearl rounded-lg p-4 mb-4 sm:mb-6">
                <p className="text-[10px] sm:text-[11px] text-ash">
                  ℹ️ This is a placeholder listing. Contact us via WhatsApp for availability and custom orders.
                </p>
              </div>
            )}

            {!product.available && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 sm:mb-6">
                <p className="text-[10px] sm:text-[11px] text-red-600 font-medium">This item is currently sold out.</p>
              </div>
            )}

            {/* Size Selection */}
            <div className="mb-4 sm:mb-6">
              <label className="block text-[10px] sm:text-[11px] font-medium mb-2 sm:mb-3 tracking-wide uppercase text-ink">Select Size</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button key={size} onClick={() => setSelectedSize(size)}
                    className={`px-3 sm:px-4 py-2 rounded-lg border text-[10px] sm:text-[11px] tracking-wider uppercase transition-all ${
                      selectedSize === size
                        ? 'border-gold bg-ink text-white'
                        : 'border-pearl hover:border-gold text-ink'
                    }`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6 sm:mb-8">
              <label className="block text-[10px] sm:text-[11px] font-medium mb-2 sm:mb-3 tracking-wide uppercase text-ink">Select Color</label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(color => (
                  <button key={color} onClick={() => setSelectedColor(color)}
                    className={`px-3 sm:px-4 py-2 rounded-lg border text-[10px] sm:text-[11px] tracking-wider uppercase transition-all ${
                      selectedColor === color
                        ? 'border-gold bg-ink text-white'
                        : 'border-pearl hover:border-gold text-ink'
                    }`}>
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button onClick={handleAddToCart} disabled={!selectedSize || !selectedColor || !product.available}
                className={`w-full py-3 sm:py-4 rounded-lg font-sans text-[10px] sm:text-[11px] tracking-[0.15em] uppercase flex items-center justify-center gap-2 transition-all ${
                  added ? 'bg-green-700 text-white' :
                  (!selectedSize || !selectedColor || !product.available)
                    ? 'bg-pearl text-ash cursor-not-allowed'
                    : 'btn-black'
                }`}>
                {added ? <><Check size={16} strokeWidth={1.5} /> Added to Bag</> : <><ShoppingBag size={16} strokeWidth={1.5} /> Add to Bag</>}
              </button>
              <button onClick={handleWhatsAppOrder}
                className="w-full bg-green-700 text-white py-3 sm:py-4 rounded-lg font-sans text-[10px] sm:text-[11px] tracking-[0.15em] uppercase flex items-center justify-center gap-2 hover:bg-green-800 transition-colors">
                <Phone size={16} strokeWidth={1.5} /> Order via WhatsApp
              </button>
            </div>

            <p className="text-[10px] text-ash mt-4">
              ⚠️ Demo: WhatsApp ordering opens a pre-filled message. No actual payment is processed.
            </p>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-20 pt-10 sm:pt-12 border-t border-pearl">
            <h2 className="font-serif text-2xl sm:text-3xl text-ink mb-6 sm:mb-8">You May Also Love</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map(p => (
                <Link key={p.id} to={`/shop/${p.id}`} className="group">
                  <div className="aspect-[3/4] rounded-lg overflow-hidden bg-cream mb-3">
                    {p.images[0] ? (
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                    ) : (
                      <PlaceholderImage label={p.name} className="w-full h-full" />
                    )}
                  </div>
                  <h3 className="font-serif text-base sm:text-lg group-hover:text-gold transition-colors text-ink">{p.name}</h3>
                  <p className="text-[10px] sm:text-xs text-ash mt-1">{formatPrice(p.price)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
