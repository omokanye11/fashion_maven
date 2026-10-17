import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Package, Users, ShoppingCart, Heart, LogOut, Plus, Trash2, Edit, BarChart3 } from 'lucide-react';
import {
  isAdminLoggedIn, adminLogin, adminLogout,
  getProducts, addProduct, updateProduct, deleteProduct,
  getEnquiries, updateEnquiryStatus,
  getOrders, updateOrderStatus,
  getBrides, addBride,
  formatPrice, getCategoryLabel, Category, Product, BridalEnquiry, Order, BrideGallery
} from '../store';

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(isAdminLoggedIn());
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!loggedIn) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-white">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md border border-mid-gray mx-4">
          <div className="text-center mb-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-yellow/10 flex items-center justify-center mx-auto mb-4">
              <Lock size={24} className="text-yellow sm:hidden" />
              <Lock size={28} className="text-yellow hidden sm:block" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl">Admin Access</h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-2">Enter your password to access the dashboard</p>
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
              className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-yellow ${
                loginError ? 'border-red-400' : 'border-mid-gray'
              }`} />
            {loginError && <p className="text-red-500 text-sm">Incorrect password. Try again.</p>}
            <button type="submit" className="w-full btn-black py-3 rounded-lg font-semibold">
              Login
            </button>
          </form>
          <div className="mt-6 p-4 bg-light-gray rounded-lg">
            <p className="text-xs text-gray-500">
              <strong>Demo Password:</strong> fashionmaven2024
            </p>
            <p className="text-xs text-gray-400 mt-1">
              In production, this would use secure authentication (e.g., Supabase Auth, Firebase Auth).
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
    { id: 'enquiries', label: 'Bridal Enquiries', icon: Heart },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'brides', label: 'Brides Gallery', icon: Users },
  ];

  return (
    <div className="min-h-screen pt-20 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl">Admin Dashboard</h1>
            <p className="text-gray-500 text-xs sm:text-sm">Manage your Fashion Maven store</p>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/" className="text-xs sm:text-sm text-gray-500 hover:text-yellow">View Site</Link>
            <button onClick={handleLogout}
              className="flex items-center gap-2 text-xs sm:text-sm text-red-500 hover:text-red-700">
              <LogOut size={16} /> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8 border-b border-mid-gray pb-4 overflow-x-auto">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}>
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'products' && <ProductsTab />}
        {activeTab === 'enquiries' && <EnquiriesTab />}
        {activeTab === 'orders' && <OrdersTab />}
        {activeTab === 'brides' && <BridesTab />}
      </div>
    </div>
  );
}

// ============ DASHBOARD TAB ============
function DashboardTab() {
  const products = getProducts();
  const enquiries = getEnquiries();
  const orders = getOrders();
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const newEnquiries = enquiries.filter(e => e.status === 'new').length;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Products" value={products.length.toString()} icon={Package} color="bg-blue-50 text-blue-600" />
        <StatCard title="Bridal Enquiries" value={enquiries.length.toString()} icon={Heart} color="bg-pink-50 text-pink-600" />
        <StatCard title="Orders" value={orders.length.toString()} icon={ShoppingCart} color="bg-green-50 text-green-600" />
        <StatCard title="Revenue" value={formatPrice(totalRevenue)} icon={BarChart3} color="bg-amber-50 text-amber-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="font-serif text-xl mb-4">Recent Enquiries</h3>
          {enquiries.length === 0 ? (
            <p className="text-gray-400 text-sm">No enquiries yet</p>
          ) : (
            <div className="space-y-3">
              {enquiries.slice(-5).reverse().map(e => (
                <div key={e.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{e.brideName}</p>
                    <p className="text-xs text-gray-400">{new Date(e.createdAt).toLocaleDateString()}</p>
                  </div>
                  <StatusBadge status={e.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="font-serif text-xl mb-4">Recent Orders</h3>
          {orders.length === 0 ? (
            <p className="text-gray-400 text-sm">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {orders.slice(-5).reverse().map(o => (
                <div key={o.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{o.customerName}</p>
                    <p className="text-xs text-gray-400">{formatPrice(o.total)}</p>
                  </div>
                  <StatusBadge status={o.status} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
        <p className="text-sm text-amber-800">
          <strong>⚠️ Demo Mode:</strong> All data is stored in browser localStorage. In production, this would connect to a secure database (e.g., Supabase, Firebase) with proper authentication and data persistence.
        </p>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: { title: string; value: string; icon: any; color: string }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider">{title}</p>
          <p className="font-serif text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-purple-100 text-purple-700',
    consultation: 'bg-amber-100 text-amber-700',
    confirmed: 'bg-green-100 text-green-700',
    completed: 'bg-gray-100 text-gray-700',
    pending: 'bg-amber-100 text-amber-700',
    processing: 'bg-blue-100 text-blue-700',
    shipped: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700',
  };
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${colors[status] || 'bg-gray-100 text-gray-700'}`}>
      {status}
    </span>
  );
}

