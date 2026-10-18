import { useState, useEffect } from 'react';
import { Star, X, GripVertical } from 'lucide-react';

interface Favorite {
  id: string;
  label: string;
  icon: string;
  view: string;
  order: number;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>(() => {
    const saved = localStorage.getItem('csa_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('csa_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (favorite: Omit<Favorite, 'id' | 'order'>) => {
    const newFavorite: Favorite = {
      ...favorite,
      id: Math.random().toString(36).substr(2, 9),
      order: favorites.length
    };
    setFavorites(prev => [...prev, newFavorite]);
  };

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(f => f.id !== id));
  };

  const reorderFavorites = (fromIndex: number, toIndex: number) => {
    setFavorites(prev => {
      const updated = [...prev];
      const [removed] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, removed);
      return updated.map((f, i) => ({ ...f, order: i }));
    });
  };

  const isFavorite = (view: string) => {
    return favorites.some(f => f.view === view);
  };

  const toggleFavorite = (favorite: Omit<Favorite, 'id' | 'order'>) => {
    if (isFavorite(favorite.view)) {
      const fav = favorites.find(f => f.view === favorite.view);
      if (fav) removeFavorite(fav.id);
    } else {
      addFavorite(favorite);
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    reorderFavorites,
    isFavorite,
    toggleFavorite
  };
}

export function FavoritesBar({ 
  favorites, 
  onSelect,
  onRemove 
}: { 
  favorites: Favorite[];
  onSelect: (view: string) => void;
  onRemove: (id: string) => void;
}) {
  if (favorites.length === 0) return null;

  return (
    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Star className="w-4 h-4 text-amber-400" />
        <h3 className="text-white font-semibold text-sm">Raccourcis</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {favorites.map(fav => (
          <div
            key={fav.id}
            className="group flex items-center gap-2 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 hover:border-emerald-500/30 rounded-lg px-3 py-2 transition-all cursor-pointer"
            onClick={() => onSelect(fav.view)}
          >
            <span className="text-lg">{fav.icon}</span>
            <span className="text-white text-sm">{fav.label}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(fav.id);
              }}
              className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-400 transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FavoriteButton({ 
  view, 
  label, 
  icon,
  isFavorite,
  onToggle 
}: { 
  view: string;
  label: string;
  icon: string;
  isFavorite: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={`p-2 rounded-lg transition-all ${
        isFavorite 
          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
          : 'bg-slate-700/50 text-slate-400 border border-slate-600 hover:border-amber-500/30 hover:text-amber-400'
      }`}
      title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
    >
      <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
    </button>
  );
}
