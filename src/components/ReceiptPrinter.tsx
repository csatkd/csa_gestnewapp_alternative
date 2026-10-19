import { useState } from 'react';
import { Printer, Bluetooth, FileText, Download, CheckCircle, AlertCircle, Wifi, Settings } from 'lucide-react';
import { mockMembers, mockPayments } from '../data/mockData';
import { Payment } from '../types';
import { generateReceiptA4, generateReceipt80mm, generateReceipt58mm, generateReceiptHTML, generateReceiptESCPOS } from '../utils/receiptGenerator';

export default function ReceiptPrinter() {
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<'a4' | '80mm' | '58mm' | 'html' | 'escpos'>('a4');
  const [bluetoothConnected, setBluetoothConnected] = useState(false);
  const [bluetoothDevice, setBluetoothDevice] = useState<string>('');
  const [isPrinting, setIsPrinting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPayments = mockPayments.filter(p => {
    const member = mockMembers.find(m => m.id === p.memberId);
    return member && `${member.firstName} ${member.lastName} ${p.description}`.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const connectBluetooth = async () => {
    try {
      // Simulation de connexion Bluetooth
      setIsPrinting(true);
      setTimeout(() => {
        setBluetoothConnected(true);
        setBluetoothDevice('Imprimante Thermique CSA-001');
        setIsPrinting(false);
      }, 2000);
    } catch (error) {
      console.error('Erreur de connexion Bluetooth:', error);
      setIsPrinting(false);
    }
  };

  const disconnectBluetooth = () => {
    setBluetoothConnected(false);
    setBluetoothDevice('');
  };

  const handlePrint = () => {
    if (!selectedPayment) return;
    
    const member = mockMembers.find(m => m.id === selectedPayment.memberId);
    if (!member) return;

    setIsPrinting(true);

    setTimeout(() => {
      switch (selectedFormat) {
        case 'a4':
          generateReceiptA4(selectedPayment, member);
          break;
        case '80mm':
          generateReceipt80mm(selectedPayment, member);
          break;
        case '58mm':
          generateReceipt58mm(selectedPayment, member);
          break;
        case 'html':
          const htmlContent = generateReceiptHTML(selectedPayment, member);
          const printWindow = window.open('', '_blank');
          if (printWindow) {
            printWindow.document.write(htmlContent);
            printWindow.document.close();
            printWindow.focus();
            setTimeout(() => printWindow.print(), 500);
          }
          break;
        case 'escpos':
          if (bluetoothConnected) {
            const escposData = generateReceiptESCPOS(selectedPayment, member);
            console.log('Envoi ESC/POS:', escposData);
            alert('Reçu envoyé à l\'imprimante thermique via Bluetooth');
          } else {
            alert('Veuillez d\'abord connecter l\'imprimante Bluetooth');
          }
          break;
      }
      setIsPrinting(false);
    }, 1000);
  };

  const handlePreview = () => {
    if (!selectedPayment) return;
    const member = mockMembers.find(m => m.id === selectedPayment.memberId);
    if (!member) return;

    const htmlContent = generateReceiptHTML(selectedPayment, member);
    const previewWindow = window.open('', '_blank');
    if (previewWindow) {
      previewWindow.document.write(htmlContent);
      previewWindow.document.close();
    }
  };

  const formatOptions = [
    { value: 'a4', label: 'A4 Standard', icon: '📄', description: 'Format A4 pour archivage' },
    { value: '80mm', label: 'Ticket 80mm', icon: '🧾', description: 'Imprimante thermique 80mm' },
    { value: '58mm', label: 'Ticket 58mm', icon: '🎫', description: 'Imprimante thermique 58mm' },
    { value: 'html', label: 'HTML Web', icon: '🌐', description: 'Impression via navigateur' },
    { value: 'escpos', label: 'ESC/POS Direct', icon: '📡', description: 'Impression directe Bluetooth' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Impression de Reçus</h2>
          <p className="text-slate-400 text-sm">Génération et impression multi-format avec support Bluetooth</p>
        </div>
      </div>

      {/* Bluetooth Status */}
      <div className={`rounded-xl p-5 border ${bluetoothConnected ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-800/50 border-slate-700'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${bluetoothConnected ? 'bg-emerald-500/20' : 'bg-slate-700/50'}`}>
              <Bluetooth className={`w-6 h-6 ${bluetoothConnected ? 'text-emerald-400' : 'text-slate-400'}`} />
            </div>
            <div>
              <h3 className={`font-semibold ${bluetoothConnected ? 'text-emerald-400' : 'text-white'}`}>
                {bluetoothConnected ? 'Imprimante Connectée' : 'Imprimante Non Connectée'}
              </h3>
              <p className="text-slate-400 text-sm">
                {bluetoothConnected ? bluetoothDevice : 'Aucune imprimante thermique détectée'}
              </p>
            </div>
          </div>
          <button
            onClick={bluetoothConnected ? disconnectBluetooth : connectBluetooth}
            disabled={isPrinting}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              bluetoothConnected
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {bluetoothConnected ? 'Déconnecter' : 'Connecter Bluetooth'}
          </button>
        </div>
      </div>

      {/* Payment Selection */}
      <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
        <h3 className="text-white font-semibold mb-4">Sélectionner un Paiement</h3>
        
        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Rechercher par nom ou description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Payments List */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredPayments.map(payment => {
            const member = mockMembers.find(m => m.id === payment.memberId);
            if (!member) return null;

            return (
              <div
                key={payment.id}
                onClick={() => setSelectedPayment(payment)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedPayment?.id === payment.id
                    ? 'bg-emerald-500/20 border-emerald-500/50'
                    : 'bg-slate-700/30 border-slate-600 hover:border-slate-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{member.firstName} {member.lastName}</p>
                    <p className="text-slate-400 text-sm">{payment.description}</p>
                    <p className="text-slate-500 text-xs mt-1">
                      {new Date(payment.date).toLocaleDateString('fr-FR')} • N° {payment.id}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-400 font-bold">{payment.paidAmount.toLocaleString()} F</p>
                    <p className="text-slate-500 text-xs">
                      sur {payment.amount.toLocaleString()} F
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Format Selection */}
      {selectedPayment && (
        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
          <h3 className="text-white font-semibold mb-4">Format d'Impression</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {formatOptions.map(format => (
              <div
                key={format.value}
                onClick={() => setSelectedFormat(format.value as any)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedFormat === format.value
                    ? 'bg-emerald-500/20 border-emerald-500/50'
                    : 'bg-slate-700/30 border-slate-600 hover:border-slate-500'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{format.icon}</span>
                  <div className="flex-1">
                    <p className="text-white font-medium">{format.label}</p>
                    <p className="text-slate-400 text-xs mt-1">{format.description}</p>
                  </div>
                  {selectedFormat === format.value && (
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {selectedPayment && (
        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
          <h3 className="text-white font-semibold mb-4">Actions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={handlePreview}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <FileText className="w-5 h-5" />
              Aperçu
            </button>
            
            <button
              onClick={handlePrint}
              disabled={isPrinting || (selectedFormat === 'escpos' && !bluetoothConnected)}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPrinting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Impression...
                </>
              ) : (
                <>
                  <Printer className="w-5 h-5" />
                  Imprimer
                </>
              )}
            </button>
            
            <button
              onClick={() => {
                const member = mockMembers.find(m => m.id === selectedPayment.memberId);
                if (member) {
                  switch (selectedFormat) {
                    case 'a4':
                      generateReceiptA4(selectedPayment, member);
                      break;
                    case '80mm':
                      generateReceipt80mm(selectedPayment, member);
                      break;
                    case '58mm':
                      generateReceipt58mm(selectedPayment, member);
                      break;
                  }
                }
              }}
              disabled={selectedFormat === 'html' || selectedFormat === 'escpos'}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-5 h-5" />
              Télécharger PDF
            </button>
          </div>

          {selectedFormat === 'escpos' && !bluetoothConnected && (
            <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <p className="text-amber-400 text-sm">
                Connectez d'abord une imprimante thermique Bluetooth pour utiliser le format ESC/POS
              </p>
            </div>
          )}
        </div>
      )}

      {/* Selected Payment Details */}
      {selectedPayment && (
        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
          <h3 className="text-white font-semibold mb-4">Détails du Paiement Sélectionné</h3>
          
          {(() => {
            const member = mockMembers.find(m => m.id === selectedPayment.memberId);
            if (!member) return null;

            return (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <p className="text-slate-400 text-xs">Licencié</p>
                    <p className="text-white font-medium">{member.firstName} {member.lastName}</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <p className="text-slate-400 text-xs">N° Licence</p>
                    <p className="text-white font-medium">{member.licenseNumber}</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <p className="text-slate-400 text-xs">Description</p>
                    <p className="text-white font-medium">{selectedPayment.description}</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <p className="text-slate-400 text-xs">Date</p>
                    <p className="text-white font-medium">{new Date(selectedPayment.date).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <p className="text-slate-400 text-xs">Montant Total</p>
                    <p className="text-white font-medium">{selectedPayment.amount.toLocaleString()} FCFA</p>
                  </div>
                  <div className="bg-emerald-500/10 rounded-lg p-3 border border-emerald-500/30">
                    <p className="text-emerald-400 text-xs">Montant Payé</p>
                    <p className="text-emerald-400 font-bold">{selectedPayment.paidAmount.toLocaleString()} FCFA</p>
                  </div>
                </div>

                {selectedPayment.installments.length > 0 && (
                  <div>
                    <p className="text-slate-400 text-sm mb-2">Acomptes:</p>
                    <div className="space-y-2">
                      {selectedPayment.installments.map((inst, idx) => (
                        <div key={inst.id} className="flex items-center justify-between bg-slate-700/30 rounded-lg p-2">
                          <span className="text-slate-300 text-sm">
                            {idx + 1}. {new Date(inst.date).toLocaleDateString('fr-FR')}
                          </span>
                          <span className="text-white font-medium">{inst.amount.toLocaleString()} FCFA</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* Information */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5">
        <h3 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Configuration des Imprimantes
        </h3>
        <div className="space-y-2 text-sm text-slate-300">
          <p><strong>Formats supportés:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>A4 Standard:</strong> Pour archivage et documents officiels</li>
            <li><strong>Ticket 80mm:</strong> Imprimantes thermiques standard (Epson, Star, etc.)</li>
            <li><strong>Ticket 58mm:</strong> Imprimantes thermiques compactes</li>
            <li><strong>HTML Web:</strong> Impression via navigateur (toutes imprimantes)</li>
            <li><strong>ESC/POS:</strong> Impression directe via Bluetooth (nécessite connexion)</li>
          </ul>
          <p className="mt-3"><strong>Connexion Bluetooth:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Activez le Bluetooth sur votre appareil</li>
            <li>Allumez votre imprimante thermique</li>
            <li>Cliquez sur "Connecter Bluetooth"</li>
            <li>Sélectionnez votre imprimante dans la liste</li>
            <li>Utilisez le format ESC/POS pour impression directe</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
