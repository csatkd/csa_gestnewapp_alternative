import { useState } from 'react';
import { UserPlus, FileCheck, CheckCircle, XCircle, Clock, AlertCircle, Search, Filter, Download, Eye } from 'lucide-react';

interface RequiredDocument {
  id: string;
  name: string;
  required: boolean;
  received: boolean;
  receivedDate?: string;
  notes?: string;
}

interface Inscription {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  age: number;
  gender: 'M' | 'F';
  parentName?: string;
  parentPhone: string;
  parentEmail?: string;
  address: string;
  desiredBelt: string;
  registrationDate: string;
  status: 'pending' | 'incomplete' | 'complete' | 'validated';
  documents: RequiredDocument[];
  feesPaid: boolean;
  feesAmount: number;
  notes?: string;
}

const mockInscriptions: Inscription[] = [
  {
    id: 'INS001',
    firstName: 'Kouamé',
    lastName: 'Jean',
    dateOfBirth: '2015-03-15',
    age: 9,
    gender: 'M',
    parentName: 'Kouamé Marie',
    parentPhone: '+225 07 11 22 33 44',
    parentEmail: 'kouame.marie@email.com',
    address: 'Cocody, Abidjan',
    desiredBelt: 'Blanche',
    registrationDate: '2024-12-01',
    status: 'complete',
    documents: [
      { id: 'D1', name: 'Formulaire d\'inscription', required: true, received: true, receivedDate: '2024-12-01' },
      { id: 'D2', name: 'Photos d\'identité (2)', required: true, received: true, receivedDate: '2024-12-01' },
      { id: 'D3', name: 'Certificat médical', required: true, received: true, receivedDate: '2024-12-02' },
      { id: 'D4', name: 'Copie pièce d\'identité parent', required: true, received: true, receivedDate: '2024-12-01' },
      { id: 'D5', name: 'Copie livret de famille', required: true, received: true, receivedDate: '2024-12-01' },
      { id: 'D6', name: 'Autorisation parentale', required: true, received: true, receivedDate: '2024-12-01' },
      { id: 'D7', name: 'Assurance sportive', required: false, received: false },
    ],
    feesPaid: true,
    feesAmount: 25000,
  },
  {
    id: 'INS002',
    firstName: 'Traoré',
    lastName: 'Fatou',
    dateOfBirth: '2010-07-22',
    age: 14,
    gender: 'F',
    parentName: 'Traoré Ibrahim',
    parentPhone: '+225 07 22 33 44 55',
    parentEmail: 'traore.ibrahim@email.com',
    address: 'Yopougon, Abidjan',
    desiredBelt: 'Blanche',
    registrationDate: '2024-12-05',
    status: 'incomplete',
    documents: [
      { id: 'D1', name: 'Formulaire d\'inscription', required: true, received: true, receivedDate: '2024-12-05' },
      { id: 'D2', name: 'Photos d\'identité (2)', required: true, received: true, receivedDate: '2024-12-05' },
      { id: 'D3', name: 'Certificat médical', required: true, received: false },
      { id: 'D4', name: 'Copie pièce d\'identité parent', required: true, received: true, receivedDate: '2024-12-05' },
      { id: 'D5', name: 'Copie livret de famille', required: false, received: false },
      { id: 'D6', name: 'Autorisation parentale', required: true, received: true, receivedDate: '2024-12-05' },
      { id: 'D7', name: 'Assurance sportive', required: false, received: false },
    ],
    feesPaid: true,
    feesAmount: 25000,
    notes: 'Certificat médical en attente',
  },
  {
    id: 'INS003',
    firstName: 'Bamba',
    lastName: 'Moussa',
    dateOfBirth: '1995-11-08',
    age: 29,
    gender: 'M',
    parentPhone: '+225 07 33 44 55 66',
    parentEmail: 'bamba.moussa@email.com',
    address: 'Plateau, Abidjan',
    desiredBelt: 'Blanche',
    registrationDate: '2024-12-10',
    status: 'pending',
    documents: [
      { id: 'D1', name: 'Formulaire d\'inscription', required: true, received: true, receivedDate: '2024-12-10' },
      { id: 'D2', name: 'Photos d\'identité (2)', required: true, received: false },
      { id: 'D3', name: 'Certificat médical', required: true, received: false },
      { id: 'D4', name: 'Copie pièce d\'identité', required: true, received: false },
      { id: 'D5', name: 'Assurance sportive', required: false, received: false },
    ],
    feesPaid: false,
    feesAmount: 35000,
    notes: 'Adulte - dossier en cours de constitution',
  },
  {
    id: 'INS004',
    firstName: 'Diallo',
    lastName: 'Aminata',
    dateOfBirth: '2012-05-18',
    age: 12,
    gender: 'F',
    parentName: 'Diallo Mamadou',
    parentPhone: '+225 07 44 55 66 77',
    parentEmail: 'diallo.mamadou@email.com',
    address: 'Treichville, Abidjan',
    desiredBelt: 'Blanche',
    registrationDate: '2024-12-12',
    status: 'validated',
    documents: [
      { id: 'D1', name: 'Formulaire d\'inscription', required: true, received: true, receivedDate: '2024-12-12' },
      { id: 'D2', name: 'Photos d\'identité (2)', required: true, received: true, receivedDate: '2024-12-12' },
      { id: 'D3', name: 'Certificat médical', required: true, received: true, receivedDate: '2024-12-12' },
      { id: 'D4', name: 'Copie pièce d\'identité parent', required: true, received: true, receivedDate: '2024-12-12' },
      { id: 'D5', name: 'Copie livret de famille', required: true, received: true, receivedDate: '2024-12-12' },
      { id: 'D6', name: 'Autorisation parentale', required: true, received: true, receivedDate: '2024-12-12' },
      { id: 'D7', name: 'Assurance sportive', required: false, received: true, receivedDate: '2024-12-13' },
    ],
    feesPaid: true,
    feesAmount: 25000,
  },
];

