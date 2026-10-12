import { useCountdown } from './NotificationsPanel';
import { Trophy, MapPin, Calendar } from 'lucide-react';
import { Competition } from '../types';

export default function CompetitionCountdown({ competition }: { competition: Competition }) {
  const { days, hours, minutes, seconds } = useCountdown(competition.date);
  const isPast = days === 0 && hours === 0 && minutes === 0 && seconds === 0;

  const getTypeBadge = () => {
    switch (competition.type) {
      case 'national': return <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-xs">🏛️ National</span>;
      case 'international': return <span className="bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded text-xs">🌍 International</span>;
      case 'regional': return <span className="bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded text-xs">📍 Régional</span>;
    }
  };

  if (isPast) {
    return (
      <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-white font-semibold">{competition.name}</h4>
          <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-xs">Terminé</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-400">
          <span className="flex items-center gap-1"><Trophy className="w-4 h-4 text-yellow-400" />{competition.medals.gold} Or</span>
          <span className="flex items-center gap-1"><Trophy className="w-4 h-4 text-gray-300" />{competition.medals.silver} Argent</span>
          <span className="flex items-center gap-1"><Trophy className="w-4 h-4 text-amber-600" />{competition.medals.bronze} Bronze</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 rounded-xl p-5 border border-slate-700 hover:border-amber-500/30 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="text-white font-semibold text-lg">{competition.name}</h4>
          <div className="flex items-center gap-3 mt-1">
            {getTypeBadge()}
            <span className="text-slate-400 text-xs flex items-center gap-1">
              <MapPin className="w-3 h-3" />{competition.location}
            </span>
          </div>
        </div>
      </div>

      {/* Countdown */}
      <div className="grid grid-cols-4 gap-2 my-4">
        <div className="bg-slate-700/50 rounded-lg p-3 text-center">
          <p className="text-amber-400 text-2xl font-bold">{days}</p>
          <p className="text-slate-500 text-xs">Jours</p>
        </div>
        <div className="bg-slate-700/50 rounded-lg p-3 text-center">
          <p className="text-amber-400 text-2xl font-bold">{hours}</p>
          <p className="text-slate-500 text-xs">Heures</p>
        </div>
        <div className="bg-slate-700/50 rounded-lg p-3 text-center">
          <p className="text-amber-400 text-2xl font-bold">{minutes}</p>
          <p className="text-slate-500 text-xs">Minutes</p>
        </div>
        <div className="bg-slate-700/50 rounded-lg p-3 text-center">
          <p className="text-amber-400 text-2xl font-bold">{seconds}</p>
          <p className="text-slate-500 text-xs">Secondes</p>
        </div>
      </div>

      {/* Info */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400 flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {new Date(competition.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </span>
        <span className="text-emerald-400 text-xs">{competition.registeredAthletes.length} athlète(s) engagé(s)</span>
      </div>

      {/* Medals Preview */}
      {Object.values(competition.medals).some(m => m > 0) && (
        <div className="mt-3 pt-3 border-t border-slate-700 flex items-center gap-4 text-xs text-slate-400">
          <span>Palmarès saison:</span>
          <span className="flex items-center gap-1">🥇 {competition.medals.gold}</span>
          <span className="flex items-center gap-1">🥈 {competition.medals.silver}</span>
          <span className="flex items-center gap-1">🥉 {competition.medals.bronze}</span>
        </div>
      )}
    </div>
  );
}
