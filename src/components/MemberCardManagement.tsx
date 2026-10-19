import { useState } from 'react';
import { CreditCard, Download, Printer, Search, Filter, CheckCircle, AlertCircle, Clock, QrCode, Plus, Eye } from 'lucide-react';
import { mockMembers } from '../data/mockData';
import { generateMemberCardPDF } from '../utils/cardGenerator';

interface MemberCard {
  id: string;
  memberId: string;
  memberName: string;
  licenseNumber: string;
  beltColor: string;
  beltRank: string;
  issueDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'lost' | 'renewed';
  cardNumber: string;
  qrCode: string;
  photo?: string;
}

export default function MemberCardManagement() {
  const [memberCards, setMemberCards] = useState<MemberCard[]>(() => {
    // Générer des cartes pour tous les membres
    return mockMembers.map(member => ({
      id: `CARD-${member.id}`,
      memberId: member.id,
      memberName: `${member.firstName} ${member.lastName}`,
      licenseNumber: member.licenseNumber,
      beltColor: member.beltColor,
      beltRank: member.beltRank.toString(),
      issueDate: member.registrationDate,
      expiryDate: new Date(new Date(member.registrationDate).setFullYear(new Date(member.registrationDate).getFullYear() + 1)).toISOString().split('T')[0],
      status: 'active' as const,
      cardNumber: `CSA-${member.id}-${Date.now().toString().slice(-6)}`,
      qrCode: `https://csa-taekwondo.ci/verify/${member.licenseNumber}`,
    }));
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedCard, setSelectedCard] = useState<MemberCard | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const filteredCards = memberCards.filter(card => {
    const matchSearch = card.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       card.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       card.cardNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || card.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: memberCards.length,
    active: memberCards.filter(c => c.status === 'active').length,
    expired: memberCards.filter(c => c.status === 'expired').length,
    lost: memberCards.filter(c => c.status === 'lost').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'expired': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'lost': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'renewed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'expired': return 'Expirée';
      case 'lost': return 'Perdue';
      case 'renewed': return 'Renouvelée';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'expired': return <AlertCircle className="w-4 h-4" />;
      case 'lost': return <AlertCircle className="w-4 h-4" />;
      case 'renewed': return <Clock className="w-4 h-4" />;
      default: return null;
    }
  };

  const getBeltColorHex = (beltColor: string) => {
    const colors: Record<string, string> = {
      white: '#FFFFFF',
      yellow: '#FFD700',
      orange: '#FF8C00',
      green: '#228B22',
      blue: '#1E90FF',
      purple: '#8B008B',
      brown: '#8B4513',
      red: '#DC143C',
      black: '#000000',
    };
    return colors[beltColor] || '#808080';
  };

  const handleGenerateCard = (card: MemberCard) => {
    const member = mockMembers.find(m => m.id === card.memberId);
    if (member) {
      generateMemberCardPDF(member, card);
    }
  };

  const handleGenerateAllCards = () => {
    alert(`Génération de ${stats.active} cartes actives en cours...\n\nLes cartes seront téléchargées au format PDF.`);
    // Simulation de génération en masse
    setTimeout(() => {
      alert('Toutes les cartes ont été générées avec succès!');
    }, 2000);
  };

  const handleMarkAsLost = (cardId: string) => {
    setMemberCards(memberCards.map(c => 
      c.id === cardId ? { ...c, status: 'lost' } : c
    ));
  };

  const handleRenewCard = (cardId: string) => {
    setMemberCards(memberCards.map(c => {
      if (c.id === cardId) {
        const newExpiryDate = new Date();
        newExpiryDate.setFullYear(newExpiryDate.getFullYear() + 1);
        return {
          ...c,
          status: 'renewed',
          expiryDate: newExpiryDate.toISOString().split('T')[0],
          cardNumber: `CSA-${c.memberId}-${Date.now().toString().slice(-6)}`,
        };
      }
      return c;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Gestion des Cartes de Membre</h2>
          <p className="text-slate-400 text-sm">Génération et suivi des cartes d'identité des licenciés</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleGenerateAllCards}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Générer Toutes les Cartes
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <CreditCard className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-slate-400 text-xs">Total Cartes</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/20 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-emerald-400 text-xs">Cartes Actives</p>
              <p className="text-2xl font-bold text-white">{stats.active}</p>
            </div>
          </div>
        </div>
        <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
          <div className="flex items-center gap-3">
            <div className="bg-red-500/20 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <p className="text-red-400 text-xs">Cartes Expirées</p>
              <p className="text-2xl font-bold text-white">{stats.expired}</p>
            </div>
          </div>
        </div>
        <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500/20 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <p className="text-amber-400 text-xs">Cartes Perdues</p>
              <p className="text-2xl font-bold text-white">{stats.lost}</p>
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
            placeholder="Rechercher par nom, licence ou numéro de carte..."
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
          <option value="active">Active</option>
          <option value="expired">Expirée</option>
          <option value="lost">Perdue</option>
          <option value="renewed">Renouvelée</option>
        </select>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCards.map(card => (
          <div
            key={card.id}
            className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden hover:border-emerald-500/30 transition-all cursor-pointer group"
            onClick={() => {
              setSelectedCard(card);
              setShowPreview(true);
            }}
          >
            {/* Card Preview */}
            <div className="relative h-48 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 p-4">
              {/* Logo */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🥋</span>
                </div>
                <div>
                  <p className="text-white text-xs font-bold">CSA</p>
                  <p className="text-emerald-400 text-[8px]">Taekwondo</p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(card.status)}`}>
                  {getStatusLabel(card.status)}
                </span>
              </div>

              {/* Member Info */}
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-white font-bold text-sm">{card.memberName}</p>
                <p className="text-emerald-400 text-xs mt-1">{card.licenseNumber}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div
                    className="w-8 h-2 rounded"
                    style={{ backgroundColor: getBeltColorHex(card.beltColor) }}
                  ></div>
                  <span className="text-slate-300 text-xs">Ceinture {card.beltColor}</span>
                </div>
              </div>

              {/* QR Code Placeholder */}
              <div className="absolute bottom-3 right-3 w-12 h-12 bg-white/10 rounded flex items-center justify-center">
                <QrCode className="w-8 h-8 text-white/50" />
              </div>
            </div>

            {/* Card Details */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <p className="text-slate-400">N° Carte</p>
                  <p className="text-white font-mono">{card.cardNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-400">Expiration</p>
                  <p className="text-white">{new Date(card.expiryDate).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-700">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGenerateCard(card);
                  }}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs transition-colors"
                >
                  <Download className="w-3 h-3" />
                  Télécharger
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCard(card);
                    setShowPreview(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs transition-colors"
                >
                  <Eye className="w-3 h-3" />
                  Aperçu
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Card Preview Modal */}
      {showPreview && selectedCard && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowPreview(false)}>
          <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-700 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Aperçu de la Carte</h3>
              <button onClick={() => setShowPreview(false)} className="text-slate-400 hover:text-white text-2xl">&times;</button>
            </div>
            <div className="p-6 space-y-6">
              {/* RECTO */}
              <div>
                <p className="text-emerald-400 text-xs font-bold mb-2">RECTO</p>
                <div className="relative w-full aspect-[1.586/1] bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 rounded-xl p-6 border-2 border-emerald-500/30 shadow-2xl">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-10 right-10 text-9xl">🥋</div>
                  </div>

                  {/* Header */}
                  <div className="relative flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-3xl">🥋</span>
                      </div>
                      <div>
                        <p className="text-white font-bold text-lg">CONFIDENCE SPORTS</p>
                        <p className="text-emerald-400 text-sm">ACADEMY - TAEKWONDO</p>
                        <p className="text-slate-400 text-xs mt-1">FITKD • Kukkiwon • World Taekwondo</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-400 text-xs">N° Carte</p>
                      <p className="text-white font-mono text-sm">{selectedCard.cardNumber}</p>
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="relative grid grid-cols-3 gap-4 mb-6">
                    {/* Photo Placeholder */}
                    <div className="col-span-1">
                      <div className="w-full aspect-square bg-slate-700 rounded-lg flex items-center justify-center border-2 border-emerald-500/30">
                        <span className="text-6xl">👤</span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="col-span-2 space-y-2">
                      <div>
                        <p className="text-slate-400 text-xs">NOM COMPLET</p>
                        <p className="text-white font-bold text-lg">{selectedCard.memberName}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-slate-400 text-xs">N° LICENCE</p>
                          <p className="text-emerald-400 font-mono text-sm">{selectedCard.licenseNumber}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs">GRADE</p>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-6 h-2 rounded"
                              style={{ backgroundColor: getBeltColorHex(selectedCard.beltColor) }}
                            ></div>
                            <span className="text-white text-sm">{selectedCard.beltColor}</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-slate-400 text-xs">ÉMISSION</p>
                          <p className="text-white text-sm">{new Date(selectedCard.issueDate).toLocaleDateString('fr-FR')}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs">EXPIRATION</p>
                          <p className="text-white text-sm">{new Date(selectedCard.expiryDate).toLocaleDateString('fr-FR')}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="relative flex items-end justify-between">
                    <div className="flex items-center gap-3">
                      {/* QR Code */}
                      <div className="w-16 h-16 bg-white rounded-lg p-1">
                        <div className="w-full h-full bg-slate-900 rounded flex items-center justify-center">
                          <QrCode className="w-12 h-12 text-white" />
                        </div>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs">Vérification</p>
                        <p className="text-emerald-400 text-xs font-mono">csa-taekwondo.ci/verify</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-400 text-xs">Directeur Technique</p>
                      <p className="text-white text-sm italic">Maître Koné Ibrahim</p>
                      <div className="mt-1 w-32 h-8 border-b-2 border-emerald-500/50"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* VERSO */}
              <div>
                <p className="text-emerald-400 text-xs font-bold mb-2">VERSO</p>
                <div className="relative w-full aspect-[1.586/1] bg-slate-900 rounded-xl border-2 border-emerald-500/30 shadow-2xl overflow-hidden">
                  {/* Bande décorative en haut */}
                  <div className="absolute top-0 left-0 right-0 h-8 bg-emerald-500 flex items-center justify-center">
                    <p className="text-slate-900 font-bold text-sm">INFORMATIONS IMPORTANTES</p>
                  </div>

                  {/* QR Code au centre */}
                  <div className="flex flex-col items-center pt-12">
                    <div className="w-32 h-32 bg-white rounded-lg p-2 mb-2">
                      <div className="w-full h-full bg-slate-900 rounded flex items-center justify-center">
                        <QrCode className="w-24 h-24 text-white" />
                      </div>
                    </div>
                    <p className="text-emerald-400 font-bold text-sm">SCANNEZ POUR VÉRIFICATION</p>
                    <p className="text-white text-xs">csa-taekwondo.ci/verify</p>
                  </div>

                  {/* Informations en bas */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 grid grid-cols-2 gap-4">
                    {/* Contact */}
                    <div>
                      <p className="text-emerald-400 font-bold text-xs mb-1">CONTACT</p>
                      <div className="space-y-0.5 text-xs text-white">
                        <p>📍 Cocody, Abidjan, Côte d'Ivoire</p>
                        <p>📞 +225 27 22 44 55 66</p>
                        <p>📧 contact@csa-taekwondo.ci</p>
                        <p>🌐 www.csa-taekwondo.ci</p>
                      </div>
                      <p className="text-red-400 font-bold text-xs mt-2">⚠ URGENCE</p>
                      <div className="space-y-0.5 text-xs text-white">
                        <p>Secrétariat: +225 07 12 34 56 78</p>
                        <p>Directeur: +225 07 98 76 54 32</p>
                      </div>
                    </div>

                    {/* Conditions */}
                    <div>
                      <p className="text-emerald-400 font-bold text-xs mb-1">CONDITIONS</p>
                      <div className="space-y-0.5 text-xs text-slate-300">
                        <p>• Cette carte est strictement personnelle</p>
                        <p>• Elle doit être présentée sur demande</p>
                        <p>• En cas de perte, prévenir immédiatement</p>
                        <p>• Le duplicata est payant (5 000 FCFA)</p>
                        <p>• Carte non transférable</p>
                        <p>• Validité: 1 an à compter de l'émission</p>
                        <p>• Renouvellement annuel obligatoire</p>
                      </div>
                    </div>
                  </div>

                  {/* Bande décorative en bas */}
                  <div className="absolute bottom-0 left-0 right-0 h-6 bg-emerald-500 flex flex-col items-center justify-center">
                    <p className="text-slate-900 font-bold text-xs">CONFIDENCE SPORTS ACADEMY - EXCELLENCE MARTIALE</p>
                    <p className="text-slate-900 text-[8px]">Affiliée FITKD • Homologuée Kukkiwon • Membre World Taekwondo</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => handleGenerateCard(selectedCard)}
                  className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Télécharger PDF (Recto-Verso)
                </button>
                <button
                  onClick={() => handleMarkAsLost(selectedCard.id)}
                  className="px-6 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Marquer Perdue
                </button>
                <button
                  onClick={() => handleRenewCard(selectedCard.id)}
                  className="px-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Renouveler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
