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
          <h2 className="font-serif text-3xl mb-4">Design Not Found</h2>
          <Link to="/shop" className="text-champagne-gold underline">Back to Shop</Link>
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
    <div className="min-h-screen pt-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-champagne-gold mb-8">
          <ArrowLeft size={16} /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-[3/4] rounded-xl overflow-hidden bg-nude-light">
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
            <p className="text-champagne-gold font-sans text-sm tracking-wider uppercase mb-2">
              {getCategoryLabel(product.category)}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">{product.name}</h1>
            <p className="font-serif text-3xl text-champagne-gold mb-6">{formatPrice(product.price)}</p>
            <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

            {product.isPlaceholder && (
              <div className="bg-nude-light border border-nude rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-500">
                  ℹ️ This is a placeholder listing. Contact us via WhatsApp for availability and custom orders.
                </p>
              </div>
            )}

            {!product.available && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-red-600 font-medium">This item is currently sold out.</p>
              </div>
            )}

            {/* Size Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">Select Size</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button key={size} onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                      selectedSize === size
                        ? 'border-champagne-gold bg-champagne-gold text-white'
                        : 'border-nude hover:border-champagne-gold'
                    }`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium mb-3">Select Color</label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(color => (
                  <button key={color} onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                      selectedColor === color
                        ? 'border-champagne-gold bg-champagne-gold text-white'
                        : 'border-nude hover:border-champagne-gold'
                    }`}>
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button onClick={handleAddToCart} disabled={!selectedSize || !selectedColor || !product.available}
                className={`w-full py-4 rounded-lg font-sans text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all ${
                  added ? 'bg-green-600 text-white' :
                  (!selectedSize || !selectedColor || !product.available)
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'btn-gold text-white'
                }`}>
                {added ? <><Check size={18} /> Added to Bag</> : <><ShoppingBag size={18} /> Add to Bag</>}
              </button>
              <button onClick={handleWhatsAppOrder}
                className="w-full bg-green-600 text-white py-4 rounded-lg font-sans text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-green-700 transition-colors">
                <Phone size={18} /> Order via WhatsApp
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              ⚠️ Demo: WhatsApp ordering opens a pre-filled message. No actual payment is processed.
            </p>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-nude-light">
            <h2 className="font-serif text-3xl text-charcoal mb-8">You May Also Love</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <Link key={p.id} to={`/shop/${p.id}`} className="group">
                  <div className="aspect-[3/4] rounded-lg overflow-hidden bg-nude-light mb-3">
                    {p.images[0] ? (
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <PlaceholderImage label={p.name} className="w-full h-full" />
                    )}
                  </div>
                  <h3 className="font-serif text-lg group-hover:text-champagne-gold transition-colors">{p.name}</h3>
                  <p className="text-sm text-gray-500">{formatPrice(p.price)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
