import { useState } from 'react';
import { Users, UserPlus, Edit2, Trash2, Shield, Search, Filter } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'coach' | 'treasurer';
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin?: string;
}

const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Maître Koné',
    email: 'admin@csa.ci',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-15',
    lastLogin: '2024-12-19'
  },
  {
    id: '2',
    name: 'Coach Traoré',
    email: 'coach@csa.ci',
    role: 'coach',
    status: 'active',
    createdAt: '2024-03-20',
    lastLogin: '2024-12-18'
  },
  {
    id: '3',
    name: 'Coach Diallo',
    email: 'diallo@csa.ci',
    role: 'coach',
    status: 'active',
    createdAt: '2024-05-10',
    lastLogin: '2024-12-19'
  },
  {
    id: '4',
    name: 'M. Bamba',
    email: 'tresorerie@csa.ci',
    role: 'treasurer',
    status: 'active',
    createdAt: '2024-02-28',
    lastLogin: '2024-12-17'
  }
];

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const filteredUsers = users.filter(user => {
    const matchSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = filterRole === 'all' || user.role === filterRole;
    return matchSearch && matchRole;
  });

  const getRoleBadge = (role: string) => {
    const badges = {
      admin: { label: 'Administrateur', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30', icon: '👑' },
      coach: { label: 'Coach', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', icon: '🥋' },
      treasurer: { label: 'Trésorier', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', icon: '💰' }
    };
    return badges[role as keyof typeof badges];
  };

  const handleDelete = (userId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    admins: users.filter(u => u.role === 'admin').length,
    coaches: users.filter(u => u.role === 'coach').length,
    treasurers: users.filter(u => u.role === 'treasurer').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Gestion des Utilisateurs</h2>
          <p className="text-slate-400 text-sm">Administration des comptes staff</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          Nouvel Utilisateur
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-slate-400 text-xs">Total</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/20 p-3 rounded-lg">
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-emerald-400 text-xs">Actifs</p>
              <p className="text-2xl font-bold text-white">{stats.active}</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30">
          <p className="text-purple-400 text-xs">Administrateurs</p>
          <p className="text-2xl font-bold text-white">{stats.admins}</p>
        </div>
        <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
          <p className="text-blue-400 text-xs">Coachs</p>
          <p className="text-2xl font-bold text-white">{stats.coaches}</p>
        </div>
        <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
          <p className="text-amber-400 text-xs">Trésoriers</p>
          <p className="text-2xl font-bold text-white">{stats.treasurers}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
        >
          <option value="all">Tous les rôles</option>
          <option value="admin">Administrateurs</option>
          <option value="coach">Coachs</option>
          <option value="treasurer">Trésoriers</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Utilisateur</th>
                <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Email</th>
                <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Rôle</th>
                <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Statut</th>
                <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Créé le</th>
                <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Dernière connexion</th>
                <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => {
                const badge = getRoleBadge(user.role);
                return (
                  <tr key={user.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <span className="text-white font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-300 text-sm">{user.email}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${badge.color}`}>
                        <span>{badge.icon}</span>
                        {badge.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.status === 'active' 
                          ? 'bg-emerald-500/20 text-emerald-400' 
                          : 'bg-slate-500/20 text-slate-400'
                      }`}>
                        {user.status === 'active' ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-sm">
                      {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-sm">
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('fr-FR') : '-'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setEditingUser(user)}
                          className="p-2 text-slate-400 hover:text-emerald-400 transition-colors"
                          title="Modifier"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingUser) && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-white mb-4">
              {editingUser ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-slate-300 text-sm block mb-2">Nom complet</label>
                <input
                  type="text"
                  defaultValue={editingUser?.name || ''}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-slate-300 text-sm block mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={editingUser?.email || ''}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-slate-300 text-sm block mb-2">Rôle</label>
                <select
                  defaultValue={editingUser?.role || 'coach'}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="admin">Administrateur</option>
                  <option value="coach">Coach</option>
                  <option value="treasurer">Trésorier</option>
                </select>
              </div>
              {!editingUser && (
                <div>
                  <label className="text-slate-300 text-sm block mb-2">Mot de passe</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              )}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingUser(null);
                  }}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg transition-colors"
                >
                  {editingUser ? 'Mettre à jour' : 'Créer'}
                </button>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingUser(null);
                  }}
                  className="px-6 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg transition-colors"
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
