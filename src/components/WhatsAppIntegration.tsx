import { useState } from 'react';
import { MessageSquare, Send, Users, FileText, Clock, CheckCircle, AlertCircle, Search, Filter, Plus, LayoutTemplate, Eye } from 'lucide-react';

interface MessageTemplate {
  id: string;
  name: string;
  category: 'payment' | 'attendance' | 'grading' | 'event' | 'general';
  content: string;
  variables: string[];
}

interface SentMessage {
  id: string;
  recipient: string;
  recipientPhone: string;
  template: string;
  content: string;
  sentAt: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  channel: 'whatsapp' | 'sms';
}

const messageTemplates: MessageTemplate[] = [
  {
    id: 'T001',
    name: 'Rappel de paiement',
    category: 'payment',
    content: 'Bonjour {parent_name}, nous vous rappelons que la cotisation de {student_name} d\'un montant de {amount} FCFA est en attente. Merci de régulariser avant le {due_date}. CSA Taekwondo',
    variables: ['{parent_name}', '{student_name}', '{amount}', '{due_date}']
  },
  {
    id: 'T002',
    name: 'Confirmation d\'arrivée',
    category: 'attendance',
    content: 'Bonjour {parent_name}, {student_name} est bien arrivé(e) au Dojang à {time}. Bonne séance ! 🥋 CSA',
    variables: ['{parent_name}', '{student_name}', '{time}']
  },
  {
    id: 'T003',
    name: 'Notification d\'absence',
    category: 'attendance',
    content: 'Bonjour {parent_name}, nous avons constaté l\'absence de {student_name} à la séance du {date}. Merci de nous informer en cas d\'empêchement. CSA Taekwondo',
    variables: ['{parent_name}', '{student_name}', '{date}']
  },
  {
    id: 'T004',
    name: 'Rappel passage de grade',
    category: 'grading',
    content: 'Bonjour {parent_name}, la session de passage de grade de {student_name} est prévue le {date} à {time}. Merci de confirmer la présence. CSA Taekwondo',
    variables: ['{parent_name}', '{student_name}', '{date}', '{time}']
  },
  {
    id: 'T005',
    name: 'Félicitations réussite',
    category: 'grading',
    content: 'Félicitations ! 🎉 {student_name} a réussi son passage de grade avec brio ! Nouveau grade : {new_belt}. Bravo ! CSA Taekwondo',
    variables: ['{student_name}', '{new_belt}']
  },
  {
    id: 'T006',
    name: 'Invitation compétition',
    category: 'event',
    content: 'Bonjour {parent_name}, {student_name} est sélectionné(e) pour la compétition {competition_name} le {date} à {location}. Merci de confirmer. CSA Taekwondo',
    variables: ['{parent_name}', '{student_name}', '{competition_name}', '{date}', '{location}']
  },
  {
    id: 'T007',
    name: 'Cours d\'essai gratuit',
    category: 'general',
    content: 'Bonjour ! Découvrez le Taekwondo à la CSA avec un cours d\'essai GRATUIT le {date} à {time}. Inscription : {phone}. Au plaisir de vous accueillir ! 🥋',
    variables: ['{date}', '{time}', '{phone}']
  },
  {
    id: 'T008',
    name: 'Fermeture exceptionnelle',
    category: 'general',
    content: 'Information importante : Le Dojang sera fermé le {date} pour {reason}. Reprise des activités le {resume_date}. CSA Taekwondo',
    variables: ['{date}', '{reason}', '{resume_date}']
  }
];

const mockSentMessages: SentMessage[] = [
  {
    id: 'MSG001',
    recipient: 'Kouassi Jean',
    recipientPhone: '+225 05 98 76 54 32',
    template: 'Rappel de paiement',
    content: 'Bonjour Kouassi Jean, nous vous rappelons que la cotisation de Kouassi Aya Marie d\'un montant de 25 000 FCFA est en attente. Merci de régulariser avant le 31/12/2024. CSA Taekwondo',
    sentAt: '2024-12-15 10:30',
    status: 'delivered',
    channel: 'whatsapp'
  },
  {
    id: 'MSG002',
    recipient: 'Traoré Fatou',
    recipientPhone: '+225 01 23 45 67 89',
    template: 'Confirmation d\'arrivée',
    content: 'Bonjour Traoré Fatou, Traoré Moussa est bien arrivé(e) au Dojang à 16:00. Bonne séance ! 🥋 CSA',
    sentAt: '2024-12-15 16:05',
    status: 'read',
    channel: 'whatsapp'
  },
  {
    id: 'MSG003',
    recipient: 'Bamba Ibrahim',
    recipientPhone: '+225 05 34 56 78 90',
    template: 'Notification d\'absence',
    content: 'Bonjour Bamba Ibrahim, nous avons constaté l\'absence de Bamba Fatoumata à la séance du 14/12/2024. Merci de nous informer en cas d\'empêchement. CSA Taekwondo',
    sentAt: '2024-12-14 17:00',
    status: 'sent',
    channel: 'sms'
  }
];

