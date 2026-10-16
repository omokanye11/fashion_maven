import { v4 as uuidv4 } from 'uuid';

// ============ TYPES ============
export type Category = 'bridal-gowns' | 'reception-dresses' | 'traditional-engagement' | 'ready-to-wear';

export interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: string[];
  isPlaceholder: boolean;
  available: boolean;
  featured: boolean;
  createdAt: string;
}

export interface BridalEnquiry {
  id: string;
  brideName: string;
  email: string;
  phone: string;
  weddingDate: string;
  preferredStyle: string;
  budget: string;
  notes: string;
  appointmentDate?: string;
  status: 'new' | 'contacted' | 'consultation' | 'confirmed' | 'completed';
  createdAt: string;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  items: { productId: string; name: string; size: string; color: string; price: number; quantity: number }[];
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered';
  paymentMethod: string;
  createdAt: string;
}

export interface BrideGallery {
  id: string;
  brideName: string;
  image: string;
  weddingDate: string;
  dressStyle: string;
  testimonial?: string;
  isPlaceholder: boolean;
}

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

// ============ IMAGE URLS ============
export const IMAGES = {
  hero: 'https://image.qwenlm.ai/generated-images/cf1568aa-835a-403b-bc41-547226cb2a08/_result.png',
  collection: 'https://image.qwenlm.ai/generated-images/db695762-b6c8-4dfa-9512-635ce33444d3/_result.png',
  bride1: 'https://image.qwenlm.ai/generated-images/7b82be19-607e-4ad8-aa37-7d7c626e7b38/_result.png',
  traditional: 'https://image.qwenlm.ai/generated-images/d42b0abb-ca8c-4c4f-971e-de472d4e8ce2/_result.png',
  atelier: 'https://image.qwenlm.ai/generated-images/5c11f5f0-cf10-4afd-98ac-662035bdb80a/_result.png',
};

// ============ DEFAULT DATA ============
const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'The Empress Bridal Gown',
    category: 'bridal-gowns',
    description: 'A breathtaking ivory silk gown with hand-sewn lace appliqué and a dramatic cathedral train. Each detail is crafted to perfection for your most special day.',
    price: 850000,
    sizes: ['UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16', 'Custom'],
    colors: ['Ivory', 'Champagne'],
    images: [IMAGES.hero],
    isPlaceholder: false,
    available: true,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'The Royal Reception Dress',
    category: 'reception-dresses',
    description: 'An elegant champagne gold reception dress with delicate beadwork and a flattering A-line silhouette. Perfect for your celebration.',
    price: 450000,
    sizes: ['UK 8', 'UK 10', 'UK 12', 'UK 14', 'Custom'],
    colors: ['Champagne', 'Gold'],
    images: [IMAGES.collection],
    isPlaceholder: false,
    available: true,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Traditional Engagement Ensemble',
    category: 'traditional-engagement',
    description: 'A stunning traditional Nigerian engagement outfit featuring luxurious gold fabric with intricate embroidery and modern tailoring.',
    price: 350000,
    sizes: ['UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16', 'Custom'],
    colors: ['Gold', 'Ivory', 'Coral'],
    images: [IMAGES.traditional],
    isPlaceholder: false,
    available: true,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Ivory Lace Mermaid Gown',
    category: 'bridal-gowns',
    description: 'A figure-hugging mermaid silhouette in delicate ivory lace with illusion neckline and subtle sparkle detail.',
    price: 750000,
    sizes: ['UK 8', 'UK 10', 'UK 12', 'UK 14', 'Custom'],
    colors: ['Ivory'],
    images: [],
    isPlaceholder: true,
    available: true,
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Silk Wrap Evening Dress',
    category: 'ready-to-wear',
    description: 'A sophisticated silk wrap dress in soft nude tones. Versatile elegance for any special occasion.',
    price: 120000,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Nude', 'Black', 'Ivory'],
    images: [],
    isPlaceholder: true,
    available: true,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Embroidered Cocktail Dress',
    category: 'ready-to-wear',
    description: 'A stunning cocktail dress with hand-embroidered details and a flattering midi length. Made for making entrances.',
    price: 180000,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Champagne', 'Nude'],
    images: [],
    isPlaceholder: true,
    available: true,
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Ball Gown with Crystal Detail',
    category: 'bridal-gowns',
    description: 'A dreamlike ball gown adorned with hand-placed crystal beading and layers of soft tulle. A true fairytale dress.',
    price: 950000,
    sizes: ['UK 8', 'UK 10', 'UK 12', 'UK 14', 'Custom'],
    colors: ['Ivory', 'White'],
    images: [],
    isPlaceholder: true,
    available: true,
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Ankara Fusion Gown',
    category: 'traditional-engagement',
    description: 'A modern take on traditional Nigerian fashion, blending Ankara prints with contemporary silhouettes for a unique engagement look.',
    price: 280000,
    sizes: ['UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16', 'Custom'],
    colors: ['Multi', 'Gold', 'Burgundy'],
    images: [],
    isPlaceholder: true,
    available: true,
    featured: false,
    createdAt: new Date().toISOString(),
  },
];

