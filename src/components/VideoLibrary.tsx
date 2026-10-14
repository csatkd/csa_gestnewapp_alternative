import { useState } from 'react';
import { Play, Clock, Users, Award, Search, Filter, BookOpen, Video, Star } from 'lucide-react';

interface VideoTechnique {
  id: string;
  title: string;
  category: 'poomsae' | 'kyorugi' | 'kyokpa' | 'hosinsul' | 'theory';
  level: 'debutant' | 'intermediaire' | 'avance' | 'expert';
  duration: string;
  instructor: string;
  thumbnail: string;
  views: number;
  rating: number;
  description: string;
  tags: string[];
}

const mockVideos: VideoTechnique[] = [
  {
    id: 'V001',
    title: 'Taegeuk Il Jang - Forme Complète',
    category: 'poomsae',
    level: 'debutant',
    duration: '12:34',
    instructor: 'Maître Koné',
    thumbnail: '🥋',
    views: 1250,
    rating: 4.8,
    description: 'Apprentissage complet de la première forme Taegeuk Il Jang avec explications détaillées.',
    tags: ['poomsae', 'forme', 'debutant', 'taegeuk']
  },
  {
    id: 'V002',
    title: 'Techniques de Kicks de Base',
    category: 'kyorugi',
    level: 'debutant',
    duration: '15:20',
    instructor: 'Coach Traoré',
    thumbnail: '🦵',
    views: 2340,
    rating: 4.9,
    description: 'Maîtrisez les kicks fondamentaux : Ap Chagi, Dollyo Chagi, Yop Chagi.',
    tags: ['kicks', 'combat', 'technique', 'base']
  },
  {
    id: 'V003',
    title: 'Casse de Planche - Technique Avancée',
    category: 'kyokpa',
    level: 'avance',
    duration: '08:45',
    instructor: 'Maître Koné',
    thumbnail: '💥',
    views: 890,
    rating: 4.7,
    description: 'Techniques avancées de casse pour les ceintures noires.',
    tags: ['casse', 'kyokpa', 'puissance', 'avance']
  },
  {
    id: 'V004',
    title: 'Self-Défense - Dégagement de Poignet',
    category: 'hosinsul',
    level: 'intermediaire',
    duration: '10:15',
    instructor: 'Coach Diallo',
    thumbnail: '🛡️',
    views: 1560,
    rating: 4.6,
    description: 'Techniques de self-défense pour se libérer d\'une saisie au poignet.',
    tags: ['self-defense', 'hosinsul', 'dégagement', 'pratique']
  },
  {
    id: 'V005',
    title: 'Stratégie de Combat - Kyorugi',
    category: 'kyorugi',
    level: 'expert',
    duration: '22:30',
    instructor: 'Coach Bamba',
    thumbnail: '⚔️',
    views: 670,
    rating: 4.9,
    description: 'Stratégies avancées pour la compétition de combat.',
    tags: ['stratégie', 'combat', 'compétition', 'expert']
  },
  {
    id: 'V006',
    title: 'Terminologie Coréenne - Les Bases',
    category: 'theory',
    level: 'debutant',
    duration: '18:00',
    instructor: 'Maître Koné',
    thumbnail: '📚',
    views: 3200,
    rating: 4.8,
    description: 'Apprenez le vocabulaire coréen essentiel pour le Taekwondo.',
    tags: ['théorie', 'coréen', 'vocabulaire', 'base']
  },
  {
    id: 'V007',
    title: 'Taegeuk Oh Jang - Forme Complète',
    category: 'poomsae',
    level: 'intermediaire',
    duration: '14:20',
    instructor: 'Maître Koné',
    thumbnail: '🥋',
    views: 980,
    rating: 4.7,
    description: 'Cinquième forme Taegeuk pour les ceintures bleues.',
    tags: ['poomsae', 'forme', 'intermediaire', 'taegeuk']
  },
  {
    id: 'V008',
    title: 'Préparation Physique Spécifique',
    category: 'kyorugi',
    level: 'intermediaire',
    duration: '25:00',
    instructor: 'Coach Traoré',
    thumbnail: '💪',
    views: 1890,
    rating: 4.8,
    description: 'Exercices de préparation physique pour améliorer la performance.',
    tags: ['préparation', 'physique', 'fitness', 'performance']
  }
];

