import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Package, Users, ShoppingCart, Heart, LogOut, Plus, Trash2, Edit, BarChart3 } from 'lucide-react';
import {
  isAdminLoggedIn, adminLogin, adminLogout,
  getProducts, addProduct, updateProduct, deleteProduct,
  getEnquiries, updateEnquiryStatus,
  getOrders, updateOrderStatus,
  getBrides, addBride,
  formatPrice, getCategoryLabel, Category, Product, BridalEnquiry, Order
} from '../store';

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(isAdminLoggedIn());
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!loggedIn) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-cream">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md border border-pearl mx-4">
          <div className="text-center mb-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
              <Lock size={24} strokeWidth={1.5} className="text-gold" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl text-ink">Admin Access</h1>
            <p className="text-ash text-xs sm:text-sm mt-2">Enter your password to access the dashboard</p>
          </div>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (adminLogin(password)) {
              setLoggedIn(true);
              setLoginError(false);
            } else {
              setLoginError(true);
            }
          }} className="space-y-4">
            <input type="password" placeholder="Password" value={password}
              onChange={e => { setPassword(e.target.value); setLoginError(false); }}
              className={`w-full border rounded-lg px-4 py-3 text-sm ${
                loginError ? 'border-red-400' : 'border-pearl'
              }`} />
            {loginError && <p className="text-red-500 text-xs">Incorrect password. Try again.</p>}
            <button type="submit" className="w-full btn-black py-3 rounded-lg font-sans text-[11px] tracking-[0.15em] uppercase">
              Login
            </button>
          </form>
          <div className="mt-6 p-4 bg-cream rounded-lg">
            <p className="text-[10px] text-ash">
              <strong>Demo Password:</strong> fashionmaven2024
            </p>
            <p className="text-[10px] text-ash/60 mt-1">
              In production, this would use secure authentication.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    adminLogout();
    setLoggedIn(false);
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'enquiries', label: 'Enquiries', icon: Heart },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'brides', label: 'Brides', icon: Users },
  ];

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl text-ink">Admin Dashboard</h1>
            <p className="text-ash text-[10px] sm:text-xs tracking-wide">Manage your Fashion Maven store</p>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/" className="text-[10px] sm:text-[11px] text-ash hover:text-gold tracking-wide">View Site</Link>
            <button onClick={handleLogout}
              className="flex items-center gap-2 text-[10px] sm:text-[11px] text-red-500 hover:text-red-700 tracking-wide">
              <LogOut size={14} strokeWidth={1.5} /> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        <div className="flex gap-2 mb-6 sm:mb-8 border-b border-pearl pb-4 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-[10px] sm:text-[11px] tracking-wider uppercase transition-all whitespace-nowrap flex-shrink-0 ${
                activeTab === tab.id
                  ? 'bg-ink text-white'
                  : 'bg-white text-graphite hover:bg-silk'
              }`}>
              <tab.icon size={14} strokeWidth={1.5} /> <span className="hidden sm:inline">{tab.label}</span><span className="sm:hidden">{tab.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'products' && <ProductsTab />}
        {activeTab === 'enquiries' && <EnquiriesTab />}
        {activeTab === 'orders' && <OrdersTab />}
        {activeTab === 'brides' && <BridesTab />}
      </div>
    </div>
  );
}

function DashboardTab() {
  const products = getProducts();
  const enquiries = getEnquiries();
  const orders = getOrders();
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        <StatCard title="Products" value={products.length.toString()} icon={Package} color="bg-ink/5 text-ink" />
        <StatCard title="Enquiries" value={enquiries.length.toString()} icon={Heart} color="bg-gold/10 text-gold" />
        <StatCard title="Orders" value={orders.length.toString()} icon={ShoppingCart} color="bg-ink/5 text-ink" />
        <StatCard title="Revenue" value={formatPrice(totalRevenue)} icon={BarChart3} color="bg-gold/10 text-gold" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white p-5 sm:p-6 rounded-lg border border-pearl">
          <h3 className="font-serif text-lg sm:text-xl mb-4 text-ink">Recent Enquiries</h3>
          {enquiries.length === 0 ? (
            <p className="text-ash text-xs">No enquiries yet</p>
          ) : (
            <div className="space-y-3">
              {enquiries.slice(-5).reverse().map(e => (
                <div key={e.id} className="flex items-center justify-between p-3 bg-cream rounded-lg">
                  <div>
                    <p className="font-medium text-xs sm:text-sm text-ink">{e.brideName}</p>
                    <p className="text-[10px] text-ash">{new Date(e.createdAt).toLocaleDateString()}</p>
                  </div>
                  <StatusBadge status={e.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-lg border border-pearl">
          <h3 className="font-serif text-lg sm:text-xl mb-4 text-ink">Recent Orders</h3>
          {orders.length === 0 ? (
            <p className="text-ash text-xs">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {orders.slice(-5).reverse().map(o => (
                <div key={o.id} className="flex items-center justify-between p-3 bg-cream rounded-lg">
                  <div>
                    <p className="font-medium text-xs sm:text-sm text-ink">{o.customerName}</p>
                    <p className="text-[10px] text-ash">{formatPrice(o.total)}</p>
                  </div>
                  <StatusBadge status={o.status} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-gold/5 border border-gold/20 rounded-lg">
        <p className="text-[10px] sm:text-[11px] text-graphite">
          <strong>⚠️ Demo Mode:</strong> All data is stored in browser localStorage. In production, this would connect to a secure database.
        </p>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: { title: string; value: string; icon: any; color: string }) {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-lg border border-pearl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[9px] sm:text-[10px] text-ash uppercase tracking-wider">{title}</p>
          <p className="font-serif text-xl sm:text-2xl font-semibold mt-1 text-ink">{value}</p>
        </div>
        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center ${color}`}>
          <Icon size={18} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    new: 'bg-gold/10 text-gold',
    contacted: 'bg-ink/5 text-ink',
    consultation: 'bg-gold/10 text-gold-dark',
    confirmed: 'bg-green-50 text-green-700',
    completed: 'bg-pearl text-graphite',
    pending: 'bg-gold/10 text-gold-dark',
    processing: 'bg-ink/5 text-ink',
    shipped: 'bg-ink/5 text-ink',
    delivered: 'bg-green-50 text-green-700',
  };
  return (
    <span className={`text-[9px] sm:text-[10px] px-2 py-1 rounded-full font-medium tracking-wider uppercase ${colors[status] || 'bg-pearl text-graphite'}`}>
      {status}
    </span>
  );
}

