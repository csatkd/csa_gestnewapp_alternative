import { useState, useEffect } from 'react';
import { Bell, X, Check, Trash2, Filter } from 'lucide-react';

interface Notification {
  id: string;
  type: 'attendance' | 'payment' | 'grading' | 'event' | 'medical' | 'stock' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

const initialNotifications: Notification[] = [
  {
    id: 'N001', type: 'attendance', title: 'Arrivée au Dojang',
    message: 'Kouamé Aya est arrivée au Dojang à 16:00',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), read: false, priority: 'low'
  },
  {
    id: 'N002', type: 'payment', title: 'Paiement Reçu',
    message: 'Acompte de 25 000 FCFA reçu de Traoré Moussa via Orange Money',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), read: false, priority: 'medium'
  },
  {
    id: 'N003', type: 'medical', title: 'Certificat Médical Expiré',
    message: 'Le certificat médical de Diallo Aminata expire dans 7 jours',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), read: false, priority: 'high'
  },
  {
    id: 'N004', type: 'stock', title: 'Stock Critique',
    message: 'Plastrons électroniques: 2 unités restantes (minimum: 5)',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), read: false, priority: 'high'
  },
  {
    id: 'N005', type: 'grading', title: 'Session de Grade Planifiée',
    message: 'Session d\'examen le 20 Janvier 2025 — 5 candidats inscrits',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), read: true, priority: 'medium'
  },
  {
    id: 'N006', type: 'event', title: 'Compétition à Venir',
    message: 'Coupe Régionale Zone Sud dans 15 jours à San-Pédro',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), read: true, priority: 'medium'
  },
  {
    id: 'N007', type: 'payment', title: 'Échéance Dépassée',
    message: 'Bamba Fatou: Cotisation en retard de 30 000 FCFA',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), read: true, priority: 'high'
  },
  {
    id: 'N008', type: 'system', title: 'Mise à Jour Système',
    message: 'Sauvegarde automatique effectuée avec succès',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), read: true, priority: 'low'
  },
];

export default function NotificationsPanel({ onClose }: { onClose: () => void }) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'high'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'high') return n.priority === 'high';
    return true;
  });

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      attendance: '✅', payment: '💰', grading: '🥋', event: '🏆',
      medical: '⚕️', stock: '📦', system: '⚙️'
    };
    return icons[type] || '📋';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-500/5';
      case 'medium': return 'border-l-amber-500 bg-amber-500/5';
      default: return 'border-l-slate-500';
    }
  };

  const getTimeAgo = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `Il y a ${minutes}min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Il y a ${hours}h`;
    const days = Math.floor(hours / 24);
    return `Il y a ${days}j`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end" onClick={onClose}>
      <div className="w-full max-w-md bg-slate-800 border-l border-slate-700 h-full overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-400" />
            <h2 className="text-white font-semibold">Notifications</h2>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{unreadCount}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className="text-emerald-400 hover:text-emerald-300 text-xs flex items-center gap-1">
                <Check className="w-3 h-3" /> Tout lire
              </button>
            )}
            <button onClick={onClose} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="p-3 border-b border-slate-700 flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${filter === 'all' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}
          >
            Toutes
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${filter === 'unread' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}
          >
            Non lues
          </button>
          <button
            onClick={() => setFilter('high')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${filter === 'high' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}
          >
            <Filter className="w-3 h-3 inline mr-1" />Prioritaires
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
              <Bell className="w-12 h-12 mb-2 opacity-30" />
              <p className="text-sm">Aucune notification</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-700/50">
              {filteredNotifications.map(notif => (
                <div
                  key={notif.id}
                  className={`p-4 border-l-4 ${getPriorityColor(notif.priority)} ${!notif.read ? 'bg-slate-700/20' : ''} hover:bg-slate-700/30 transition-colors`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg">{getTypeIcon(notif.type)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-sm font-medium ${!notif.read ? 'text-white' : 'text-slate-300'}`}>{notif.title}</h4>
                        {!notif.read && <span className="w-2 h-2 rounded-full bg-emerald-400"></span>}
                      </div>
                      <p className="text-slate-400 text-xs mt-1">{notif.message}</p>
                      <p className="text-slate-500 text-xs mt-1">{getTimeAgo(notif.timestamp)}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {!notif.read && (
                        <button onClick={() => markAsRead(notif.id)} className="p-1 text-slate-400 hover:text-emerald-400" title="Marquer comme lu">
                          <Check className="w-3 h-3" />
                        </button>
                      )}
                      <button onClick={() => deleteNotification(notif.id)} className="p-1 text-slate-400 hover:text-red-400" title="Supprimer">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-700 text-center">
          <p className="text-slate-500 text-xs">{filteredNotifications.length} notification(s)</p>
        </div>
      </div>
    </div>
  );
}

// Hook for live countdown
export function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}
