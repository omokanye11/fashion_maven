import { HashRouter, Routes, Route } from 'react-router-dom';
import { CartProvider, Navbar, Footer } from './components/Layout';
import Home from './pages/Home';
import BridalCouture from './pages/BridalCouture';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import OurBrides from './pages/OurBrides';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

function App() {
  return (
    <HashRouter>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/bridal" element={<BridalCouture />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:id" element={<ProductDetail />} />
              <Route path="/our-brides" element={<OurBrides />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </HashRouter>
  );
}

export default App;