function ProductsTab() {
  const [products, setProducts] = useState(getProducts());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '', category: 'ready-to-wear' as Category, description: '', price: 0,
    sizes: '', colors: '', images: '', isPlaceholder: true, available: true, featured: false,
  });

  const refresh = () => setProducts(getProducts());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name: form.name, category: form.category, description: form.description, price: form.price,
      sizes: form.sizes.split(',').map(s => s.trim()).filter(Boolean),
      colors: form.colors.split(',').map(s => s.trim()).filter(Boolean),
      images: form.images.split(',').map(s => s.trim()).filter(Boolean),
      isPlaceholder: form.isPlaceholder, available: form.available, featured: form.featured,
    };
    if (editingId) { updateProduct(editingId, productData); } else { addProduct(productData); }
    setShowForm(false); setEditingId(null);
    setForm({ name: '', category: 'ready-to-wear', description: '', price: 0, sizes: '', colors: '', images: '', isPlaceholder: true, available: true, featured: false });
    refresh();
  };

  const handleEdit = (product: Product) => {
    setForm({
      name: product.name, category: product.category, description: product.description,
      price: product.price, sizes: product.sizes.join(', '), colors: product.colors.join(', '),
      images: product.images.join(', '), isPlaceholder: product.isPlaceholder,
      available: product.available, featured: product.featured,
    });
    setEditingId(product.id); setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this product?')) { deleteProduct(id); refresh(); }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h2 className="font-serif text-xl sm:text-2xl text-ink">Products ({products.length})</h2>
        <button onClick={() => { setShowForm(true); setEditingId(null); setForm({ name: '', category: 'ready-to-wear', description: '', price: 0, sizes: '', colors: '', images: '', isPlaceholder: true, available: true, featured: false }); }}
          className="btn-black px-4 py-2 rounded-lg text-[10px] sm:text-[11px] flex items-center gap-2 tracking-wider uppercase">
          <Plus size={14} strokeWidth={1.5} /> Add Product
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-5 sm:p-6 rounded-lg border border-pearl mb-6">
          <h3 className="font-serif text-lg sm:text-xl mb-4 text-ink">{editingId ? 'Edit Product' : 'Add New Product'}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] sm:text-[11px] font-medium mb-1 tracking-wide uppercase">Name *</label>
              <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full border border-pearl rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-[10px] sm:text-[11px] font-medium mb-1 tracking-wide uppercase">Category *</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value as Category })}
                className="w-full border border-pearl rounded-lg px-3 py-2 text-sm">
                <option value="bridal-gowns">Bridal Gowns</option>
                <option value="reception-dresses">Reception Dresses</option>
                <option value="traditional-engagement">Traditional Engagement</option>
                <option value="ready-to-wear">Ready-to-Wear</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] sm:text-[11px] font-medium mb-1 tracking-wide uppercase">Description</label>
              <textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                className="w-full border border-pearl rounded-lg px-3 py-2 text-sm resize-none" />
            </div>
            <div>
              <label className="block text-[10px] sm:text-[11px] font-medium mb-1 tracking-wide uppercase">Price (₦) *</label>
              <input type="number" required value={form.price || ''} onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                className="w-full border border-pearl rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-[10px] sm:text-[11px] font-medium mb-1 tracking-wide uppercase">Sizes (comma-sep)</label>
              <input type="text" value={form.sizes} onChange={e => setForm({ ...form, sizes: e.target.value })}
                placeholder="XS, S, M, L" className="w-full border border-pearl rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-[10px] sm:text-[11px] font-medium mb-1 tracking-wide uppercase">Colors (comma-sep)</label>
              <input type="text" value={form.colors} onChange={e => setForm({ ...form, colors: e.target.value })}
                placeholder="Ivory, Gold" className="w-full border border-pearl rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-[10px] sm:text-[11px] font-medium mb-1 tracking-wide uppercase">Image URLs</label>
              <input type="text" value={form.images} onChange={e => setForm({ ...form, images: e.target.value })}
                placeholder="https://..." className="w-full border border-pearl rounded-lg px-3 py-2 text-sm" />
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <label className="flex items-center gap-2 text-[10px] sm:text-[11px]">
                <input type="checkbox" checked={form.isPlaceholder} onChange={e => setForm({ ...form, isPlaceholder: e.target.checked })} />
                Placeholder
              </label>
              <label className="flex items-center gap-2 text-[10px] sm:text-[11px]">
                <input type="checkbox" checked={form.available} onChange={e => setForm({ ...form, available: e.target.checked })} />
                Available
              </label>
              <label className="flex items-center gap-2 text-[10px] sm:text-[11px]">
                <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
                Featured
              </label>
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" className="btn-black px-6 py-2 rounded-lg text-[10px] sm:text-[11px] tracking-wider uppercase">
                {editingId ? 'Update' : 'Add'} Product
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }}
                className="border border-pearl px-6 py-2 rounded-lg text-[10px] sm:text-[11px] hover:bg-cream">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg border border-pearl overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-[10px] sm:text-xs">
            <thead className="bg-cream border-b border-pearl">
              <tr>
                <th className="text-left px-3 sm:px-4 py-3 font-medium tracking-wider uppercase text-ash">Product</th>
                <th className="text-left px-3 sm:px-4 py-3 font-medium tracking-wider uppercase text-ash hidden sm:table-cell">Category</th>
                <th className="text-left px-3 sm:px-4 py-3 font-medium tracking-wider uppercase text-ash">Price</th>
                <th className="text-left px-3 sm:px-4 py-3 font-medium tracking-wider uppercase text-ash">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pearl">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-cream/50">
                  <td className="px-3 sm:px-4 py-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-10 sm:w-10 sm:h-12 rounded bg-pearl overflow-hidden flex-shrink-0">
                        {p.images[0] ? <img src={p.images[0]} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full placeholder-image" />}
                      </div>
                      <span className="font-medium truncate max-w-[120px] sm:max-w-[200px] text-ink">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-ash hidden sm:table-cell">{getCategoryLabel(p.category)}</td>
                  <td className="px-3 sm:px-4 py-3 text-ink">{formatPrice(p.price)}</td>
                  <td className="px-3 sm:px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(p)} className="p-1 hover:text-gold"><Edit size={14} strokeWidth={1.5} /></button>
                      <button onClick={() => handleDelete(p.id)} className="p-1 hover:text-red-500"><Trash2 size={14} strokeWidth={1.5} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function EnquiriesTab() {
  const [enquiries, setEnquiries] = useState(getEnquiries());
  const refresh = () => setEnquiries(getEnquiries());

  const handleStatusChange = (id: string, status: BridalEnquiry['status']) => {
    updateEnquiryStatus(id, status); refresh();
  };

  return (
    <div>
      <h2 className="font-serif text-xl sm:text-2xl mb-6 text-ink">Bridal Enquiries ({enquiries.length})</h2>
      {enquiries.length === 0 ? (
        <div className="bg-white p-10 sm:p-12 rounded-lg border border-pearl text-center">
          <Heart size={32} strokeWidth={1} className="mx-auto text-pearl mb-4" />
          <p className="text-ash text-xs sm:text-sm">No bridal enquiries yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map(e => (
            <div key={e.id} className="bg-white p-5 sm:p-6 rounded-lg border border-pearl">
              <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-3">
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-semibold text-ink">{e.brideName}</h3>
                  <p className="text-[10px] sm:text-[11px] text-ash">{new Date(e.createdAt).toLocaleDateString()}</p>
                </div>
                <select value={e.status} onChange={ev => handleStatusChange(e.id, ev.target.value as BridalEnquiry['status'])}
                  className="border border-pearl rounded-lg px-3 py-1 text-[10px] sm:text-[11px]">
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="consultation">Consultation</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-[10px] sm:text-xs">
                <div><span className="text-ash">Email:</span> <span className="text-ink">{e.email}</span></div>
                <div><span className="text-ash">Phone:</span> <span className="text-ink">{e.phone}</span></div>
                <div><span className="text-ash">Wedding:</span> <span className="text-ink">{e.weddingDate || '—'}</span></div>
                <div><span className="text-ash">Style:</span> <span className="text-ink">{e.preferredStyle || '—'}</span></div>
                <div><span className="text-ash">Budget:</span> <span className="text-ink">{e.budget || '—'}</span></div>
                <div><span className="text-ash">Appt:</span> <span className="text-ink">{e.appointmentDate || '—'}</span></div>
              </div>
              {e.notes && <p className="mt-3 text-[10px] sm:text-xs text-graphite bg-cream p-3 rounded-lg"><strong>Notes:</strong> {e.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function OrdersTab() {
  const [orders, setOrders] = useState(getOrders());
  const refresh = () => setOrders(getOrders());

  const handleStatusChange = (id: string, status: Order['status']) => {
    updateOrderStatus(id, status); refresh();
  };

  return (
    <div>
      <h2 className="font-serif text-xl sm:text-2xl mb-6 text-ink">Orders ({orders.length})</h2>
      {orders.length === 0 ? (
        <div className="bg-white p-10 sm:p-12 rounded-lg border border-pearl text-center">
          <ShoppingCart size={32} strokeWidth={1} className="mx-auto text-pearl mb-4" />
          <p className="text-ash text-xs sm:text-sm">No orders yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(o => (
            <div key={o.id} className="bg-white p-5 sm:p-6 rounded-lg border border-pearl">
              <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-3">
                <div>
                  <h3 className="font-semibold text-sm sm:text-base text-ink">{o.customerName}</h3>
                  <p className="text-[10px] sm:text-[11px] text-ash">{o.email} • {o.phone}</p>
                  <p className="text-[9px] sm:text-[10px] text-ash/60">{new Date(o.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-serif text-lg sm:text-xl text-gold">{formatPrice(o.total)}</p>
                  <select value={o.status} onChange={ev => handleStatusChange(o.id, ev.target.value as Order['status'])}
                    className="border border-pearl rounded-lg px-3 py-1 text-[10px] sm:text-[11px] mt-1">
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>
              <div className="border-t border-pearl pt-3">
                {o.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-[10px] sm:text-xs py-1">
                    <span className="text-graphite">{item.name} ({item.size}, {item.color}) x{item.quantity}</span>
                    <span className="text-ink">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BridesTab() {
  const [brides, setBrides] = useState(getBrides());
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ brideName: '', image: '', weddingDate: '', dressStyle: '', testimonial: '', isPlaceholder: true });

  const refresh = () => setBrides(getBrides());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBride(form); setShowForm(false);
    setForm({ brideName: '', image: '', weddingDate: '', dressStyle: '', testimonial: '', isPlaceholder: true });
    refresh();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h2 className="font-serif text-xl sm:text-2xl text-ink">Brides Gallery ({brides.length})</h2>
        <button onClick={() => setShowForm(true)}
          className="btn-black px-4 py-2 rounded-lg text-[10px] sm:text-[11px] flex items-center gap-2 tracking-wider uppercase">
          <Plus size={14} strokeWidth={1.5} /> Add Bride
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-5 sm:p-6 rounded-lg border border-pearl mb-6">
          <h3 className="font-serif text-lg sm:text-xl mb-4 text-ink">Add Bride to Gallery</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] sm:text-[11px] font-medium mb-1 tracking-wide uppercase">Bride Name *</label>
              <input type="text" required value={form.brideName} onChange={e => setForm({ ...form, brideName: e.target.value })}
                className="w-full border border-pearl rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-[10px] sm:text-[11px] font-medium mb-1 tracking-wide uppercase">Wedding Year</label>
              <input type="text" value={form.weddingDate} onChange={e => setForm({ ...form, weddingDate: e.target.value })}
                className="w-full border border-pearl rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-[10px] sm:text-[11px] font-medium mb-1 tracking-wide uppercase">Dress Style</label>
              <input type="text" value={form.dressStyle} onChange={e => setForm({ ...form, dressStyle: e.target.value })}
                className="w-full border border-pearl rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-[10px] sm:text-[11px] font-medium mb-1 tracking-wide uppercase">Photo URL</label>
              <input type="text" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })}
                className="w-full border border-pearl rounded-lg px-3 py-2 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] sm:text-[11px] font-medium mb-1 tracking-wide uppercase">Testimonial</label>
              <textarea rows={2} value={form.testimonial} onChange={e => setForm({ ...form, testimonial: e.target.value })}
                className="w-full border border-pearl rounded-lg px-3 py-2 text-sm resize-none" />
            </div>
            <label className="flex items-center gap-2 text-[10px] sm:text-[11px]">
              <input type="checkbox" checked={form.isPlaceholder} onChange={e => setForm({ ...form, isPlaceholder: e.target.checked })} />
              Mark as placeholder
            </label>
            <div className="flex gap-3">
              <button type="submit" className="btn-black px-6 py-2 rounded-lg text-[10px] sm:text-[11px] tracking-wider uppercase">Add</button>
              <button type="button" onClick={() => setShowForm(false)} className="border border-pearl px-6 py-2 rounded-lg text-[10px] sm:text-[11px] hover:bg-cream">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {brides.map(b => (
          <div key={b.id} className="bg-white rounded-lg border border-pearl overflow-hidden">
            <div className="aspect-[3/4] bg-cream">
              {b.image ? (
                <img src={b.image} alt={b.brideName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full placeholder-image flex items-center justify-center">
                  <span className="text-ash text-xs">No photo</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-serif font-semibold text-ink">{b.brideName}</h3>
              <p className="text-[10px] sm:text-[11px] text-ash tracking-wide">{b.dressStyle} • {b.weddingDate}</p>
              {b.isPlaceholder && <span className="text-[9px] bg-pearl text-ash px-2 py-0.5 rounded mt-1 inline-block tracking-wider uppercase">Placeholder</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