export default function InscriptionManagement() {
  const [inscriptions, setInscriptions] = useState<Inscription[]>(mockInscriptions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedInscription, setSelectedInscription] = useState<Inscription | null>(null);

  const filteredInscriptions = inscriptions.filter(inscription => {
    const matchSearch = `${inscription.firstName} ${inscription.lastName} ${inscription.parentName || ''}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || inscription.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: inscriptions.length,
    pending: inscriptions.filter(i => i.status === 'pending').length,
    incomplete: inscriptions.filter(i => i.status === 'incomplete').length,
    complete: inscriptions.filter(i => i.status === 'complete').length,
    validated: inscriptions.filter(i => i.status === 'validated').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'incomplete': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'complete': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'validated': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'incomplete': return 'Incomplet';
      case 'complete': return 'Complet';
      case 'validated': return 'Validé';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'incomplete': return <AlertCircle className="w-4 h-4" />;
      case 'complete': return <FileCheck className="w-4 h-4" />;
      case 'validated': return <CheckCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const toggleDocumentReceived = (inscriptionId: string, documentId: string) => {
    setInscriptions(inscriptions.map(ins => {
      if (ins.id === inscriptionId) {
        const updatedDocs = ins.documents.map(doc => {
          if (doc.id === documentId) {
            return {
              ...doc,
              received: !doc.received,
              receivedDate: !doc.received ? new Date().toISOString().split('T')[0] : undefined,
            };
          }
          return doc;
        });

        // Update inscription status based on documents
        const requiredDocs = updatedDocs.filter(d => d.required);
        const allRequiredReceived = requiredDocs.every(d => d.received);
        const someDocsReceived = updatedDocs.some(d => d.received);

        let newStatus = ins.status;
        if (allRequiredReceived && ins.feesPaid) {
          newStatus = 'complete';
        } else if (someDocsReceived) {
          newStatus = 'incomplete';
        }

        return { ...ins, documents: updatedDocs, status: newStatus };
      }
      return ins;
    }));

    // Update selected inscription if it's the one being modified
    if (selectedInscription?.id === inscriptionId) {
      const updated = inscriptions.find(i => i.id === inscriptionId);
      if (updated) {
        setSelectedInscription(updated);
      }
    }
  };

  const validateInscription = (inscriptionId: string) => {
    setInscriptions(inscriptions.map(ins => 
      ins.id === inscriptionId ? { ...ins, status: 'validated' } : ins
    ));
    setSelectedInscription(null);
  };

  const getDocumentProgress = (inscription: Inscription) => {
    const requiredDocs = inscription.documents.filter(d => d.required);
    const receivedRequired = requiredDocs.filter(d => d.received).length;
    return {
      total: requiredDocs.length,
      received: receivedRequired,
      percentage: Math.round((receivedRequired / requiredDocs.length) * 100),
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Gestion des Inscriptions</h2>
          <p className="text-slate-400 text-sm">Suivi des nouvelles inscriptions et documents requis</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors">
          <UserPlus className="w-4 h-4" />
          Nouvelle Inscription
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <UserPlus className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-slate-400 text-xs">Total</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/30">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500/20 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-yellow-400 text-xs">En attente</p>
              <p className="text-2xl font-bold text-white">{stats.pending}</p>
            </div>
          </div>
        </div>
        <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/30">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500/20 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <p className="text-orange-400 text-xs">Incomplets</p>
              <p className="text-2xl font-bold text-white">{stats.incomplete}</p>
            </div>
          </div>
        </div>
        <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <FileCheck className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-blue-400 text-xs">Complets</p>
              <p className="text-2xl font-bold text-white">{stats.complete}</p>
            </div>
          </div>
        </div>
        <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/20 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-emerald-400 text-xs">Validés</p>
              <p className="text-2xl font-bold text-white">{stats.validated}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher par nom..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
        >
          <option value="all">Tous les statuts</option>
          <option value="pending">En attente</option>
          <option value="incomplete">Incomplet</option>
          <option value="complete">Complet</option>
          <option value="validated">Validé</option>
        </select>
      </div>

      {/* Inscriptions List */}
      <div className="space-y-4">
        {filteredInscriptions.map(inscription => {
          const progress = getDocumentProgress(inscription);
          
          return (
            <div
              key={inscription.id}
              className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 hover:border-emerald-500/30 transition-all cursor-pointer"
              onClick={() => setSelectedInscription(inscription)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-bold">
                    {inscription.firstName[0]}{inscription.lastName[0]}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {inscription.firstName} {inscription.lastName}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      {inscription.age} ans • {inscription.gender === 'M' ? 'Masculin' : 'Féminin'}
                    </p>
                    {inscription.parentName && (
                      <p className="text-slate-500 text-xs mt-1">
                        Parent: {inscription.parentName} • {inscription.parentPhone}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(inscription.status)}`}>
                    {getStatusIcon(inscription.status)}
                    {getStatusLabel(inscription.status)}
                  </span>
                  <span className="text-slate-500 text-xs">
                    Inscrit le {new Date(inscription.registrationDate).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>

              {/* Document Progress */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Documents requis</span>
                  <span className="text-white text-sm font-medium">
                    {progress.received}/{progress.total} ({progress.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      progress.percentage === 100 ? 'bg-emerald-500' :
                      progress.percentage >= 50 ? 'bg-blue-500' :
                      progress.percentage > 0 ? 'bg-orange-500' : 'bg-slate-600'
                    }`}
                    style={{ width: `${progress.percentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Fees Status */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                <div className="flex items-center gap-2">
                  {inscription.feesPaid ? (
                    <span className="flex items-center gap-1 text-emerald-400 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      Frais payés ({inscription.feesAmount.toLocaleString()} F)
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-400 text-sm">
                      <XCircle className="w-4 h-4" />
                      Frais en attente ({inscription.feesAmount.toLocaleString()} F)
                    </span>
                  )}
                </div>
                <button className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  Voir détails
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inscription Detail Modal */}
      {selectedInscription && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedInscription(null)}>
          <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-bold text-xl">
                    {selectedInscription.firstName[0]}{selectedInscription.lastName[0]}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedInscription.firstName} {selectedInscription.lastName}
                    </h2>
                    <p className="text-slate-400 mt-1">
                      {selectedInscription.age} ans • {selectedInscription.gender === 'M' ? 'Masculin' : 'Féminin'} • Ceinture {selectedInscription.desiredBelt}
                    </p>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border mt-2 ${getStatusColor(selectedInscription.status)}`}>
                      {getStatusIcon(selectedInscription.status)}
                      {getStatusLabel(selectedInscription.status)}
                    </span>
                  </div>
                </div>
                <button onClick={() => setSelectedInscription(null)} className="text-slate-400 hover:text-white text-2xl">&times;</button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="text-emerald-400 font-semibold text-sm mb-3">Informations Personnelles</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Date de naissance</span>
                      <span className="text-white">{new Date(selectedInscription.dateOfBirth).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Âge</span>
                      <span className="text-white">{selectedInscription.age} ans</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Adresse</span>
                      <span className="text-white">{selectedInscription.address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Téléphone</span>
                      <span className="text-white">{selectedInscription.parentPhone}</span>
                    </div>
                    {selectedInscription.parentEmail && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Email</span>
                        <span className="text-white">{selectedInscription.parentEmail}</span>
                      </div>
                    )}
                  </div>
                </div>

                {selectedInscription.parentName && (
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <h4 className="text-emerald-400 font-semibold text-sm mb-3">Informations Parent/Tuteur</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Nom du parent</span>
                        <span className="text-white">{selectedInscription.parentName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Téléphone</span>
                        <span className="text-white">{selectedInscription.parentPhone}</span>
                      </div>
                      {selectedInscription.parentEmail && (
                        <div className="flex justify-between">
                          <span className="text-slate-400">Email</span>
                          <span className="text-white">{selectedInscription.parentEmail}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Documents Checklist */}
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h4 className="text-emerald-400 font-semibold text-sm mb-4">Documents Requis</h4>
                <div className="space-y-2">
                  {selectedInscription.documents.map(doc => (
                    <div
                      key={doc.id}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        doc.received ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-800/50 border-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleDocumentReceived(selectedInscription.id, doc.id)}
                          className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                            doc.received
                              ? 'bg-emerald-500 border-emerald-500 text-white'
                              : 'border-slate-500 hover:border-emerald-500'
                          }`}
                        >
                          {doc.received && <CheckCircle className="w-4 h-4" />}
                        </button>
                        <div>
                          <p className={`text-sm font-medium ${doc.received ? 'text-white' : 'text-slate-300'}`}>
                            {doc.name}
                          </p>
                          {doc.receivedDate && (
                            <p className="text-xs text-slate-500">
                              Reçu le {new Date(doc.receivedDate).toLocaleDateString('fr-FR')}
                            </p>
                          )}
                        </div>
                      </div>
                      {doc.required && (
                        <span className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded text-xs">
                          Obligatoire
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Fees Information */}
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h4 className="text-emerald-400 font-semibold text-sm mb-3">Frais d'Inscription</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Montant</p>
                    <p className="text-white text-2xl font-bold">{selectedInscription.feesAmount.toLocaleString()} FCFA</p>
                  </div>
                  <div className="text-right">
                    {selectedInscription.feesPaid ? (
                      <span className="flex items-center gap-2 text-emerald-400">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Payé</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-red-400">
                        <XCircle className="w-5 h-5" />
                        <span className="font-medium">En attente</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedInscription.notes && (
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="text-emerald-400 font-semibold text-sm mb-2">Notes</h4>
                  <p className="text-slate-300 text-sm">{selectedInscription.notes}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-slate-700">
                {selectedInscription.status === 'complete' && (
                  <button
                    onClick={() => validateInscription(selectedInscription.id)}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Valider l'Inscription
                  </button>
                )}
                <button
                  onClick={() => setSelectedInscription(null)}
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