export default function WhatsAppIntegration() {
  const [activeTab, setActiveTab] = useState<'templates' | 'compose' | 'history'>('templates');
  const [sentMessages] = useState<SentMessage[]>(mockSentMessages);
  const [selectedTemplate, setSelectedTemplate] = useState<MessageTemplate | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredTemplates = messageTemplates.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = filterCategory === 'all' || t.category === filterCategory;
    return matchSearch && matchCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'payment': return '💰';
      case 'attendance': return '📋';
      case 'grading': return '🥋';
      case 'event': return '🏆';
      case 'general': return '📢';
      default: return '📝';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'payment': return 'Paiements';
      case 'attendance': return 'Assiduité';
      case 'grading': return 'Grades';
      case 'event': return 'Événements';
      case 'general': return 'Général';
      default: return category;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'text-blue-400';
      case 'delivered': return 'text-emerald-400';
      case 'read': return 'text-emerald-500';
      case 'failed': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <Send className="w-3 h-3" />;
      case 'delivered': return <CheckCircle className="w-3 h-3" />;
      case 'read': return <CheckCircle className="w-3 h-3" />;
      case 'failed': return <AlertCircle className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Centre de Messages</h2>
          <p className="text-slate-400 text-sm">WhatsApp, SMS et notifications</p>
        </div>
        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          Nouveau Message
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-slate-400 text-xs">Messages Envoyés</p>
              <p className="text-2xl font-bold text-white">{sentMessages.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
            <div>
              <p className="text-slate-400 text-xs">Taux de Livraison</p>
              <p className="text-2xl font-bold text-emerald-400">98%</p>
            </div>
          </div>
        </div>
        <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-slate-400 text-xs">Templates</p>
              <p className="text-2xl font-bold text-white">{messageTemplates.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-purple-400" />
            <div>
              <p className="text-slate-400 text-xs">Temps de Réponse</p>
              <p className="text-2xl font-bold text-white">&lt;2min</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('templates')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'templates'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          <LayoutTemplate className="w-4 h-4 inline mr-2" />
          Modèles
        </button>
        <button
          onClick={() => setActiveTab('compose')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'compose'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          <Send className="w-4 h-4 inline mr-2" />
          Composer
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'history'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          <Clock className="w-4 h-4 inline mr-2" />
          Historique
        </button>
      </div>

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher un modèle..."
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
              <option value="payment">💰 Paiements</option>
              <option value="attendance">📋 Assiduité</option>
              <option value="grading">🥋 Grades</option>
              <option value="event">🏆 Événements</option>
              <option value="general">📢 Général</option>
            </select>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTemplates.map(template => (
              <div
                key={template.id}
                className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 hover:border-emerald-500/30 transition-all cursor-pointer"
                onClick={() => setSelectedTemplate(template)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getCategoryIcon(template.category)}</span>
                    <h3 className="text-white font-semibold">{template.name}</h3>
                  </div>
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-400">
                    {getCategoryLabel(template.category)}
                  </span>
                </div>
                <p className="text-slate-300 text-sm mb-3 line-clamp-2">{template.content}</p>
                <div className="flex flex-wrap gap-1">
                  {template.variables.map((variable, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-xs">
                      {variable}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Compose Tab */}
      {activeTab === 'compose' && (
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <h3 className="text-white font-semibold mb-4">Composer un Message</h3>
          <div className="space-y-4">
            <div>
              <label className="text-slate-300 text-sm block mb-2">Destinataire</label>
              <select className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500">
                <option value="">Sélectionner un destinataire</option>
                <option value="all_parents">Tous les parents</option>
                <option value="all_coaches">Tous les coachs</option>
                <option value="absent_today">Absents aujourd'hui</option>
                <option value="overdue_payments">Paiements en retard</option>
              </select>
            </div>
            <div>
              <label className="text-slate-300 text-sm block mb-2">Modèle de message</label>
              <select className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500">
                <option value="">Sélectionner un modèle</option>
                {messageTemplates.map(t => (
                  <option key={t.id} value={t.id}>{getCategoryIcon(t.category)} {t.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-slate-300 text-sm block mb-2">Canal d'envoi</label>
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                  <MessageSquare className="w-5 h-5" />
                  WhatsApp
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  <Send className="w-5 h-5" />
                  SMS
                </button>
              </div>
            </div>
            <div>
              <label className="text-slate-300 text-sm block mb-2">Message</label>
              <textarea
                rows={6}
                placeholder="Votre message..."
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
              ></textarea>
            </div>
            <button className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium transition-colors">
              <Send className="w-5 h-5" />
              Envoyer le Message
            </button>
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Destinataire</th>
                  <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Modèle</th>
                  <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Canal</th>
                  <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Date</th>
                  <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Statut</th>
                </tr>
              </thead>
              <tbody>
                {sentMessages.map(message => (
                  <tr key={message.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-white text-sm font-medium">{message.recipient}</p>
                        <p className="text-slate-500 text-xs">{message.recipientPhone}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-300 text-sm">{message.template}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs ${message.channel === 'whatsapp' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                        {message.channel === 'whatsapp' ? '💬 WhatsApp' : '📱 SMS'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-sm">{message.sentAt}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center gap-1 ${getStatusColor(message.status)}`}>
                        {getStatusIcon(message.status)}
                        <span className="text-xs capitalize">{message.status === 'sent' ? 'Envoyé' : message.status === 'delivered' ? 'Livré' : message.status === 'read' ? 'Lu' : 'Échoué'}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Template Detail Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedTemplate(null)}>
          <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{getCategoryIcon(selectedTemplate.category)}</span>
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedTemplate.name}</h2>
                    <p className="text-slate-400 text-sm">{getCategoryLabel(selectedTemplate.category)}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedTemplate(null)} className="text-slate-400 hover:text-white text-2xl">&times;</button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h4 className="text-emerald-400 font-semibold text-sm mb-2">Contenu du message</h4>
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <p className="text-slate-300 text-sm whitespace-pre-wrap">{selectedTemplate.content}</p>
                </div>
              </div>
              <div>
                <h4 className="text-emerald-400 font-semibold text-sm mb-2">Variables disponibles</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.variables.map((variable, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm font-mono">
                      {variable}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t border-slate-700">
                <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Utiliser ce modèle
                </button>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="px-6 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
