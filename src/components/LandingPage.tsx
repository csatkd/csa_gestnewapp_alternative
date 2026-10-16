import { useState, useEffect } from 'react';
import { 
  Award, Users, Calendar, TrendingUp, Phone, Mail, MapPin, 
  ChevronDown, Play, Star, CheckCircle, ArrowRight, Menu, X,
  Shield, Target, Zap, Globe, Clock, DollarSign
} from 'lucide-react';

export default function LandingPage({ onLogin, onEnter }: { onLogin: () => void; onEnter: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [stats, setStats] = useState({
    members: 0,
    coaches: 0,
    years: 0,
    medals: 0
  });

  // Animation au scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation des statistiques
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const targetStats = {
      members: 250,
      coaches: 12,
      years: 15,
      medals: 180
    };

    let current = 0;
    const timer = setInterval(() => {
      current++;
      const progress = current / steps;
      setStats({
        members: Math.floor(targetStats.members * progress),
        coaches: Math.floor(targetStats.coaches * progress),
        years: Math.floor(targetStats.years * progress),
        medals: Math.floor(targetStats.medals * progress)
      });

      if (current >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Rotation automatique des témoignages
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const testimonials = [
    {
      name: 'Kouassi Aya Marie',
      role: 'Ceinture Noire 1er Dan',
      text: 'La CSA m\'a permis de réaliser mon rêve. L\'encadrement est exceptionnel et les résultats sont au rendez-vous.',
      rating: 5
    },
    {
      name: 'Traoré Moussa',
      role: 'Champion National Junior',
      text: 'Grâce à la CSA, j\'ai pu participer aux compétitions internationales. Merci à toute l\'équipe !',
      rating: 5
    },
    {
      name: 'Diallo Aminata',
      role: 'Parent d\'élève',
      text: 'Mon fils a complètement changé depuis qu\'il pratique à la CSA. Discipline, confiance et respect.',
      rating: 5
    }
  ];

  const services = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Cours pour Tous',
      description: 'Programmes adaptés à tous les âges et niveaux, de 4 à 60 ans',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Compétition',
      description: 'Préparation aux compétitions nationales et internationales',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Self-Défense',
      description: 'Techniques de défense personnelle pour tous',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Formation Continue',
      description: 'Stages et formations pour progresser rapidement',
      color: 'from-amber-500 to-amber-600'
    }
  ];

  const features = [
    { icon: <Users className="w-6 h-6" />, text: 'Coachs certifiés Kukkiwon' },
    { icon: <Calendar className="w-6 h-6" />, text: 'Planning flexible' },
    { icon: <TrendingUp className="w-6 h-6" />, text: 'Suivi personnalisé' },
    { icon: <Globe className="w-6 h-6" />, text: 'Affiliations internationales' },
    { icon: <Clock className="w-6 h-6" />, text: 'Horaires étendus' },
    { icon: <DollarSign className="w-6 h-6" />, text: 'Tarifs compétitifs' }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🥋</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Confidence Sports</h1>
                <p className="text-xs text-emerald-400">Academy - Taekwondo</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('accueil')} className="text-white hover:text-emerald-400 transition-colors">
                Accueil
              </button>
              <button onClick={() => scrollToSection('services')} className="text-white hover:text-emerald-400 transition-colors">
                Services
              </button>
              <button onClick={() => scrollToSection('apropos')} className="text-white hover:text-emerald-400 transition-colors">
                À Propos
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-white hover:text-emerald-400 transition-colors">
                Contact
              </button>
              <button 
                onClick={onLogin}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-medium transition-colors"
              >
                Espace Parent
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-slate-800 rounded-lg mt-4 p-4 space-y-4">
              <button onClick={() => scrollToSection('accueil')} className="block w-full text-left text-white hover:text-emerald-400">
                Accueil
              </button>
              <button onClick={() => scrollToSection('services')} className="block w-full text-left text-white hover:text-emerald-400">
                Services
              </button>
              <button onClick={() => scrollToSection('apropos')} className="block w-full text-left text-white hover:text-emerald-400">
                À Propos
              </button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left text-white hover:text-emerald-400">
                Contact
              </button>
              <button 
                onClick={onLogin}
                className="w-full px-6 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-medium"
              >
                Espace Parent
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-9xl">🥋</div>
          <div className="absolute bottom-20 right-10 text-9xl">🏆</div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full">
              <Award className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-medium">Affiliée FITKD • Homologuée Kukkiwon</span>
            </div>

            {/* Titre */}
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="block">Devenez le Meilleur</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                Version de Vous-Même
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
              Rejoignez la première académie de Taekwondo de Côte d'Ivoire et développez 
              votre potentiel physique et mental avec des coachs certifiés internationaux.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={onEnter}
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/50 flex items-center justify-center gap-2"
              >
                Commencer Maintenant
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                Découvrir nos Services
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto pt-8">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-sm">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-emerald-400" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-emerald-400 mb-2">{stats.members}+</div>
              <div className="text-slate-400">Licenciés Actifs</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-400 mb-2">{stats.coaches}</div>
              <div className="text-slate-400">Coachs Certifiés</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-400 mb-2">{stats.years}</div>
              <div className="text-slate-400">Années d'Expérience</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-400 mb-2">{stats.medals}+</div>
              <div className="text-slate-400">Médailles Remportées</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Services</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Des programmes adaptés à tous les niveaux et objectifs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <div 
                key={idx}
                className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-emerald-500/50 transition-all transform hover:-translate-y-2 group"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-slate-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="apropos" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Pourquoi Choisir la <span className="text-emerald-400">CSA</span> ?
              </h2>
              <p className="text-lg text-slate-300 mb-6">
                Depuis 2010, la Confidence Sports Academy forme des champions et accompagne 
                des centaines de pratiquants dans leur développement personnel et sportif.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Excellence Technique</h4>
                    <p className="text-slate-400">Coachs certifiés Kukkiwon avec expérience internationale</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Infrastructures Modernes</h4>
                    <p className="text-slate-400">Dojang équipé aux normes internationales</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Suivi Personnalisé</h4>
                    <p className="text-slate-400">Programmes adaptés à chaque pratiquant</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl p-8 border border-emerald-500/30">
                <div className="text-center">
                  <div className="text-8xl mb-4">🥋</div>
                  <h3 className="text-2xl font-bold mb-2">Rejoignez l'Excellence</h3>
                  <p className="text-slate-300 mb-6">
                    Plus de 250 licenciés nous font confiance pour leur développement martial
                  </p>
                  <button 
                    onClick={onEnter}
                    className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-bold transition-all transform hover:scale-105"
                  >
                    Commencer l'Aventure
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ils Nous Font <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Confiance</span>
            </h2>
            <p className="text-xl text-slate-400">Découvrez les témoignages de nos membres</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 relative">
              <div className="text-6xl text-emerald-500/20 absolute top-4 left-4">"</div>
              <div className="relative z-10">
                <div className="flex items-center gap-1 mb-4 justify-center">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-xl text-slate-300 text-center mb-6 italic">
                  {testimonials[currentTestimonial].text}
                </p>
                <div className="text-center">
                  <p className="font-bold text-lg">{testimonials[currentTestimonial].name}</p>
                  <p className="text-emerald-400">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentTestimonial === idx ? 'bg-emerald-500 w-8' : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Contactez-<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Nous</span>
            </h2>
            <p className="text-xl text-slate-400">Nous sommes là pour répondre à vos questions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center hover:border-emerald-500/50 transition-all">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="font-bold text-lg mb-2">Téléphone</h3>
              <p className="text-slate-400">+225 27 22 44 55 66</p>
              <p className="text-slate-400">+225 07 12 34 56 78</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center hover:border-emerald-500/50 transition-all">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="font-bold text-lg mb-2">Email</h3>
              <p className="text-slate-400">contact@csa-taekwondo.ci</p>
              <p className="text-slate-400">info@csa-taekwondo.ci</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center hover:border-emerald-500/50 transition-all">
              <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="font-bold text-lg mb-2">Adresse</h3>
              <p className="text-slate-400">Cocody, Abidjan</p>
              <p className="text-slate-400">Côte d'Ivoire</p>
            </div>
          </div>

          {/* CTA Final */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-12 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-4">Prêt à Commencer ?</h3>
              <p className="text-xl mb-8 text-slate-100">
                Rejoignez la famille CSA et commencez votre parcours martial dès aujourd'hui
              </p>
              <button 
                onClick={onEnter}
                className="px-10 py-4 bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Accéder à l'Application
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🥋</span>
                </div>
                <div>
                  <h3 className="font-bold">CSA Taekwondo</h3>
                  <p className="text-xs text-slate-400">Excellence Martiale</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm">
                La première académie de Taekwondo de Côte d'Ivoire, affiliée FITKD et homologuée Kukkiwon.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Liens Rapides</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><button onClick={() => scrollToSection('accueil')} className="hover:text-emerald-400">Accueil</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-emerald-400">Services</button></li>
                <li><button onClick={() => scrollToSection('apropos')} className="hover:text-emerald-400">À Propos</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-emerald-400">Contact</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Affiliations</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>FITKD Côte d'Ivoire</li>
                <li>Kukkiwon Corée</li>
                <li>World Taekwondo</li>
                <li>African Taekwondo Union</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Horaires</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>Lundi - Vendredi: 16h - 20h</li>
                <li>Samedi: 9h - 13h</li>
                <li>Dimanche: Fermé</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2024 Confidence Sports Academy. Tous droits réservés.</p>
            <p className="mt-2">Développé avec ❤️ pour le Taekwondo ivoirien</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