export default function VideoLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [selectedVideo, setSelectedVideo] = useState<VideoTechnique | null>(null);

  const filteredVideos = mockVideos.filter(video => {
    const matchSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchCategory = filterCategory === 'all' || video.category === filterCategory;
    const matchLevel = filterLevel === 'all' || video.level === filterLevel;
    return matchSearch && matchCategory && matchLevel;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'poomsae': return '🥋';
      case 'kyorugi': return '⚔️';
      case 'kyokpa': return '💥';
      case 'hosinsul': return '🛡️';
      case 'theory': return '📚';
      default: return '🎥';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'poomsae': return 'Poomsae (Formes)';
      case 'kyorugi': return 'Kyorugi (Combat)';
      case 'kyokpa': return 'Kyokpa (Casse)';
      case 'hosinsul': return 'Hosinsul (Self-Défense)';
      case 'theory': return 'Théorie';
      default: return category;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'debutant': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediaire': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'avance': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'expert': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'debutant': return 'Débutant';
      case 'intermediaire': return 'Intermédiaire';
      case 'avance': return 'Avancé';
      case 'expert': return 'Expert';
      default: return level;
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`w-3 h-3 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Bibliothèque de Techniques</h2>
          <p className="text-slate-400 text-sm">Vidéos pédagogiques et tutoriels</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Video className="w-4 h-4" />
          Ajouter une Vidéo
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-5 border border-blue-500/20">
          <div className="flex items-center justify-between mb-3">
            <Video className="w-8 h-8 text-blue-400" />
            <span className="text-blue-400 text-xs font-medium bg-blue-500/20 px-2 py-1 rounded">Total</span>
          </div>
          <p className="text-slate-400 text-sm">Vidéos Disponibles</p>
          <p className="text-3xl font-bold text-white mt-1">{mockVideos.length}</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-xl p-5 border border-emerald-500/20">
          <div className="flex items-center justify-between mb-3">
            <Clock className="w-8 h-8 text-emerald-400" />
            <span className="text-emerald-400 text-xs font-medium bg-emerald-500/20 px-2 py-1 rounded">Total</span>
          </div>
          <p className="text-slate-400 text-sm">Heures de Contenu</p>
          <p className="text-3xl font-bold text-white mt-1">2.5h</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl p-5 border border-purple-500/20">
          <div className="flex items-center justify-between mb-3">
            <Users className="w-8 h-8 text-purple-400" />
            <span className="text-purple-400 text-xs font-medium bg-purple-500/20 px-2 py-1 rounded">Total</span>
          </div>
          <p className="text-slate-400 text-sm">Vues Totales</p>
          <p className="text-3xl font-bold text-white mt-1">{(mockVideos.reduce((sum, v) => sum + v.views, 0) / 1000).toFixed(1)}K</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 rounded-xl p-5 border border-yellow-500/20">
          <div className="flex items-center justify-between mb-3">
            <Star className="w-8 h-8 text-yellow-400" />
            <span className="text-yellow-400 text-xs font-medium bg-yellow-500/20 px-2 py-1 rounded">Moyenne</span>
          </div>
          <p className="text-slate-400 text-sm">Note Moyenne</p>
          <p className="text-3xl font-bold text-white mt-1">
            {(mockVideos.reduce((sum, v) => sum + v.rating, 0) / mockVideos.length).toFixed(1)}/5
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher une technique..."
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
          <option value="poomsae">🥋 Poomsae</option>
          <option value="kyorugi">⚔️ Kyorugi</option>
          <option value="kyokpa">💥 Kyokpa</option>
          <option value="hosinsul">🛡️ Hosinsul</option>
          <option value="theory">📚 Théorie</option>
        </select>
        <select
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value)}
          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
        >
          <option value="all">Tous niveaux</option>
          <option value="debutant">Débutant</option>
          <option value="intermediaire">Intermédiaire</option>
          <option value="avance">Avancé</option>
          <option value="expert">Expert</option>
        </select>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map(video => (
          <div
            key={video.id}
            className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden hover:border-emerald-500/30 transition-all cursor-pointer group"
            onClick={() => setSelectedVideo(video)}
          >
            {/* Thumbnail */}
            <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center relative">
              <span className="text-6xl">{video.thumbnail}</span>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-white text-xs">
                {video.duration}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <h3 className="text-white font-semibold group-hover:text-emerald-400 transition-colors line-clamp-2">
                  {video.title}
                </h3>
                <span className="text-2xl ml-2">{getCategoryIcon(video.category)}</span>
              </div>

              <p className="text-slate-400 text-sm line-clamp-2">{video.description}</p>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded border ${getLevelColor(video.level)}`}>
                    {getLevelLabel(video.level)}
                  </span>
                  <span className="text-slate-500">{video.instructor}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-700">
                <div className="flex items-center gap-2">
                  {renderStars(video.rating)}
                  <span className="text-slate-400 text-xs">{video.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400 text-xs">
                  <Users className="w-3 h-3" />
                  <span>{video.views.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {video.tags.slice(0, 3).map((tag, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-slate-700/50 rounded text-xs text-slate-400">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Detail Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedVideo(null)}>
          <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            {/* Video Player Placeholder */}
            <div className="h-96 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center relative">
              <span className="text-9xl">{selectedVideo.thumbnail}</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center cursor-pointer hover:bg-emerald-600 transition-colors">
                  <Play className="w-12 h-12 text-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1 rounded text-white text-sm">
                {selectedVideo.duration}
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{selectedVideo.title}</h2>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-2xl">{getCategoryIcon(selectedVideo.category)}</span>
                  <span className="text-slate-400">{getCategoryLabel(selectedVideo.category)}</span>
                  <span className={`px-2 py-0.5 rounded border ${getLevelColor(selectedVideo.level)}`}>
                    {getLevelLabel(selectedVideo.level)}
                  </span>
                  <span className="text-slate-400">par {selectedVideo.instructor}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {renderStars(selectedVideo.rating)}
                  <span className="text-white font-bold">{selectedVideo.rating}/5</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <Users className="w-4 h-4" />
                  <span>{selectedVideo.views.toLocaleString()} vues</span>
                </div>
              </div>

              <div>
                <h4 className="text-emerald-400 font-semibold text-sm mb-2">Description</h4>
                <p className="text-slate-300">{selectedVideo.description}</p>
              </div>

              <div>
                <h4 className="text-emerald-400 font-semibold text-sm mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedVideo.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-slate-700 rounded-lg text-sm text-slate-300">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-700">
                <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  Regarder la Vidéo
                </button>
                <button
                  onClick={() => setSelectedVideo(null)}
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
