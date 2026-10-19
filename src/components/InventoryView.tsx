import { useState } from 'react';
import { Package, AlertTriangle, TrendingDown, TrendingUp, Edit2, Save, X, ShoppingCart } from 'lucide-react';
import { mockInventory } from '../data/mockData';
import { InventoryItem } from '../types';

export default function InventoryView() {
  const [items, setItems] = useState<InventoryItem[]>(mockInventory);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<InventoryItem>>({});
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderItem, setOrderItem] = useState<InventoryItem | null>(null);
  const [orderQuantity, setOrderQuantity] = useState(0);

  const criticalItems = items.filter(i => i.stock <= i.minStock);
  const lowItems = items.filter(i => i.stock > i.minStock && i.stock <= i.minStock * 1.5);
  const totalValue = items.reduce((s, i) => s + i.stock * i.unitPrice, 0);

  const startEdit = (item: InventoryItem) => {
    setEditingId(item.id);
    setEditValues({ stock: item.stock, minStock: item.minStock, maxStock: item.maxStock });
  };

  const saveEdit = () => {
    if (!editingId) return;
    setItems(items.map(i => i.id === editingId ? { ...i, ...editValues } : i));
    setEditingId(null);
    setEditValues({});
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({});
  };

  const getStatusBadge = (item: InventoryItem) => {
    if (item.stock <= item.minStock) {
      return <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1"><AlertTriangle className="w-3 h-3" />Critique</span>;
    }
    if (item.stock <= item.minStock * 1.5) {
      return <span className="bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full text-xs font-medium">Bas</span>;
    }
    return <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full text-xs font-medium">OK</span>;
  };

  const getStockLevel = (item: InventoryItem) => {
    return (item.stock / item.maxStock) * 100;
  };

  const simulateOrder = () => {
    if (!orderItem || orderQuantity <= 0) return;
    const cost = orderQuantity * orderItem.unitPrice;
    alert(`Commande simulée:\n${orderQuantity} x ${orderItem.name}\nCoût total: ${cost.toLocaleString()} FCFA\n\nFournisseur contacté avec succès!`);
    setShowOrderModal(false);
    setOrderQuantity(0);
    setOrderItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Gestion des Stocks</h2>
          <p className="text-slate-400 text-sm">Inventaire des équipements de combat et d'entraînement</p>
        </div>
        <button
          onClick={() => setShowOrderModal(true)}
          className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <ShoppingCart className="w-4 h-4" />
          Commander
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-2 rounded-lg"><Package className="w-5 h-5 text-blue-400" /></div>
            <div>
              <p className="text-slate-400 text-xs">Articles en Stock</p>
              <p className="text-white font-bold">{items.reduce((s, i) => s + i.stock, 0)}</p>
            </div>
          </div>
        </div>
        <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
          <div className="flex items-center gap-3">
            <div className="bg-red-500/20 p-2 rounded-lg"><AlertTriangle className="w-5 h-5 text-red-400" /></div>
            <div>
              <p className="text-red-400 text-xs">Stocks Critiques</p>
              <p className="text-red-400 font-bold">{criticalItems.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500/20 p-2 rounded-lg"><TrendingDown className="w-5 h-5 text-amber-400" /></div>
            <div>
              <p className="text-amber-400 text-xs">Stocks Bas</p>
              <p className="text-amber-400 font-bold">{lowItems.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/20 p-2 rounded-lg"><TrendingUp className="w-5 h-5 text-emerald-400" /></div>
            <div>
              <p className="text-slate-400 text-xs">Valeur Totale</p>
              <p className="text-white font-bold">{(totalValue / 1000).toFixed(0)}K F</p>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Alert */}
      {criticalItems.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h3 className="text-red-400 font-semibold">Alerte Stock Critique</h3>
          </div>
          <p className="text-slate-400 text-sm">
            {criticalItems.length} article(s) en dessous du seuil minimum. Commande recommandée immédiatement.
          </p>
        </div>
      )}

      {/* Inventory Table */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-700">
          <h3 className="text-white font-semibold">Inventaire Détaillé</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Article</th>
                <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Catégorie</th>
                <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Stock</th>
                <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Min</th>
                <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Max</th>
                <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Niveau</th>
                <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Prix Unit.</th>
                <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Statut</th>
                <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className={`border-b border-slate-700/50 hover:bg-slate-700/30 ${item.stock <= item.minStock ? 'bg-red-500/5' : ''}`}>
                  <td className="px-4 py-3 text-white text-sm font-medium">{item.name}</td>
                  <td className="px-4 py-3 text-slate-400 text-sm capitalize">{item.category}</td>
                  <td className="px-4 py-3 text-center">
                    {editingId === item.id ? (
                      <input
                        type="number"
                        value={editValues.stock || 0}
                        onChange={(e) => setEditValues({ ...editValues, stock: parseInt(e.target.value) })}
                        className="w-16 px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-center text-sm"
                      />
                    ) : (
                      <span className={`text-sm font-bold ${item.stock <= item.minStock ? 'text-red-400' : item.stock <= item.minStock * 1.5 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {item.stock}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center text-slate-400 text-sm">
                    {editingId === item.id ? (
                      <input
                        type="number"
                        value={editValues.minStock || 0}
                        onChange={(e) => setEditValues({ ...editValues, minStock: parseInt(e.target.value) })}
                        className="w-16 px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-center text-sm"
                      />
                    ) : item.minStock}
                  </td>
                  <td className="px-4 py-3 text-center text-slate-400 text-sm">
                    {editingId === item.id ? (
                      <input
                        type="number"
                        value={editValues.maxStock || 0}
                        onChange={(e) => setEditValues({ ...editValues, maxStock: parseInt(e.target.value) })}
                        className="w-16 px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-center text-sm"
                      />
                    ) : item.maxStock}
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-24 bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${item.stock <= item.minStock ? 'bg-red-500' : item.stock <= item.minStock * 1.5 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                        style={{ width: `${getStockLevel(item)}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-slate-400 text-sm">{item.unitPrice.toLocaleString()} F</td>
                  <td className="px-4 py-3 text-center">{getStatusBadge(item)}</td>
                  <td className="px-4 py-3 text-center">
                    {editingId === item.id ? (
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={saveEdit} className="p-1 text-emerald-400 hover:text-emerald-300"><Save className="w-4 h-4" /></button>
                        <button onClick={cancelEdit} className="p-1 text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
                      </div>
                    ) : (
                      <button onClick={() => startEdit(item)} className="p-1 text-slate-400 hover:text-white"><Edit2 className="w-4 h-4" /></button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowOrderModal(false)}>
          <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-700">
              <h2 className="text-xl font-bold text-white">Simuler une Commande</h2>
              <p className="text-slate-400 text-sm mt-1">Calculer le coût de réapprovisionnement</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-slate-300 text-sm font-medium block mb-2">Article à commander</label>
                <select
                  value={orderItem?.id || ''}
                  onChange={(e) => setOrderItem(items.find(i => i.id === e.target.value) || null)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="">Sélectionner un article</option>
                  {items.map(item => (
                    <option key={item.id} value={item.id}>{item.name} (Stock: {item.stock})</option>
                  ))}
                </select>
              </div>
              {orderItem && (
                <>
                  <div>
                    <label className="text-slate-300 text-sm font-medium block mb-2">Quantité</label>
                    <input
                      type="number"
                      min="1"
                      max={orderItem.maxStock - orderItem.stock}
                      value={orderQuantity}
                      onChange={(e) => setOrderQuantity(parseInt(e.target.value))}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    />
                    <p className="text-slate-500 text-xs mt-1">Max: {orderItem.maxStock - orderItem.stock} unités</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Prix unitaire</span>
                      <span className="text-white">{orderItem.unitPrice.toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Quantité</span>
                      <span className="text-white">{orderQuantity}</span>
                    </div>
                    <div className="border-t border-slate-600 pt-2 mt-2 flex justify-between">
                      <span className="text-white font-semibold">Total</span>
                      <span className="text-emerald-400 font-bold text-lg">{(orderQuantity * orderItem.unitPrice).toLocaleString()} FCFA</span>
                    </div>
                  </div>
                </>
              )}
              <div className="flex gap-3">
                <button
                  onClick={simulateOrder}
                  disabled={!orderItem || orderQuantity <= 0}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 disabled:text-slate-500 text-white py-2 rounded-lg font-medium transition-colors"
                >
                  Confirmer la Commande
                </button>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="px-6 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg font-medium transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
