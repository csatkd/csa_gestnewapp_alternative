import { useState, useEffect } from 'react';
import { Bell, X, Check, Trash2, Filter, AlertCircle, Info, CheckCircle } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function useAdvancedNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);

    // Auto-remove after 5 seconds for non-persistent notifications
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll
  };
}

export function AdvancedNotificationsPanel({ 
  notifications, 
  onClose,
  onMarkAsRead,
  onMarkAllAsRead,
  onRemove,
  onClearAll
}: {
  notifications: Notification[];
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onRemove: (id: string) => void;
  onClearAll: () => void;
}) {
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-amber-400" />;
      case 'info': return <Info className="w-5 h-5 text-blue-400" />;
      default: return <Bell className="w-5 h-5 text-slate-400" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-emerald-500/30 bg-emerald-500/5';
      case 'error': return 'border-red-500/30 bg-red-500/5';
      case 'warning': return 'border-amber-500/30 bg-amber-500/5';
      case 'info': return 'border-blue-500/30 bg-blue-500/5';
      default: return 'border-slate-700 bg-slate-800/50';
    }
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return 'À l\'instant';
    const minutes = Math.floor(seconds / 60);
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
            <Bell className="w-5 h-5 text-emerald-400" />
            <h2 className="text-white font-semibold">Notifications</h2>
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {notifications.length > 0 && (
              <>
                <button
                  onClick={onMarkAllAsRead}
                  className="text-slate-400 hover:text-emerald-400 text-xs transition-colors"
                  title="Tout marquer comme lu"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={onClearAll}
                  className="text-slate-400 hover:text-red-400 text-xs transition-colors"
                  title="Tout supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
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
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              filter === 'all'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-700 text-slate-400'
            }`}
          >
            Toutes
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              filter === 'unread'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-700 text-slate-400'
            }`}
          >
            Non lues
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              filter === 'read'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-700 text-slate-400'
            }`}
          >
            Lues
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
              {filteredNotifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 border-l-4 ${getColor(notification.type)} ${
                    !notification.read ? 'bg-slate-700/20' : ''
                  } hover:bg-slate-700/30 transition-colors`}
                >
                  <div className="flex items-start gap-3">
                    {getIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`text-sm font-medium ${!notification.read ? 'text-white' : 'text-slate-300'}`}>
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <button
                            onClick={() => onMarkAsRead(notification.id)}
                            className="text-slate-400 hover:text-emerald-400 transition-colors"
                            title="Marquer comme lu"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                      <p className="text-slate-400 text-xs mb-2">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-xs">{getTimeAgo(notification.timestamp)}</span>
                        <button
                          onClick={() => onRemove(notification.id)}
                          className="text-slate-400 hover:text-red-400 transition-colors"
                          title="Supprimer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                      {notification.action && (
                        <button
                          onClick={notification.action.onClick}
                          className="mt-2 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                        >
                          {notification.action.label} →
                        </button>
                      )}
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