const defaultBrides: BrideGallery[] = [
  {
    id: '1',
    brideName: 'Bride Sample 1',
    image: IMAGES.bride1,
    weddingDate: '2024',
    dressStyle: 'Custom Bridal Gown',
    testimonial: undefined,
    isPlaceholder: true,
  },
  {
    id: '2',
    brideName: 'Bride Sample 2',
    image: '',
    weddingDate: '2024',
    dressStyle: 'Traditional Engagement',
    testimonial: undefined,
    isPlaceholder: true,
  },
  {
    id: '3',
    brideName: 'Bride Sample 3',
    image: '',
    weddingDate: '2023',
    dressStyle: 'Reception Dress',
    testimonial: undefined,
    isPlaceholder: true,
  },
];

// ============ STORE FUNCTIONS ============
const STORAGE_KEYS = {
  products: 'fm_products',
  enquiries: 'fm_enquiries',
  orders: 'fm_orders',
  brides: 'fm_brides',
  adminAuth: 'fm_admin_auth',
};

function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error('Error reading from storage:', e);
  }
  return defaultValue;
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Error saving to storage:', e);
  }
}

// Products
export function getProducts(): Product[] {
  return getFromStorage(STORAGE_KEYS.products, defaultProducts);
}

export function saveProducts(products: Product[]): void {
  saveToStorage(STORAGE_KEYS.products, products);
}

export function addProduct(product: Omit<Product, 'id' | 'createdAt'>): Product {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>): void {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updates };
    saveProducts(products);
  }
}

export function deleteProduct(id: string): void {
  const products = getProducts().filter(p => p.id !== id);
  saveProducts(products);
}

// Enquiries
export function getEnquiries(): BridalEnquiry[] {
  return getFromStorage(STORAGE_KEYS.enquiries, []);
}

export function addEnquiry(enquiry: Omit<BridalEnquiry, 'id' | 'createdAt' | 'status'>): BridalEnquiry {
  const enquiries = getEnquiries();
  const newEnquiry: BridalEnquiry = {
    ...enquiry,
    id: uuidv4(),
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  enquiries.push(newEnquiry);
  saveToStorage(STORAGE_KEYS.enquiries, enquiries);
  return newEnquiry;
}

export function updateEnquiryStatus(id: string, status: BridalEnquiry['status']): void {
  const enquiries = getEnquiries();
  const index = enquiries.findIndex(e => e.id === id);
  if (index !== -1) {
    enquiries[index].status = status;
    saveToStorage(STORAGE_KEYS.enquiries, enquiries);
  }
}

// Orders
export function getOrders(): Order[] {
  return getFromStorage(STORAGE_KEYS.orders, []);
}

export function addOrder(order: Omit<Order, 'id' | 'createdAt' | 'status'>): Order {
  const orders = getOrders();
  const newOrder: Order = {
    ...order,
    id: uuidv4(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  orders.push(newOrder);
  saveToStorage(STORAGE_KEYS.orders, orders);
  return newOrder;
}

export function updateOrderStatus(id: string, status: Order['status']): void {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === id);
  if (index !== -1) {
    orders[index].status = status;
    saveToStorage(STORAGE_KEYS.orders, orders);
  }
}

// Brides Gallery
export function getBrides(): BrideGallery[] {
  return getFromStorage(STORAGE_KEYS.brides, defaultBrides);
}

export function saveBrides(brides: BrideGallery[]): void {
  saveToStorage(STORAGE_KEYS.brides, brides);
}

export function addBride(bride: Omit<BrideGallery, 'id'>): BrideGallery {
  const brides = getBrides();
  const newBride: BrideGallery = { ...bride, id: uuidv4() };
  brides.push(newBride);
  saveBrides(brides);
  return newBride;
}

// Admin Auth (simple demo - NOT secure for production)
export function isAdminLoggedIn(): boolean {
  return getFromStorage(STORAGE_KEYS.adminAuth, false);
}

export function adminLogin(password: string): boolean {
  // Demo password - in production, use proper authentication
  if (password === 'fashionmaven2024') {
    saveToStorage(STORAGE_KEYS.adminAuth, true);
    return true;
  }
  return false;
}

export function adminLogout(): void {
  saveToStorage(STORAGE_KEYS.adminAuth, false);
}

// Utility
export function formatPrice(price: number): string {
  return `₦${price.toLocaleString()}`;
}

export function getCategoryLabel(category: Category): string {
  const labels: Record<Category, string> = {
    'bridal-gowns': 'Bridal Gowns',
    'reception-dresses': 'Reception Dresses',
    'traditional-engagement': 'Traditional Engagement',
    'ready-to-wear': 'Ready-to-Wear',
  };
  return labels[category];
}
