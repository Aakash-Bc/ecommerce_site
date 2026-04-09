import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Tabs, Badge, Modal, TextInput, NumberInput, Select, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  IconLayoutDashboard, IconPackage, IconShoppingCart, IconUsers,
  IconTag, IconPlus, IconEdit, IconTrash, IconTrendingUp,
  IconCurrencyRupee, IconEye, IconLogout,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { products as initialProducts } from '../data/products';
import { formatPrice } from '../utils/helpers';
import { useAuth } from '../context/AuthContext';

const mockOrders = [
  { id: 'TRZ001', customer: 'Rahul Thapa', items: 3, total: 8499, status: 'Delivered', date: '2026-04-01' },
  { id: 'TRZ002', customer: 'Priya Sharma', items: 1, total: 3574, status: 'Processing', date: '2026-04-05' },
  { id: 'TRZ003', customer: 'Bikash Rai', items: 2, total: 12248, status: 'Shipped', date: '2026-04-07' },
  { id: 'TRZ004', customer: 'Anita Gurung', items: 4, total: 5999, status: 'Pending', date: '2026-04-08' },
  { id: 'TRZ005', customer: 'Deepak Shrestha', items: 1, total: 4399, status: 'Delivered', date: '2026-04-09' },
];

const statusColor = { Delivered: 'green', Processing: 'blue', Shipped: 'orange', Pending: 'yellow', Cancelled: 'red' };

