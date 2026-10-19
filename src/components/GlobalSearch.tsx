import { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, TrendingUp, Users, FileText, DollarSign } from 'lucide-react';
import { mockMembers, mockPayments } from '../data/mockData';

interface SearchResult {
  type: 'member' | 'payment' | 'view';
  label: string;
  sublabel: string;
  action: string;
  icon: any;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (action: string) => void;
}

export default function GlobalSearch({ isOpen, onClose, onSelect }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem('csa_search_history');
    return saved ? JSON.parse(saved) : [];
  });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const newResults: SearchResult[] = [];

    // Search members
    mockMembers
      .filter(m => 
        `${m.firstName} ${m.lastName} ${m.licenseNumber}`.toLowerCase().includes(q)
      )
      .slice(0, 5)
      .forEach(m => {
        newResults.push({
          type: 'member',
          label: `${m.firstName} ${m.lastName}`,
          sublabel: m.licenseNumber,
          action: 'members',
          icon: Users
        });
      });

    // Search payments
    mockPayments
      .filter(p => {
        const member = mockMembers.find(m => m.id === p.memberId);
        return member && `${member.firstName} ${member.lastName} ${p.description}`.toLowerCase().includes(q);
      })
      .slice(0, 5)
      .forEach(p => {
        const member = mockMembers.find(m => m.id === p.memberId);
        newResults.push({
          type: 'payment',
          label: `${member?.firstName} ${member?.lastName}`,
          sublabel: `${p.amount.toLocaleString()} FCFA - ${p.description}`,
          action: 'payments',
          icon: DollarSign
        });
      });

    // Search views
    const views = [
      { label: 'Tableau de Bord', action: 'dashboard', icon: TrendingUp },
      { label: 'Licenciés', action: 'members', icon: Users },
      { label: 'Paiements', action: 'payments', icon: DollarSign },
      { label: 'Assiduité', action: 'attendance', icon: FileText },
    ];

    views
      .filter(v => v.label.toLowerCase().includes(q))
      .forEach(v => {
        newResults.push({
          type: 'view',
          label: v.label,
          sublabel: 'Navigation',
          action: v.action,
          icon: v.icon
        });
      });

    setResults(newResults.slice(0, 10));
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    // Add to history
    const newHistory = [query, ...searchHistory.filter(h => h !== query)].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem('csa_search_history', JSON.stringify(newHistory));

    onSelect(result.action);
    setQuery('');
    onClose();
  };

  const handleHistoryClick = (historyItem: string) => {
    setQuery(historyItem);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('csa_search_history');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center pt-20 p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-2xl w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        {/* Search Input */}
        <div className="p-4 border-b border-slate-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher des licenciés, paiements, pages..."
              className="w-full pl-10 pr-10 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {query.length < 2 ? (
            // Show history when no query
            searchHistory.length > 0 ? (
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-slate-400 text-xs font-medium uppercase flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    Recherches récentes
                  </h3>
                  <button
                    onClick={clearHistory}
                    className="text-slate-500 hover:text-red-400 text-xs transition-colors"
                  >
                    Effacer
                  </button>
                </div>
                <div className="space-y-1">
                  {searchHistory.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleHistoryClick(item)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-700/50 transition-colors flex items-center gap-2"
                    >
                      <Clock className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-300 text-sm">{item}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500">
                <Search className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Commencez à taper pour rechercher</p>
              </div>
            )
          ) : results.length > 0 ? (
            <div className="p-2">
              {results.map((result, idx) => {
                const Icon = result.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(result)}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-700/50 transition-colors flex items-start gap-3"
                  >
                    <div className="p-2 bg-slate-700 rounded-lg">
                      <Icon className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-white text-sm font-medium">{result.label}</span>
                        <span className="px-1.5 py-0.5 bg-slate-700 rounded text-[10px] text-slate-400 capitalize">
                          {result.type === 'member' ? 'Licencié' : result.type === 'payment' ? 'Paiement' : 'Page'}
                        </span>
                      </div>
                      <p className="text-slate-500 text-xs mt-0.5 truncate">{result.sublabel}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500">
              <p className="text-sm">Aucun résultat pour "{query}"</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-700 flex items-center justify-between text-xs text-slate-500">
          <span>
            <kbd className="px-1.5 py-0.5 bg-slate-700 rounded">↑↓</kbd> Naviguer
          </span>
          <span>
            <kbd className="px-1.5 py-0.5 bg-slate-700 rounded">Enter</kbd> Sélectionner
          </span>
          <span>
            <kbd className="px-1.5 py-0.5 bg-slate-700 rounded">Esc</kbd> Fermer
          </span>
        </div>
      </div>
    </div>
  );
}