// ============ PRODUCTS TAB ============
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
      name: form.name,
      category: form.category,
      description: form.description,
      price: form.price,
      sizes: form.sizes.split(',').map(s => s.trim()).filter(Boolean),
      colors: form.colors.split(',').map(s => s.trim()).filter(Boolean),
      images: form.images.split(',').map(s => s.trim()).filter(Boolean),
      isPlaceholder: form.isPlaceholder,
      available: form.available,
      featured: form.featured,
    };

    if (editingId) {
      updateProduct(editingId, productData);
    } else {
      addProduct(productData);
    }
    setShowForm(false);
    setEditingId(null);
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
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this product?')) {
      deleteProduct(id);
      refresh();
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h2 className="font-serif text-xl sm:text-2xl">Products ({products.length})</h2>
        <button onClick={() => { setShowForm(true); setEditingId(null); setForm({ name: '', category: 'ready-to-wear', description: '', price: 0, sizes: '', colors: '', images: '', isPlaceholder: true, available: true, featured: false }); }}
          className="btn-black px-4 py-2 rounded-lg text-xs sm:text-sm flex items-center gap-2">
          <Plus size={16} /> Add Product
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 mb-6">
          <h3 className="font-serif text-xl mb-4">{editingId ? 'Edit Product' : 'Add New Product'}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-champagne-gold" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category *</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value as Category })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-champagne-gold">
                <option value="bridal-gowns">Bridal Gowns</option>
                <option value="reception-dresses">Reception Dresses</option>
                <option value="traditional-engagement">Traditional Engagement</option>
                <option value="ready-to-wear">Ready-to-Wear</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-champagne-gold resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price (₦) *</label>
              <input type="number" required value={form.price || ''} onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-champagne-gold" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sizes (comma-separated)</label>
              <input type="text" value={form.sizes} onChange={e => setForm({ ...form, sizes: e.target.value })}
                placeholder="XS, S, M, L, XL" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-champagne-gold" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Colors (comma-separated)</label>
              <input type="text" value={form.colors} onChange={e => setForm({ ...form, colors: e.target.value })}
                placeholder="Ivory, Gold, Nude" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-champagne-gold" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image URLs (comma-separated)</label>
              <input type="text" value={form.images} onChange={e => setForm({ ...form, images: e.target.value })}
                placeholder="https://..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-champagne-gold" />
            </div>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.isPlaceholder} onChange={e => setForm({ ...form, isPlaceholder: e.target.checked })} />
                Placeholder Image
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.available} onChange={e => setForm({ ...form, available: e.target.checked })} />
                Available
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
                Featured
              </label>
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" className="btn-black px-6 py-2 rounded-lg text-sm">
                {editingId ? 'Update' : 'Add'} Product
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }}
                className="border border-mid-gray px-6 py-2 rounded-lg text-sm hover:bg-light-gray">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Product</th>
                <th className="text-left px-4 py-3 font-medium">Category</th>
                <th className="text-left px-4 py-3 font-medium">Price</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-left px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-12 rounded bg-nude-light overflow-hidden flex-shrink-0">
                        {p.images[0] ? <img src={p.images[0]} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full placeholder-image" />}
                      </div>
                      <span className="font-medium truncate max-w-[200px]">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{getCategoryLabel(p.category)}</td>
                  <td className="px-4 py-3">{formatPrice(p.price)}</td>
                  <td className="px-4 py-3">
                    {p.available ? <span className="text-green-600 text-xs">Available</span> : <span className="text-red-500 text-xs">Sold Out</span>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(p)} className="p-1 hover:text-champagne-gold"><Edit size={16} /></button>
                      <button onClick={() => handleDelete(p.id)} className="p-1 hover:text-red-500"><Trash2 size={16} /></button>
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

// ============ ENQUIRIES TAB ============
function EnquiriesTab() {
  const [enquiries, setEnquiries] = useState(getEnquiries());
  const refresh = () => setEnquiries(getEnquiries());

  const handleStatusChange = (id: string, status: BridalEnquiry['status']) => {
    updateEnquiryStatus(id, status);
    refresh();
  };

  return (
    <div>
      <h2 className="font-serif text-2xl mb-6">Bridal Enquiries ({enquiries.length})</h2>
      {enquiries.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-gray-200 text-center">
          <Heart size={40} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-400">No bridal enquiries yet. They'll appear here when brides submit the enquiry form.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map(e => (
            <div key={e.id} className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-serif text-lg font-semibold">{e.brideName}</h3>
                  <p className="text-sm text-gray-500">{new Date(e.createdAt).toLocaleDateString()}</p>
                </div>
                <select value={e.status} onChange={ev => handleStatusChange(e.id, ev.target.value as BridalEnquiry['status'])}
                  className="border border-gray-200 rounded-lg px-3 py-1 text-sm">
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="consultation">Consultation</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div><span className="text-gray-500">Email:</span> {e.email}</div>
                <div><span className="text-gray-500">Phone:</span> {e.phone}</div>
                <div><span className="text-gray-500">Wedding Date:</span> {e.weddingDate || 'Not specified'}</div>
                <div><span className="text-gray-500">Style:</span> {e.preferredStyle || 'Not specified'}</div>
                <div><span className="text-gray-500">Budget:</span> {e.budget || 'Not specified'}</div>
                <div><span className="text-gray-500">Appointment:</span> {e.appointmentDate || 'Not requested'}</div>
              </div>
              {e.notes && <p className="mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg"><strong>Notes:</strong> {e.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============ ORDERS TAB ============
function OrdersTab() {
  const [orders, setOrders] = useState(getOrders());
  const refresh = () => setOrders(getOrders());

  const handleStatusChange = (id: string, status: Order['status']) => {
    updateOrderStatus(id, status);
    refresh();
  };

  return (
    <div>
      <h2 className="font-serif text-2xl mb-6">Orders ({orders.length})</h2>
      {orders.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-gray-200 text-center">
          <ShoppingCart size={40} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-400">No orders yet. Orders placed via WhatsApp checkout will appear here.</p>
          <p className="text-xs text-gray-400 mt-2">Note: In demo mode, orders are simulated. Real payment integration requires backend setup.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(o => (
            <div key={o.id} className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold">{o.customerName}</h3>
                  <p className="text-sm text-gray-500">{o.email} • {o.phone}</p>
                  <p className="text-xs text-gray-400">{new Date(o.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-serif text-lg text-champagne-gold">{formatPrice(o.total)}</p>
                  <select value={o.status} onChange={ev => handleStatusChange(o.id, ev.target.value as Order['status'])}
                    className="border border-gray-200 rounded-lg px-3 py-1 text-sm mt-1">
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-3">
                {o.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm py-1">
                    <span>{item.name} ({item.size}, {item.color}) x{item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
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

// ============ BRIDES TAB ============
function BridesTab() {
  const [brides, setBrides] = useState(getBrides());
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ brideName: '', image: '', weddingDate: '', dressStyle: '', testimonial: '', isPlaceholder: true });

  const refresh = () => setBrides(getBrides());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBride(form);
    setShowForm(false);
    setForm({ brideName: '', image: '', weddingDate: '', dressStyle: '', testimonial: '', isPlaceholder: true });
    refresh();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h2 className="font-serif text-xl sm:text-2xl">Brides Gallery ({brides.length})</h2>
        <button onClick={() => setShowForm(true)}
          className="btn-black px-4 py-2 rounded-lg text-xs sm:text-sm flex items-center gap-2">
          <Plus size={16} /> Add Bride
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 mb-6">
          <h3 className="font-serif text-xl mb-4">Add Bride to Gallery</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Bride Name / Label *</label>
              <input type="text" required value={form.brideName} onChange={e => setForm({ ...form, brideName: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Wedding Date/Year</label>
              <input type="text" value={form.weddingDate} onChange={e => setForm({ ...form, weddingDate: e.target.value })}
                placeholder="e.g., 2024" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Dress Style</label>
              <input type="text" value={form.dressStyle} onChange={e => setForm({ ...form, dressStyle: e.target.value })}
                placeholder="e.g., Custom Bridal Gown" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Photo URL</label>
              <input type="text" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })}
                placeholder="https://..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Testimonial (optional)</label>
              <textarea rows={2} value={form.testimonial} onChange={e => setForm({ ...form, testimonial: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none" />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.isPlaceholder} onChange={e => setForm({ ...form, isPlaceholder: e.target.checked })} />
              Mark as placeholder (no real photo yet)
            </label>
            <div className="flex gap-3">
              <button type="submit" className="btn-black px-6 py-2 rounded-lg text-sm">Add Bride</button>
              <button type="button" onClick={() => setShowForm(false)} className="border border-mid-gray px-6 py-2 rounded-lg text-sm hover:bg-light-gray">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {brides.map(b => (
          <div key={b.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="aspect-[3/4] bg-nude-light">
              {b.image ? (
                <img src={b.image} alt={b.brideName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full placeholder-image flex items-center justify-center">
                  <span className="text-gray-400 text-sm">No photo</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-serif font-semibold">{b.brideName}</h3>
              <p className="text-xs text-gray-500">{b.dressStyle} • {b.weddingDate}</p>
              {b.isPlaceholder && <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded mt-1 inline-block">Placeholder</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