const stats = [
  { label: 'Total Revenue', value: 'Rs. 4,82,500', icon: IconCurrencyRupee, change: '+12%', color: 'bg-green-50 text-green-600' },
  { label: 'Total Orders', value: '1,248', icon: IconShoppingCart, change: '+8%', color: 'bg-blue-50 text-blue-600' },
  { label: 'Products', value: '30', icon: IconPackage, change: '+3', color: 'bg-purple-50 text-purple-600' },
  { label: 'Customers', value: '856', icon: IconUsers, change: '+24', color: 'bg-orange-50 text-orange-600' },
];

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState(initialProducts);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editProduct, setEditProduct] = useState(null);
  const [addOpen, { open: openAdd, close: closeAdd }] = useDisclosure(false);
  const [deleteId, setDeleteId] = useState(null);

  const form = useForm({
    initialValues: {
      title: '', brand: '', category: 'men', originalPrice: 0,
      discountPercentage: 0, stock: 0, description: '', offerTag: '',
    },
  });

  const handleSave = (values) => {
    const finalPrice = Math.round(values.originalPrice * (1 - values.discountPercentage / 100));
    if (editProduct) {
      setProducts(prev => prev.map(p => p.id === editProduct.id ? { ...p, ...values, finalPrice } : p));
    } else {
      setProducts(prev => [...prev, { ...values, id: Date.now(), finalPrice, sizes: ['S','M','L'], colors: ['Black'], rating: 4.0, reviews: 0, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80', gender: values.category }]);
    }
    closeAdd();
    setEditProduct(null);
    form.reset();
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    form.setValues({ title: product.title, brand: product.brand, category: product.category, originalPrice: product.originalPrice, discountPercentage: product.discountPercentage, stock: product.stock, description: product.description, offerTag: product.offerTag || '' });
    openAdd();
  };

  const handleDelete = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1a2e] text-white flex flex-col fixed h-full z-40 hidden lg:flex">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#e94560] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="font-heading text-lg font-bold">Trendz Admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: IconLayoutDashboard },
            { id: 'products', label: 'Products', icon: IconPackage },
            { id: 'orders', label: 'Orders', icon: IconShoppingCart },
            { id: 'customers', label: 'Customers', icon: IconUsers },
            { id: 'offers', label: 'Offers', icon: IconTag },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id ? 'bg-[#e94560] text-white' : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-white/10 hover:text-white transition-all"
          >
            <IconLogout size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 lg:ml-64 p-6">
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div>
            <h1 className="font-heading text-2xl font-bold text-[#1a1a2e] mb-6">Dashboard Overview</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                      <s.icon size={20} />
                    </div>
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{s.change}</span>
                  </div>
                  <p className="text-2xl font-bold text-[#1a1a2e]">{s.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">Recent Orders</h2>
                <button onClick={() => setActiveTab('orders')} className="text-sm text-[#e94560] hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      {['Order ID','Customer','Items','Total','Status','Date'].map(h => (
                        <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {mockOrders.map(order => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3.5 font-mono font-semibold text-[#1a1a2e]">{order.id}</td>
                        <td className="px-5 py-3.5 text-gray-700">{order.customer}</td>
                        <td className="px-5 py-3.5 text-gray-500">{order.items}</td>
                        <td className="px-5 py-3.5 font-semibold text-gray-900">{formatPrice(order.total)}</td>
                        <td className="px-5 py-3.5">
                          <Badge color={statusColor[order.status]} variant="light" size="sm">{order.status}</Badge>
                        </td>
                        <td className="px-5 py-3.5 text-gray-500">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Products */}
        {activeTab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-heading text-2xl font-bold text-[#1a1a2e]">Products ({products.length})</h1>
              <button
                onClick={() => { setEditProduct(null); form.reset(); openAdd(); }}
                className="flex items-center gap-2 bg-[#e94560] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#c73652] transition-colors"
              >
                <IconPlus size={16} /> Add Product
              </button>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      {['Product','Brand','Category','Price','Discount','Stock','Tag','Actions'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img src={p.image} alt={p.title} className="w-10 h-12 rounded-lg object-cover bg-gray-100" />
                            <span className="font-medium text-gray-900 line-clamp-1 max-w-[150px]">{p.title}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-500">{p.brand}</td>
                        <td className="px-4 py-3 capitalize text-gray-500">{p.category}</td>
                        <td className="px-4 py-3 font-semibold text-gray-900">{formatPrice(p.finalPrice)}</td>
                        <td className="px-4 py-3"><Badge color="red" variant="light" size="sm">{p.discountPercentage}%</Badge></td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-semibold ${p.stock > 10 ? 'text-green-600' : p.stock > 0 ? 'text-orange-500' : 'text-red-500'}`}>
                            {p.stock}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {p.offerTag && <Badge color="blue" variant="light" size="xs">{p.offerTag}</Badge>}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button onClick={() => handleEdit(p)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                              <IconEdit size={14} />
                            </button>
                            <button onClick={() => setDeleteId(p.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                              <IconTrash size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Orders */}
        {activeTab === 'orders' && (
          <div>
            <h1 className="font-heading text-2xl font-bold text-[#1a1a2e] mb-6">Orders</h1>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      {['Order ID','Customer','Items','Total','Status','Date','Action'].map(h => (
                        <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {mockOrders.map(order => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-5 py-4 font-mono font-semibold text-[#1a1a2e]">{order.id}</td>
                        <td className="px-5 py-4 text-gray-700">{order.customer}</td>
                        <td className="px-5 py-4 text-gray-500">{order.items}</td>
                        <td className="px-5 py-4 font-semibold">{formatPrice(order.total)}</td>
                        <td className="px-5 py-4"><Badge color={statusColor[order.status]} variant="light">{order.status}</Badge></td>
                        <td className="px-5 py-4 text-gray-500">{order.date}</td>
                        <td className="px-5 py-4">
                          <button className="text-[#e94560] hover:underline text-xs font-semibold">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Customers */}
        {activeTab === 'customers' && (
          <div>
            <h1 className="font-heading text-2xl font-bold text-[#1a1a2e] mb-6">Customers</h1>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
              <IconUsers size={48} className="text-gray-200 mx-auto mb-3" />
              <p className="text-gray-500">Customer management coming soon</p>
            </div>
          </div>
        )}

        {/* Offers */}
        {activeTab === 'offers' && (
          <div>
            <h1 className="font-heading text-2xl font-bold text-[#1a1a2e] mb-6">Offers & Coupons</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { code: 'DASHAIN20', type: '20% Off', desc: 'Dashain Festival Sale', min: 'Rs. 2000', expiry: '15 Oct 2026', active: true },
                { code: 'FLAT500', type: 'Rs. 500 Off', desc: 'Flat discount on orders', min: 'Rs. 3000', expiry: '31 Dec 2026', active: true },
                { code: 'SUMMER30', type: '30% Off', desc: 'Summer Sale', min: 'Rs. 1000', expiry: '30 Jun 2026', active: true },
                { code: 'FREESHIP', type: 'Free Shipping', desc: 'Free shipping on all orders', min: 'No minimum', expiry: '31 Dec 2026', active: true },
                { code: 'BOGO', type: 'Buy 1 Get 1', desc: 'Selected items only', min: 'Rs. 1999', expiry: '31 May 2026', active: false },
                { code: 'NEWYEAR15', type: '15% Off', desc: 'New Year Sale', min: 'Rs. 1500', expiry: '31 Jan 2026', active: false },
              ].map((offer, i) => (
                <div key={i} className={`bg-white rounded-2xl p-5 border-2 shadow-sm ${offer.active ? 'border-green-200' : 'border-gray-100 opacity-60'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono font-bold text-[#1a1a2e] text-lg">{offer.code}</span>
                    <Badge color={offer.active ? 'green' : 'gray'} variant="light" size="sm">{offer.active ? 'Active' : 'Expired'}</Badge>
                  </div>
                  <p className="text-[#e94560] font-bold text-sm mb-1">{offer.type}</p>
                  <p className="text-gray-500 text-xs mb-3">{offer.desc}</p>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Min: {offer.min}</span>
                    <span>Expires: {offer.expiry}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Add/Edit Product Modal */}
      <Modal
        opened={addOpen}
        onClose={() => { closeAdd(); setEditProduct(null); form.reset(); }}
        title={<span className="font-semibold">{editProduct ? 'Edit Product' : 'Add New Product'}</span>}
        size="lg"
        radius="lg"
      >
        <form onSubmit={form.onSubmit(handleSave)} className="space-y-4">
          <TextInput label="Product Title" required {...form.getInputProps('title')} />
          <div className="grid grid-cols-2 gap-4">
            <TextInput label="Brand" required {...form.getInputProps('brand')} />
            <Select label="Category" data={['men','women','kids']} required {...form.getInputProps('category')} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <NumberInput label="Original Price (Rs.)" min={0} required {...form.getInputProps('originalPrice')} />
            <NumberInput label="Discount %" min={0} max={90} required {...form.getInputProps('discountPercentage')} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <NumberInput label="Stock" min={0} required {...form.getInputProps('stock')} />
            <TextInput label="Offer Tag" placeholder="e.g. Bestseller" {...form.getInputProps('offerTag')} />
          </div>
          <Textarea label="Description" rows={3} {...form.getInputProps('description')} />
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => { closeAdd(); setEditProduct(null); form.reset(); }} className="flex-1 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="flex-1 bg-[#e94560] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#c73652] transition-colors">
              {editProduct ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal opened={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Product?" size="sm" radius="lg" centered>
        <p className="text-gray-600 text-sm mb-5">This action cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold">Cancel</button>
          <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-red-600">Delete</button>
        </div>
      </Modal>
    </div>
  );
}
