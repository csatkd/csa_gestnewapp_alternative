import { useState, useEffect } from 'react';
import { Maximize2, Minimize2, QrCode, UserCheck, Clock, CheckCircle, XCircle, Volume2, VolumeX } from 'lucide-react';
import { mockMembers, mockAttendanceRecords } from '../data/mockData';

export default function KioskMode() {
  const [isKiosk, setIsKiosk] = useState(false);
  const [lastScanned, setLastScanned] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [scanAnimation, setScanAnimation] = useState(false);

  const handleScan = (memberId: string) => {
    const member = mockMembers.find(m => m.id === memberId);
    if (!member) return;

    setScanAnimation(true);
    setLastScanned(memberId);

    // Play sound effect
    if (soundEnabled) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.3);
      } catch (e) {
        // Audio not available
      }
    }

    setTimeout(() => setScanAnimation(false), 1000);
  };

  if (!isKiosk) {
    return (
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <QrCode className="w-10 h-10 text-emerald-400" />
          </div>
          <h3 className="text-white font-bold text-xl mb-2">Mode Kiosk / Pointage</h3>
          <p className="text-slate-400 text-sm mb-6">
            Activez le mode plein écran pour transformer cet appareil en borne de pointage automatique par scan QR/NFC.
          </p>
          <button
            onClick={() => setIsKiosk(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 mx-auto"
          >
            <Maximize2 className="w-5 h-5" />
            Activer le Mode Kiosk
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-900 z-50 flex flex-col">
      {/* Kiosk Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">🥋</span>
          </div>
          <div>
            <h2 className="text-white font-bold text-sm">CSA — Borne de Pointage</h2>
            <p className="text-slate-500 text-xs">Présentez votre badge QR/NFC</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-lg ${soundEnabled ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-500 bg-slate-700'}`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsKiosk(false)}
            className="p-2 text-slate-400 hover:text-white bg-slate-700 rounded-lg"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scanner Area */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          {/* Scan Animation */}
          <div className={`relative w-64 h-64 mx-auto mb-8 ${scanAnimation ? 'scale-110' : ''} transition-transform duration-300`}>
            <div className="absolute inset-0 border-4 border-emerald-500/30 rounded-3xl"></div>
            <div className={`absolute inset-4 border-2 ${scanAnimation ? 'border-emerald-400' : 'border-slate-600'} rounded-2xl transition-colors duration-300`}>
              {/* Scanning line animation */}
              {scanAnimation && (
                <div className="absolute inset-x-0 h-1 bg-emerald-400 animate-bounce rounded-full shadow-lg shadow-emerald-400/50" style={{ top: '50%' }}></div>
              )}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              {lastScanned ? (
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-2" />
                  <p className="text-emerald-400 font-bold text-lg">
                    {mockMembers.find(m => m.id === lastScanned)?.firstName}{' '}
                    {mockMembers.find(m => m.id === lastScanned)?.lastName}
                  </p>
                  <p className="text-slate-400 text-sm">Pointage enregistré ✓</p>
                </div>
              ) : (
                <div className="text-center">
                  <QrCode className="w-16 h-16 text-slate-600 mx-auto mb-2" />
                  <p className="text-slate-500 text-sm">En attente de scan...</p>
                </div>
              )}
            </div>
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-500 rounded-tl-3xl"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-500 rounded-tr-3xl"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-500 rounded-bl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-500 rounded-br-3xl"></div>
          </div>

          {/* Quick scan buttons (simulation) */}
          <div className="grid grid-cols-3 gap-2 max-w-lg mx-auto">
            {mockMembers.slice(0, 6).map(member => (
              <button
                key={member.id}
                onClick={() => handleScan(member.id)}
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-emerald-500/50 rounded-lg p-3 transition-all text-center"
              >
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center mx-auto mb-1">
                  <span className="text-white text-xs font-bold">{member.firstName[0]}{member.lastName[0]}</span>
                </div>
                <p className="text-white text-xs truncate">{member.firstName}</p>
                <p className="text-slate-500 text-[10px]">{member.licenseNumber}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="bg-slate-800 border-t border-slate-700 px-6 py-3">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-emerald-400 font-bold text-lg">{mockAttendanceRecords.filter(r => r.status === 'present').length}</p>
              <p className="text-slate-500 text-xs">Présents</p>
            </div>
            <div className="text-center">
              <p className="text-amber-400 font-bold text-lg">{mockAttendanceRecords.filter(r => r.status === 'late').length}</p>
              <p className="text-slate-500 text-xs">Retards</p>
            </div>
            <div className="text-center">
              <p className="text-red-400 font-bold text-lg">{mockAttendanceRecords.filter(r => r.status === 'absent').length}</p>
              <p className="text-slate-500 text-xs">Absents</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white text-sm font-medium">{new Date().toLocaleDateString('fr-FR')}</p>
            <p className="text-slate-500 text-xs">Séance d'entraînement</p>
          </div>
        </div>
      </div>
    </div>
  );
}
