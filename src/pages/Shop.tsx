import { useState, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { getProducts, Category, getCategoryLabel } from '../store';
import { ProductCard } from '../components/Layout';

export default function Shop() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category | 'all'>('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const products = getProducts();

  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    if (sortBy === 'price-low') filtered = [...filtered].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') filtered = [...filtered].sort((a, b) => b.price - a.price);
    if (sortBy === 'name') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    return filtered;
  }, [products, category, search, sortBy]);

  const categories: { value: Category | 'all'; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'ready-to-wear', label: 'Ready-to-Wear' },
    { value: 'bridal-gowns', label: 'Bridal Gowns' },
    { value: 'reception-dresses', label: 'Reception Dresses' },
    { value: 'traditional-engagement', label: 'Traditional' },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-ivory py-12 border-b border-nude-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-champagne-gold font-sans text-sm tracking-[0.2em] uppercase mb-3">Shop</p>
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal">Ready-to-Wear & Designs</h1>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Explore our collection of ready-to-wear pieces and available designs.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search designs..."
                value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-nude rounded-lg focus:outline-none focus:border-champagne-gold bg-white" />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2">
                  <X size={16} className="text-gray-400" />
                </button>
              )}
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <button onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 border border-nude rounded-lg bg-white hover:border-champagne-gold transition-colors">
                <Filter size={16} /> Filters
              </button>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="px-4 py-3 border border-nude rounded-lg bg-white focus:outline-none focus:border-champagne-gold">
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>

          {/* Filter Tags */}
          {showFilters && (
            <div className="mt-4 flex flex-wrap gap-2 animate-fade-in">
              {categories.map(cat => (
                <button key={cat.value} onClick={() => setCategory(cat.value)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    category === cat.value
                      ? 'bg-champagne-gold text-white'
                      : 'bg-white border border-nude text-charcoal hover:border-champagne-gold'
                  }`}>
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-6">
            Showing {filteredProducts.length} design{filteredProducts.length !== 1 ? 's' : ''}
            {category !== 'all' && ` in ${getCategoryLabel(category)}`}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No designs found. Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
