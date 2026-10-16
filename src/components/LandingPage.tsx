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
      color: 'from-red-500 to-red-700'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Compétition',
      description: 'Préparation aux compétitions nationales et internationales',
      color: 'from-gray-700 to-black'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Self-Défense',
      description: 'Techniques de défense personnelle pour tous',
      color: 'from-red-600 to-red-800'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Formation Continue',
      description: 'Stages et formations pour progresser rapidement',
      color: 'from-gray-600 to-gray-800'
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
        isScrolled ? 'bg-white/98 backdrop-blur-md shadow-sm border-b border-gray-200' : 'bg-white/95 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#9f0202] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">C</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Confidence Sports</h1>
                <p className="text-xs text-gray-500">Academy - Taekwondo</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('accueil')} className="text-gray-700 hover:text-[#9f0202] transition-colors font-medium">
                Accueil
              </button>
              <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-[#9f0202] transition-colors font-medium">
                Services
              </button>
              <button onClick={() => scrollToSection('apropos')} className="text-gray-700 hover:text-[#9f0202] transition-colors font-medium">
                À Propos
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-[#9f0202] transition-colors font-medium">
                Contact
              </button>
              <button 
                onClick={onLogin}
                className="px-5 py-2 bg-[#9f0202] hover:bg-[#7a0101] text-white rounded-md font-medium transition-colors"
              >
                Espace Parent
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white rounded-lg mt-2 p-4 space-y-3 border border-gray-200 shadow-lg">
              <button onClick={() => scrollToSection('accueil')} className="block w-full text-left text-gray-700 hover:text-[#9f0202] font-medium">
                Accueil
              </button>
              <button onClick={() => scrollToSection('services')} className="block w-full text-left text-gray-700 hover:text-[#9f0202] font-medium">
                Services
              </button>
              <button onClick={() => scrollToSection('apropos')} className="block w-full text-left text-gray-700 hover:text-[#9f0202] font-medium">
                À Propos
              </button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left text-gray-700 hover:text-[#9f0202] font-medium">
                Contact
              </button>
              <button 
                onClick={onLogin}
                className="w-full px-5 py-2 bg-[#9f0202] hover:bg-[#7a0101] text-white rounded-md font-medium"
              >
                Espace Parent
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="relative min-h-screen flex items-center justify-center pt-16 bg-white">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-20 left-10 text-9xl">🥋</div>
          <div className="absolute bottom-20 right-10 text-9xl">🏆</div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full">
              <Award className="w-4 h-4 text-[#9f0202]" />
              <span className="text-gray-700 text-sm font-medium">Affiliée FITKD • Homologuée Kukkiwon</span>
            </div>

            {/* Titre */}
            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-gray-900">
              <span className="block">Devenez le Meilleur</span>
              <span className="block text-[#9f0202]">
                Version de Vous-Même
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Rejoignez la première académie de Taekwondo de Côte d'Ivoire et développez 
              votre potentiel physique et mental avec des coachs certifiés internationaux.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button 
                onClick={onEnter}
                className="px-8 py-4 bg-[#9f0202] hover:bg-[#7a0101] text-white rounded-lg font-semibold text-lg transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                Commencer Maintenant
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                Découvrir nos Services
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-12">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-[#9f0202] flex-shrink-0" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
            <ChevronDown className="w-6 h-6 text-gray-400 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-[#9f0202] mb-2">{stats.members}+</div>
              <div className="text-gray-600 font-medium">Licenciés Actifs</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900 mb-2">{stats.coaches}</div>
              <div className="text-gray-600 font-medium">Coachs Certifiés</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#9f0202] mb-2">{stats.years}</div>
              <div className="text-gray-600 font-medium">Années d'Expérience</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900 mb-2">{stats.medals}+</div>
              <div className="text-gray-600 font-medium">Médailles Remportées</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Nos <span className="text-[#9f0202]">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des programmes adaptés à tous les niveaux et objectifs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-lg p-6 border border-gray-200 hover:border-[#9f0202] hover:shadow-md transition-all group"
              >
                <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center mb-4 group-hover:bg-[#9f0202]/5 transition-colors">
                  <div className="text-[#9f0202]">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="apropos" className="py-20 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Pourquoi Choisir la <span className="text-[#9f0202]">CSA</span> ?
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Depuis 2010, la Confidence Sports Academy forme des champions et accompagne 
                des centaines de pratiquants dans leur développement personnel et sportif.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#9f0202]/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-[#9f0202]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 mb-1">Excellence Technique</h4>
                    <p className="text-gray-600">Coachs certifiés Kukkiwon avec expérience internationale</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#9f0202]/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-[#9f0202]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 mb-1">Infrastructures Modernes</h4>
                    <p className="text-gray-600">Dojang équipé aux normes internationales</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#9f0202]/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-[#9f0202]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 mb-1">Suivi Personnalisé</h4>
                    <p className="text-gray-600">Programmes adaptés à chaque pratiquant</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-sm">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <span className="text-5xl">🥋</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">Rejoignez l'Excellence</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Plus de 250 licenciés nous font confiance pour leur développement martial
                  </p>
                  <button 
                    onClick={onEnter}
                    className="px-8 py-3 bg-[#9f0202] hover:bg-[#7a0101] text-white rounded-lg font-semibold transition-colors"
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Ils Nous Font <span className="text-[#9f0202]">Confiance</span>
            </h2>
            <p className="text-xl text-gray-600">Découvrez les témoignages de nos membres</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-8 border border-gray-200 relative">
              <div className="text-6xl text-[#9f0202]/10 absolute top-4 left-4">"</div>
              <div className="relative z-10">
                <div className="flex items-center gap-1 mb-6 justify-center">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-xl text-gray-700 text-center mb-8 italic leading-relaxed">
                  {testimonials[currentTestimonial].text}
                </p>
                <div className="text-center">
                  <p className="font-semibold text-lg text-gray-900">{testimonials[currentTestimonial].name}</p>
                  <p className="text-[#9f0202] font-medium">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentTestimonial === idx ? 'bg-[#9f0202] w-8' : 'bg-gray-300 w-2'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Contactez-<span className="text-[#9f0202]">Nous</span>
            </h2>
            <p className="text-xl text-gray-600">Nous sommes là pour répondre à vos questions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg p-6 border border-gray-200 text-center hover:border-[#9f0202] hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-lg bg-gray-50 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-7 h-7 text-[#9f0202]" />
              </div>
              <h3 className="font-semibold text-lg mb-3 text-gray-900">Téléphone</h3>
              <p className="text-gray-600">+225 27 22 44 55 66</p>
              <p className="text-gray-600">+225 07 12 34 56 78</p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 text-center hover:border-[#9f0202] hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-lg bg-gray-50 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-[#9f0202]" />
              </div>
              <h3 className="font-semibold text-lg mb-3 text-gray-900">Email</h3>
              <p className="text-gray-600">contact@csa-taekwondo.ci</p>
              <p className="text-gray-600">info@csa-taekwondo.ci</p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 text-center hover:border-[#9f0202] hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-lg bg-gray-50 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-7 h-7 text-[#9f0202]" />
              </div>
              <h3 className="font-semibold text-lg mb-3 text-gray-900">Adresse</h3>
              <p className="text-gray-600">Cocody, Abidjan</p>
              <p className="text-gray-600">Côte d'Ivoire</p>
            </div>
          </div>

          {/* CTA Final */}
          <div className="text-center mt-16">
            <div className="bg-white rounded-lg p-12 max-w-4xl mx-auto border border-gray-200 shadow-sm">
              <h3 className="text-3xl font-bold mb-4 text-gray-900">Prêt à Commencer ?</h3>
              <p className="text-xl mb-8 text-gray-600 leading-relaxed">
                Rejoignez la famille CSA et commencez votre parcours martial dès aujourd'hui
              </p>
              <button 
                onClick={onEnter}
                className="px-10 py-4 bg-[#9f0202] hover:bg-[#7a0101] text-white rounded-lg font-semibold text-lg transition-colors shadow-sm"
              >
                Accéder à l'Application
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#9f0202] rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl font-bold">C</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">CSA Taekwondo</h3>
                  <p className="text-xs text-gray-500">Excellence Martiale</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                La première académie de Taekwondo de Côte d'Ivoire, affiliée FITKD et homologuée Kukkiwon.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Liens Rapides</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><button onClick={() => scrollToSection('accueil')} className="hover:text-[#9f0202] transition-colors">Accueil</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-[#9f0202] transition-colors">Services</button></li>
                <li><button onClick={() => scrollToSection('apropos')} className="hover:text-[#9f0202] transition-colors">À Propos</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-[#9f0202] transition-colors">Contact</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Affiliations</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>FITKD Côte d'Ivoire</li>
                <li>Kukkiwon Corée</li>
                <li>World Taekwondo</li>
                <li>African Taekwondo Union</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Horaires</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>Lundi - Vendredi: 16h - 20h</li>
                <li>Samedi: 9h - 13h</li>
                <li>Dimanche: Fermé</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2024 Confidence Sports Academy. Tous droits réservés.</p>
            <p className="mt-2">Développé avec ❤️ pour le Taekwondo ivoirien</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
