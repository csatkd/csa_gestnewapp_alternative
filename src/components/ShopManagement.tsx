import { useState } from 'react';
import { ShoppingCart, Package, DollarSign, TrendingUp, Plus, Edit2, Eye, Search, Filter } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: 'dobok' | 'protection' | 'accessoire' | 'equipement';
  description: string;
  price: number;
  stock: number;
  image?: string;
  sizes?: string[];
  colors?: string[];
  featured: boolean;
  active: boolean;
}

interface Order {
  id: string;
  memberId: string;
  memberName: string;
  items: { productId: string; productName: string; quantity: number; price: number; size?: string }[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
  paymentMethod: 'cash' | 'mobile_money' | 'bank';
  notes?: string;
}

const mockProducts: Product[] = [
  {
    id: 'P001',
    name: 'Dobok Blanc Standard',
    category: 'dobok',
    description: 'Dobok officiel CSA en coton de haute qualité. Idéal pour l\'entraînement quotidien.',
    price: 25000,
    stock: 45,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Blanc'],
    featured: true,
    active: true
  },
  {
    id: 'P002',
    name: 'Dobok Compétition Premium',
    category: 'dobok',
    description: 'Dobok de compétition en tissu technique respirant. Coupe ajustée pour la performance.',
    price: 45000,
    stock: 20,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blanc'],
    featured: true,
    active: true
  },
  {
    id: 'P003',
    name: 'Plastron Électronique WT',
    category: 'protection',
    description: 'Plastron électronique homologué World Taekwondo pour la compétition.',
    price: 85000,
    stock: 8,
    sizes: ['S', 'M', 'L'],
    colors: ['Bleu', 'Rouge'],
    featured: true,
    active: true
  },
  {
    id: 'P004',
    name: 'Casque de Protection',
    category: 'protection',
    description: 'Casque de protection homologué pour le combat. Mousse haute densité.',
    price: 35000,
    stock: 15,
    sizes: ['S', 'M', 'L'],
    colors: ['Bleu', 'Rouge', 'Blanc'],
    featured: false,
    active: true
  },
  {
    id: 'P005',
    name: 'Protège-Tibias',
    category: 'protection',
    description: 'Protège-tibias en mousse avec sangles ajustables. Confort optimal.',
    price: 12000,
    stock: 30,
    sizes: ['S', 'M', 'L'],
    colors: ['Noir', 'Blanc'],
    featured: false,
    active: true
  },
  {
    id: 'P006',
    name: 'Gants de Combat',
    category: 'protection',
    description: 'Gants de combat homologués pour la compétition.',
    price: 15000,
    stock: 25,
    sizes: ['S', 'M', 'L'],
    colors: ['Bleu', 'Rouge'],
    featured: false,
    active: true
  },
  {
    id: 'P007',
    name: 'Ceinture Officielle',
    category: 'accessoire',
    description: 'Ceinture officielle CSA selon votre grade. Qualité premium.',
    price: 8000,
    stock: 50,
    sizes: ['220cm', '240cm', '260cm', '280cm'],
    colors: ['Blanche', 'Jaune', 'Orange', 'Verte', 'Bleue', 'Rouge', 'Noire'],
    featured: true,
    active: true
  },
  {
    id: 'P008',
    name: 'Sac de Sport CSA',
    category: 'accessoire',
    description: 'Sac de sport officiel CSA avec logo brodé. Compartiments multiples.',
    price: 18000,
    stock: 20,
    colors: ['Noir', 'Bleu'],
    featured: false,
    active: true
  },
  {
    id: 'P009',
    name: 'Gourde Sport 750ml',
    category: 'accessoire',
    description: 'Gourde isotherme avec logo CSA. Garde vos boissons fraîches.',
    price: 5000,
    stock: 40,
    colors: ['Bleu', 'Noir'],
    featured: false,
    active: true
  },
  {
    id: 'P010',
    name: 'Kit de Casses',
    category: 'equipement',
    description: 'Lot de 10 planches de casse pour l\'entraînement. Différentes épaisseurs.',
    price: 15000,
    stock: 12,
    featured: false,
    active: true
  }
];

const mockOrders: Order[] = [
  {
    id: 'ORD001',
    memberId: 'M001',
    memberName: 'Kouassi Aya Marie',
    items: [
      { productId: 'P001', productName: 'Dobok Blanc Standard', quantity: 1, price: 25000, size: 'M' },
      { productId: 'P007', productName: 'Ceinture Officielle', quantity: 1, price: 8000, size: '240cm' }
    ],
    total: 33000,
    status: 'delivered',
    orderDate: '2024-12-01',
    deliveryDate: '2024-12-05',
    paymentMethod: 'mobile_money'
  },
  {
    id: 'ORD002',
    memberId: 'M002',
    memberName: 'Traoré Moussa',
    items: [
      { productId: 'P002', productName: 'Dobok Compétition Premium', quantity: 1, price: 45000, size: 'L' },
      { productId: 'P003', productName: 'Plastron Électronique WT', quantity: 1, price: 85000, size: 'L' }
    ],
    total: 130000,
    status: 'shipped',
    orderDate: '2024-12-10',
    paymentMethod: 'bank',
    notes: 'Livraison urgente avant compétition'
  },
  {
    id: 'ORD003',
    memberId: 'M003',
    memberName: 'Bamba Fatoumata',
    items: [
      { productId: 'P005', productName: 'Protège-Tibias', quantity: 1, price: 12000, size: 'S' },
      { productId: 'P006', productName: 'Gants de Combat', quantity: 1, price: 15000, size: 'S' }
    ],
    total: 27000,
    status: 'confirmed',
    orderDate: '2024-12-15',
    paymentMethod: 'cash'
  },
  {
    id: 'ORD004',
    memberId: 'M004',
    memberName: 'Koné Ibrahim',
    items: [
      { productId: 'P008', productName: 'Sac de Sport CSA', quantity: 1, price: 18000 },
      { productId: 'P009', productName: 'Gourde Sport 750ml', quantity: 2, price: 10000 }
    ],
    total: 28000,
    status: 'pending',
    orderDate: '2024-12-18',
    paymentMethod: 'mobile_money'
  }
];

export default function ShopManagement() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = filterCategory === 'all' || p.category === filterCategory;
    return matchSearch && matchCategory && p.active;
  });

  // Statistics
  const totalProducts = products.filter(p => p.active).length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'confirmed').length;

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'dobok': return '🥋 Doboks';
      case 'protection': return '🛡️ Protections';
      case 'accessoire': return '🎒 Accessoires';
      case 'equipement': return '⚙️ Équipements';
      default: return category;
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'confirmed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'shipped': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'delivered': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getOrderStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'confirmed': return 'Confirmée';
      case 'shipped': return 'Expédiée';
      case 'delivered': return 'Livrée';
      case 'cancelled': return 'Annulée';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Boutique CSA</h2>
          <p className="text-slate-400 text-sm">Gestion des produits et commandes</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          Ajouter un Produit
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-5 border border-blue-500/20">
          <div className="flex items-center justify-between mb-3">
            <Package className="w-8 h-8 text-blue-400" />
            <span className="text-blue-400 text-xs font-medium bg-blue-500/20 px-2 py-1 rounded">Total</span>
          </div>
          <p className="text-slate-400 text-sm">Produits Actifs</p>
          <p className="text-3xl font-bold text-white mt-1">{totalProducts}</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-xl p-5 border border-emerald-500/20">
          <div className="flex items-center justify-between mb-3">
            <ShoppingCart className="w-8 h-8 text-emerald-400" />
            <span className="text-emerald-400 text-xs font-medium bg-emerald-500/20 px-2 py-1 rounded">Stock</span>
          </div>
          <p className="text-slate-400 text-sm">Unités en Stock</p>
          <p className="text-3xl font-bold text-white mt-1">{totalStock}</p>
        </div>

        <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-xl p-5 border border-amber-500/20">
          <div className="flex items-center justify-between mb-3">
            <DollarSign className="w-8 h-8 text-amber-400" />
            <span className="text-amber-400 text-xs font-medium bg-amber-500/20 px-2 py-1 rounded">Total</span>
          </div>
          <p className="text-slate-400 text-sm">Chiffre d'Affaires</p>
          <p className="text-3xl font-bold text-white mt-1">{(totalRevenue / 1000).toFixed(0)}K F</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl p-5 border border-purple-500/20">
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="w-8 h-8 text-purple-400" />
            <span className="text-purple-400 text-xs font-medium bg-purple-500/20 px-2 py-1 rounded">En cours</span>
          </div>
          <p className="text-slate-400 text-sm">Commandes en Cours</p>
          <p className="text-3xl font-bold text-white mt-1">{pendingOrders}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'products'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          Produits
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'orders'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          Commandes ({orders.length})
        </button>
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="all">Toutes catégories</option>
              <option value="dobok">Doboks</option>
              <option value="protection">Protections</option>
              <option value="accessoire">Accessoires</option>
              <option value="equipement">Équipements</option>
            </select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden hover:border-emerald-500/30 transition-all cursor-pointer group"
                onClick={() => setSelectedProduct(product)}
              >
                {/* Product Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                  <Package className="w-16 h-16 text-slate-600" />
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-white font-semibold group-hover:text-emerald-400 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-slate-400 text-xs mt-1">{getCategoryLabel(product.category)}</p>
                    </div>
                    {product.featured && (
                      <span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded text-xs">⭐ Vedette</span>
                    )}
                  </div>

                  <p className="text-slate-400 text-sm line-clamp-2">{product.description}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                    <div>
                      <p className="text-2xl font-bold text-emerald-400">{product.price.toLocaleString()}</p>
                      <p className="text-slate-500 text-xs">FCFA</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${product.stock > 10 ? 'text-emerald-400' : product.stock > 0 ? 'text-amber-400' : 'text-red-400'}`}>
                        {product.stock}
                      </p>
                      <p className="text-slate-500 text-xs">en stock</p>
                    </div>
                  </div>

                  {product.sizes && (
                    <div className="flex flex-wrap gap-1">
                      {product.sizes.map((size, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-slate-700/50 rounded text-xs text-slate-400">
                          {size}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Commande</th>
                  <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Client</th>
                  <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Articles</th>
                  <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Total</th>
                  <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Statut</th>
                  <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                    <td className="px-4 py-3">
                      <span className="text-white font-medium">{order.id}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-300 text-sm">{order.memberName}</td>
                    <td className="px-4 py-3">
                      <div className="text-sm">
                        <p className="text-slate-300">{order.items.length} article(s)</p>
                        <p className="text-slate-500 text-xs">{order.items.map(i => i.productName).join(', ')}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-emerald-400 font-bold">{order.total.toLocaleString()} F</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs border ${getOrderStatusColor(order.status)}`}>
                        {getOrderStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-sm">
                      {new Date(order.orderDate).toLocaleDateString('fr-FR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedProduct(null)}>
          <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedProduct.name}</h2>
                  <p className="text-slate-400 mt-1">{getCategoryLabel(selectedProduct.category)}</p>
                </div>
                <button onClick={() => setSelectedProduct(null)} className="text-slate-400 hover:text-white text-2xl">&times;</button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h4 className="text-emerald-400 font-semibold text-sm mb-2">Description</h4>
                <p className="text-slate-300">{selectedProduct.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <p className="text-slate-400 text-xs">Prix</p>
                  <p className="text-2xl font-bold text-emerald-400">{selectedProduct.price.toLocaleString()} FCFA</p>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <p className="text-slate-400 text-xs">Stock</p>
                  <p className={`text-2xl font-bold ${selectedProduct.stock > 10 ? 'text-emerald-400' : selectedProduct.stock > 0 ? 'text-amber-400' : 'text-red-400'}`}>
                    {selectedProduct.stock} unités
                  </p>
                </div>
              </div>
              {selectedProduct.sizes && (
                <div>
                  <h4 className="text-emerald-400 font-semibold text-sm mb-2">Tailles disponibles</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.sizes.map((size, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-slate-700 rounded-lg text-sm text-slate-300">
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {selectedProduct.colors && (
                <div>
                  <h4 className="text-emerald-400 font-semibold text-sm mb-2">Couleurs disponibles</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.colors.map((color, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-slate-700 rounded-lg text-sm text-slate-300">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
