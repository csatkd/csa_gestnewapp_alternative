import { useState } from 'react';
import { MessageSquare, Send, Bell, Users, Filter, Plus, Trash2 } from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  message: string;
  author: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
  target: 'all' | 'parents' | 'coaches' | 'students';
  read: boolean;
}

interface Message {
  id: string;
  from: string;
  to: string;
  subject: string;
  content: string;
  date: string;
  read: boolean;
}

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Fermeture exceptionnelle du Dojang',
    message: 'Le Dojang sera fermé le samedi 25 décembre pour les fêtes de fin d\'année. Reprise des activités le lundi 27 décembre.',
    author: 'Direction CSA',
    date: '2024-12-20',
    priority: 'high',
    target: 'all',
    read: false
  },
  {
    id: '2',
    title: 'Stage de perfectionnement - Janvier 2025',
    message: 'Un stage intensif de 3 jours sera organisé du 15 au 17 janvier 2025. Inscription ouverte jusqu\'au 10 janvier. Places limitées !',
    author: 'Maître Koné',
    date: '2024-12-18',
    priority: 'medium',
    target: 'students',
    read: false
  },
  {
    id: '3',
    title: 'Nouvelle politique de paiement',
    message: 'À partir de janvier 2025, les paiements devront être effectués avant le 5 de chaque mois. Passé ce délai, des frais de retard de 5000 FCFA seront appliqués.',
    author: 'Trésorerie CSA',
    date: '2024-12-15',
    priority: 'high',
    target: 'parents',
    read: true
  },
  {
    id: '4',
    title: 'Réunion des coaches',
    message: 'Réunion pédagogique le mercredi 22 décembre à 18h00. Ordre du jour : préparation des passages de grade et planification 2025.',
    author: 'Direction Technique',
    date: '2024-12-14',
    priority: 'medium',
    target: 'coaches',
    read: true
  }
];

const mockMessages: Message[] = [
  {
    id: '1',
    from: 'parent.kouassi@email.com',
    to: 'contact@csa.ci',
    subject: 'Question sur les horaires',
    content: 'Bonjour, je souhaiterais savoir si les horaires du cours du samedi peuvent être modifiés pour ma fille...',
    date: '2024-12-19',
    read: false
  },
  {
    id: '2',
    from: 'coach.traore@csa.ci',
    to: 'direction@csa.ci',
    subject: 'Rapport mensuel décembre',
    content: 'Veuillez trouver ci-joint le rapport d\'activité du mois de décembre...',
    date: '2024-12-18',
    read: true
  }
];

export default function Communication() {
  const [activeTab, setActiveTab] = useState<'announcements' | 'messages'>('announcements');
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [showNewAnnouncement, setShowNewAnnouncement] = useState(false);

  const filteredAnnouncements = filterPriority === 'all' 
    ? announcements 
    : announcements.filter(a => a.priority === filterPriority);

  const unreadAnnouncements = announcements.filter(a => !a.read).length;
  const unreadMessages = messages.filter(m => !m.read).length;

  const markAsRead = (id: string) => {
    setAnnouncements(announcements.map(a => 
      a.id === id ? { ...a, read: true } : a
    ));
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getTargetLabel = (target: string) => {
    switch (target) {
      case 'all': return 'Tous';
      case 'parents': return 'Parents';
      case 'coaches': return 'Coaches';
      case 'students': return 'Élèves';
      default: return target;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Communication</h2>
          <p className="text-slate-400 text-sm">Annonces et messagerie interne</p>
        </div>
        {activeTab === 'announcements' && (
          <button
            onClick={() => setShowNewAnnouncement(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nouvelle Annonce
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('announcements')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'announcements'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          <Bell className="w-4 h-4" />
          Annonces
          {unreadAnnouncements > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {unreadAnnouncements}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'messages'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Messages
          {unreadMessages > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {unreadMessages}
            </span>
          )}
        </button>
      </div>

      {/* Announcements Tab */}
      {activeTab === 'announcements' && (
        <>
          {/* Filters */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterPriority('all')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                filterPriority === 'all'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              Toutes
            </button>
            <button
              onClick={() => setFilterPriority('high')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                filterPriority === 'high'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              Haute priorité
            </button>
            <button
              onClick={() => setFilterPriority('medium')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                filterPriority === 'medium'
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              Moyenne
            </button>
            <button
              onClick={() => setFilterPriority('low')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                filterPriority === 'low'
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              Basse
            </button>
          </div>

          {/* Announcements List */}
          <div className="space-y-4">
            {filteredAnnouncements.length === 0 ? (
              <div className="bg-slate-800/50 rounded-xl p-8 text-center border border-slate-700">
                <Bell className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">Aucune annonce à afficher</p>
              </div>
            ) : (
              filteredAnnouncements.map(announcement => (
                <div
                  key={announcement.id}
                  className={`bg-slate-800/50 rounded-xl p-5 border transition-colors ${
                    announcement.read ? 'border-slate-700' : 'border-emerald-500/30 bg-emerald-500/5'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-white font-semibold">{announcement.title}</h3>
                        <span className={`px-2 py-0.5 rounded text-xs border ${getPriorityColor(announcement.priority)}`}>
                          {announcement.priority === 'high' ? 'Urgent' : announcement.priority === 'medium' ? 'Important' : 'Info'}
                        </span>
                        <span className="bg-slate-700 text-slate-400 px-2 py-0.5 rounded text-xs">
                          {getTargetLabel(announcement.target)}
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm mb-2">{announcement.message}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>Par: {announcement.author}</span>
                        <span>•</span>
                        <span>{new Date(announcement.date).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      {!announcement.read && (
                        <button
                          onClick={() => markAsRead(announcement.id)}
                          className="text-slate-400 hover:text-emerald-400 transition-colors"
                          title="Marquer comme lu"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteAnnouncement(announcement.id)}
                        className="text-slate-400 hover:text-red-400 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="bg-slate-800/50 rounded-xl p-8 text-center border border-slate-700">
              <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">Aucun message</p>
            </div>
          ) : (
            messages.map(message => (
              <div
                key={message.id}
                className={`bg-slate-800/50 rounded-xl p-5 border transition-colors ${
                  message.read ? 'border-slate-700' : 'border-emerald-500/30 bg-emerald-500/5'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">{message.subject}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <span>De: {message.from}</span>
                      <span>•</span>
                      <span>À: {message.to}</span>
                      <span>•</span>
                      <span>{new Date(message.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <p className="text-slate-300 text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* New Announcement Modal */}
      {showNewAnnouncement && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-white mb-4">Nouvelle Annonce</h3>
            <p className="text-slate-400 text-sm mb-6">Fonctionnalité en cours de développement</p>
            <button
              onClick={() => setShowNewAnnouncement(false)}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
