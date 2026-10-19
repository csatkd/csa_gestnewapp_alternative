import { useState, useEffect } from 'react';
import { LayoutDashboard, Users, ClipboardCheck, Award, DollarSign, Home, Menu, X, Bell, Package, Download, Search, BarChart3, Database, FileText, Calendar, MessageSquare, Activity, Trophy, Settings, Target, BookOpen, UserPlus, ShoppingBag, Printer, CreditCard } from 'lucide-react';
import DashboardView from './components/DashboardView';
import MembersView from './components/MembersView';
import AttendanceView from './components/AttendanceView';
import GradingView from './components/GradingView';
import PaymentsView from './components/PaymentsView';
import ParentPortalView from './components/ParentPortalView';
import ParentLogin from './components/ParentLogin';
import { ParentAuthProvider, useParentAuth } from './components/ParentAuthContext';
import InventoryView from './components/InventoryView';
import NotificationsPanel from './components/NotificationsPanel';
import AdvancedStats from './components/AdvancedStats';
import DataManagement from './components/DataManagement';
import PerformanceReport from './components/PerformanceReport';
import TrainingSchedule from './components/TrainingSchedule';
import Communication from './components/Communication';
import IncidentTracker from './components/IncidentTracker';
import RewardsProgram from './components/RewardsProgram';
import AcademySettings from './components/AcademySettings';
import TechnicalProgress from './components/TechnicalProgress';
import BookingSystem from './components/BookingSystem';
import TrialClasses from './components/TrialClasses';
import CoachesManagement from './components/CoachesManagement';
import ShopManagement from './components/ShopManagement';
import CompetitionManagement from './components/CompetitionManagement';
import CoachAttendance from './components/CoachAttendance';
import WhatsAppIntegration from './components/WhatsAppIntegration';
import InteractiveCalendar from './components/InteractiveCalendar';
import FeedbackSystem from './components/FeedbackSystem';
import VideoLibrary from './components/VideoLibrary';
import ReferralProgram from './components/ReferralProgram';
import ReceiptPrinter from './components/ReceiptPrinter';
import InscriptionManagement from './components/InscriptionManagement';
import MonthlyPaymentsView from './components/MonthlyPaymentsView';
import SecretariatAttendanceView from './components/SecretariatAttendanceView';
import MemberCardManagement from './components/MemberCardManagement';
import PaymentBookletView from './components/PaymentBookletView';
import LandingPage from './components/LandingPage';
import { AuthProvider, useAuth } from './components/AuthContext';
import LoginSelection from './components/LoginSelection';
import StaffLogin from './components/StaffLogin';
import UserManagement from './components/UserManagement';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import { AdvancedNotificationsPanel, useAdvancedNotifications } from './components/AdvancedNotifications';
import RoleDashboard from './components/RoleDashboard';
import { useFavorites, FavoritesBar } from './components/FavoritesSystem';
import Breadcrumbs from './components/Breadcrumbs';
import GlobalSearch from './components/GlobalSearch';
import PreInscriptionForm from './components/PreInscriptionForm';
import PreInscriptionManagement from './components/PreInscriptionManagement';
import PreInscriptionSuccess from './components/PreInscriptionSuccess';
import { ToastContainer, useToast } from './components/Toast';
import { ErrorBoundary } from './components/ErrorBoundary';
import { exportToCSV } from './utils/helpers';
import { mockMembers, attendance30DaysData, mockPayments } from './data/mockData';
import { hasPermission, getAccessibleViews } from './utils/permissions';
import { Sun, Moon, Star } from 'lucide-react';

type ViewType = 'dashboard' | 'members' | 'attendance' | 'secretariat' | 'grading' | 'payments' | 'monthly-payments' | 'booklet' | 'parents' | 'inventory' | 'stats' | 'data' | 'report' | 'schedule' | 'communication' | 'incidents' | 'rewards' | 'progress' | 'settings' | 'booking' | 'trial' | 'coaches' | 'coach-attendance' | 'shop' | 'competitions' | 'whatsapp' | 'calendar' | 'feedback' | 'videos' | 'referral' | 'receipts' | 'inscriptions' | 'pre-inscriptions' | 'cards' | 'user-management';

const navItems: { key: ViewType; label: string; icon: typeof LayoutDashboard; roles?: string[] }[] = [
  { key: 'dashboard', label: 'Tableau de Bord', icon: LayoutDashboard },
  { key: 'user-management', label: 'Utilisateurs', icon: Users, roles: ['admin'] },
  { key: 'members', label: 'Licenciés', icon: Users },
  { key: 'cards', label: 'Cartes de Membre', icon: CreditCard },
  { key: 'attendance', label: 'Assiduité', icon: ClipboardCheck },
  { key: 'secretariat', label: 'Pointage Secrétariat', icon: ClipboardCheck },
  { key: 'schedule', label: 'Planning', icon: Calendar },
  { key: 'progress', label: 'Progression', icon: Target },
  { key: 'grading', label: 'Grades', icon: Award },
  { key: 'booking', label: 'Réservations', icon: BookOpen },
  { key: 'trial', label: 'Cours d\'Essai', icon: UserPlus },
  { key: 'coaches', label: 'Coachs', icon: Users },
  { key: 'coach-attendance', label: 'Assiduité Coachs', icon: ClipboardCheck },
  { key: 'shop', label: 'Boutique', icon: ShoppingBag },
  { key: 'competitions', label: 'Compétitions', icon: Trophy },
  { key: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
  { key: 'calendar', label: 'Calendrier', icon: Calendar },
  { key: 'feedback', label: 'Feedback', icon: Award },
  { key: 'videos', label: 'Vidéos', icon: BookOpen },
  { key: 'referral', label: 'Parrainage', icon: Users },
  { key: 'receipts', label: 'Reçus', icon: Printer },
  { key: 'inscriptions', label: 'Inscriptions', icon: UserPlus },
  { key: 'pre-inscriptions', label: 'Préinscriptions', icon: UserPlus, roles: ['admin'] },
  { key: 'payments', label: 'Trésorerie', icon: DollarSign },
  { key: 'monthly-payments', label: 'Mensualités', icon: Calendar },
  { key: 'booklet', label: 'Carnet de Paiement', icon: BookOpen },
  { key: 'inventory', label: 'Stocks', icon: Package },
  { key: 'incidents', label: 'Incidents', icon: Activity },
  { key: 'rewards', label: 'Récompenses', icon: Trophy },
  { key: 'communication', label: 'Communication', icon: MessageSquare },
  { key: 'stats', label: 'Statistiques', icon: BarChart3 },
  { key: 'report', label: 'Rapports', icon: FileText },
  { key: 'data', label: 'Données', icon: Database },
  { key: 'settings', label: 'Paramètres', icon: Settings, roles: ['admin'] },
  { key: 'parents', label: 'Portail Famille', icon: Home },
];

function AppContent({ currentView, setCurrentView, user }: { currentView: ViewType; setCurrentView: (view: ViewType) => void; user?: any }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ type: string; label: string; sublabel: string; action: ViewType }[]>([]);
  const { toasts, addToast, removeToast } = useToast();
  const { isAuthenticated } = useParentAuth();
  const { logout: logoutStaff } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { notifications, unreadCount, addNotification, markAsRead, markAllAsRead, removeNotification, clearAll } = useAdvancedNotifications();
  const { favorites, toggleFavorite, isFavorite, removeFavorite } = useFavorites();

  // Filter navigation items based on user role
  const filteredNavItems = user?.role 
    ? navItems.filter(item => !item.roles || item.roles.includes(user.role))
    : navItems.filter(item => !item.roles);

  // Handle view change with animation
  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
  };

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Global search
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const results: { type: string; label: string; sublabel: string; action: ViewType }[] = [];

    // Search members
    mockMembers.filter(m =>
      `${m.firstName} ${m.lastName} ${m.licenseNumber}`.toLowerCase().includes(q)
    ).forEach(m => {
      results.push({
        type: 'Licencié',
        label: `${m.firstName} ${m.lastName}`,
        sublabel: m.licenseNumber,
        action: 'members'
      });
    });

    // Search payments
    mockPayments.filter(p => {
      const member = mockMembers.find(m => m.id === p.memberId);
      return member && `${member.firstName} ${member.lastName} ${p.description}`.toLowerCase().includes(q);
    }).forEach(p => {
      const member = mockMembers.find(m => m.id === p.memberId);
      results.push({
        type: 'Paiement',
        label: `${member?.firstName} ${member?.lastName}`,
        sublabel: `${p.amount.toLocaleString()} FCFA — ${p.description}`,
        action: 'payments'
      });
    });

    setSearchResults(results.slice(0, 8));
  }, [searchQuery]);

  const handleExportCSV = () => {
    if (currentView === 'attendance') {
      exportToCSV(attendance30DaysData, 'assiduite_30jours');
    } else if (currentView === 'members') {
      exportToCSV(mockMembers.map(m => ({
        id: m.id,
        nom: m.lastName,
        prenom: m.firstName,
        licence: m.licenseNumber,
        ceinture: m.beltColor,
        statut: m.status,
      })), 'licencies');
    } else {
      alert('Export CSV disponible pour les vues Assiduité et Licenciés');
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': 
        // Show role-specific dashboard if user is logged in
        if (user?.role && user.role !== 'parent') {
          return <RoleDashboard role={user.role} />;
        }
        return <DashboardView />;
      case 'members': return <MembersView />;
      case 'cards': return <MemberCardManagement />;
      case 'attendance': return <AttendanceView />;
      case 'secretariat': return <SecretariatAttendanceView />;
      case 'schedule': return <TrainingSchedule />;
      case 'progress': return <TechnicalProgress />;
      case 'grading': return <GradingView />;
      case 'booking': return <BookingSystem />;
      case 'trial': return <TrialClasses />;
      case 'coaches': return <CoachesManagement />;
      case 'coach-attendance': return <CoachAttendance />;
      case 'shop': return <ShopManagement />;
      case 'competitions': return <CompetitionManagement />;
      case 'whatsapp': return <WhatsAppIntegration />;
      case 'calendar': return <InteractiveCalendar />;
      case 'feedback': return <FeedbackSystem />;
      case 'videos': return <VideoLibrary />;
      case 'referral': return <ReferralProgram />;
      case 'receipts': return <ReceiptPrinter />;
      case 'inscriptions': return <InscriptionManagement />;
      case 'pre-inscriptions': return <PreInscriptionManagement />;
      case 'payments': return <PaymentsView />;
      case 'monthly-payments': return <MonthlyPaymentsView />;
      case 'booklet': return <PaymentBookletView />;
      case 'inventory': return <InventoryView />;
      case 'incidents': return <IncidentTracker />;
      case 'rewards': return <RewardsProgram />;
      case 'communication': return <Communication />;
      case 'stats': return <AdvancedStats />;
      case 'report': return <PerformanceReport />;
      case 'data': return <DataManagement />;
      case 'settings': return <AcademySettings />;
      case 'user-management': return <UserManagement />;
      case 'parents': return <ParentPortalView />;
    }
  };

  return (
    <ErrorBoundary>
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 border-r border-slate-700 transform transition-transform duration-300 lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-5 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <span className="text-white font-bold text-lg">🥋</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-sm">Confidence Sports</h1>
                <p className="text-slate-400 text-xs">Academy — Taekwondo</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-xs font-medium">FITKD</span>
              <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded text-xs font-medium">Kukkiwon</span>
              <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs font-medium">WT</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {filteredNavItems.map(item => (
              <button
                key={item.key}
                onClick={() => { setCurrentView(item.key); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  currentView === item.key
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/5'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Quick Actions */}
          <div className="p-3 border-t border-slate-700">
            <button
              onClick={handleExportCSV}
              className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
            >
              <Download className="w-4 h-4" />
              Exporter CSV
            </button>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-700">
            <div className="bg-slate-700/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <span className="text-emerald-400 text-xs font-bold">
                    {user?.avatar || '👤'}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-white text-xs font-medium">{user?.name || 'Directeur Technique'}</p>
                  <p className="text-slate-500 text-[10px]">
                    {user?.role === 'admin' ? 'Administrateur' : 
                     user?.role === 'coach' ? 'Coach' : 
                     user?.role === 'treasurer' ? 'Trésorier' : 'Administrateur'}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-slate-500 text-[10px]">En ligne</span>
                </div>
                {user && (
                  <button
                    onClick={logoutStaff}
                    className="text-slate-500 hover:text-red-400 text-[10px] transition-colors"
                  >
                    Déconnexion
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700 px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div>
                <h2 className="text-white font-semibold text-lg">
                  {navItems.find(n => n.key === currentView)?.label}
                </h2>
                <p className="text-slate-500 text-xs hidden sm:block">
                  Confidence Sports Academy • Dojang de Cocody, Abidjan
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Global Search */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className="flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-1.5 border border-slate-700 hover:border-slate-500 transition-colors"
                >
                  <Search className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-400 text-xs">Rechercher...</span>
                  <kbd className="text-slate-500 text-[10px] bg-slate-700 px-1.5 py-0.5 rounded">⌘K</kbd>
                </button>
              </div>

              {/* Live Clock */}
              <div className="hidden lg:flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-1.5 border border-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-slate-400 text-xs font-mono">
                  {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Notifications Bell */}
              <button
                onClick={() => setShowNotifications(true)}
                className="relative p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </button>

              {/* Date */}
              <div className="text-right hidden sm:block">
                <p className="text-white text-xs font-medium">{currentTime.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}</p>
                <p className="text-slate-500 text-[10px]">Saison 2024-2025</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-6">
          {/* Favorites Bar */}
          <FavoritesBar 
            favorites={favorites}
            onSelect={(view) => handleViewChange(view as ViewType)}
            onRemove={removeFavorite}
          />
          
          {/* Breadcrumbs */}
          <Breadcrumbs 
            items={[
              { label: 'Accueil', onClick: () => handleViewChange('dashboard') },
              { label: filteredNavItems.find(item => item.key === currentView)?.label || '' }
            ]}
          />

          {/* Favorite Toggle Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => {
                const currentItem = filteredNavItems.find(item => item.key === currentView);
                if (currentItem) {
                  toggleFavorite({
                    label: currentItem.label,
                    icon: '⭐',
                    view: currentItem.key
                  });
                }
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isFavorite(currentView)
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-amber-500/30 hover:text-amber-400'
              }`}
            >
              <Star className={`w-4 h-4 ${isFavorite(currentView) ? 'fill-amber-400' : ''}`} />
              <span className="text-sm">{isFavorite(currentView) ? 'Dans les favoris' : 'Ajouter aux favoris'}</span>
            </button>
          </div>

          {/* Main Content with Animation */}
          <div className="animate-fade-in">
            {renderView()}
          </div>
        </div>
      </main>

      {/* Notifications Panel */}
      {showNotifications && (
        <AdvancedNotificationsPanel
          notifications={notifications}
          onClose={() => setShowNotifications(false)}
          onMarkAsRead={markAsRead}
          onMarkAllAsRead={markAllAsRead}
          onRemove={removeNotification}
          onClearAll={clearAll}
        />
      )}

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Global Search Overlay */}
      <GlobalSearch
        isOpen={showSearch}
        onClose={() => setShowSearch(false)}
        onSelect={(action) => {
          setCurrentView(action as ViewType);
          setShowSearch(false);
        }}
      />

      {/* Keyboard shortcut listener */}
      <KeyboardShortcut onOpenSearch={() => setShowSearch(true)} />
    </div>
    </ErrorBoundary>
  );
}

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [loginMode, setLoginMode] = useState<'selection' | 'parent' | 'staff' | null>(null);
  const [showPreInscription, setShowPreInscription] = useState(false);
  const [preInscriptionSuccess, setPreInscriptionSuccess] = useState<{
    id: string;
    firstName: string;
    lastName: string;
  } | null>(null);

  // Listen for pre-inscription event from landing page
  useEffect(() => {
    const handlePreInscription = () => setShowPreInscription(true);
    window.addEventListener('showPreInscription', handlePreInscription);
    return () => window.removeEventListener('showPreInscription', handlePreInscription);
  }, []);

  // Always call hooks before any conditional returns
  const handleLogin = () => setLoginMode('selection');
  const handleEnter = () => setShowLanding(false);

  const handleSelectParent = () => setLoginMode('parent');
  const handleSelectStaff = () => setLoginMode('staff');
  const handleBackToSelection = () => setLoginMode('selection');

  if (preInscriptionSuccess) {
    return (
      <ThemeProvider>
        <PreInscriptionSuccess
          preInscriptionId={preInscriptionSuccess.id}
          firstName={preInscriptionSuccess.firstName}
          lastName={preInscriptionSuccess.lastName}
          onClose={() => {
            setPreInscriptionSuccess(null);
            setShowLanding(true);
          }}
        />
      </ThemeProvider>
    );
  }

  if (showPreInscription) {
    return (
      <ThemeProvider>
        <div className="relative">
          <button
            onClick={() => setShowPreInscription(false)}
            className="absolute top-4 left-4 z-50 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
          >
            ← Retour
          </button>
          <PreInscriptionForm
            onSubmit={(data) => {
              // Generate unique ID
              const preInscriptionId = `PRE-${Date.now().toString().slice(-6)}`;
              
              // Here you would typically save to backend
              console.log('Pre-inscription submitted:', { id: preInscriptionId, ...data });
              
              // Show success page
              setPreInscriptionSuccess({
                id: preInscriptionId,
                firstName: data.firstName,
                lastName: data.lastName
              });
              setShowPreInscription(false);
            }}
            onCancel={() => setShowPreInscription(false)}
          />
        </div>
      </ThemeProvider>
    );
  }

  if (showLanding) {
    return (
      <ThemeProvider>
        <LandingPage 
          onLogin={handleLogin}
          onEnter={handleEnter}
        />
      </ThemeProvider>
    );
  }

  if (loginMode === 'selection') {
    return (
      <ThemeProvider>
        <LoginSelection 
          onSelectParent={handleSelectParent}
          onSelectStaff={handleSelectStaff}
        />
      </ThemeProvider>
    );
  }

  if (loginMode === 'parent') {
    return (
      <ThemeProvider>
        <ParentAuthProvider>
          <div className="relative">
            <button
              onClick={handleBackToSelection}
              className="absolute top-4 left-4 z-50 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
            >
              ← Retour
            </button>
            <ParentLogin />
          </div>
        </ParentAuthProvider>
      </ThemeProvider>
    );
  }

  if (loginMode === 'staff') {
    return (
      <ThemeProvider>
        <AuthProvider>
          <div className="relative">
            <button
              onClick={handleBackToSelection}
              className="absolute top-4 left-4 z-50 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
            >
              ← Retour
            </button>
            <StaffLoginWrapper onBack={handleBackToSelection} />
          </div>
        </AuthProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <ParentAuthProvider>
          <AppWrapper />
        </ParentAuthProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

function StaffLoginWrapper({ onBack }: { onBack: () => void }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    onBack();
    return null;
  }

  return <StaffLogin />;
}

function AppWrapper() {
  const { isAuthenticated: isParentAuthenticated } = useParentAuth();
  const { isAuthenticated: isStaffAuthenticated, user } = useAuth();
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  // If viewing parents portal and not authenticated, show login
  if (currentView === 'parents' && !isParentAuthenticated) {
    return <ParentLogin />;
  }

  // If staff is authenticated, show staff dashboard
  if (isStaffAuthenticated && user) {
    return <AppContent currentView={currentView} setCurrentView={setCurrentView} user={user} />;
  }

  return <AppContent currentView={currentView} setCurrentView={setCurrentView} />;
}

function KeyboardShortcut({ onOpenSearch }: { onOpenSearch: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenSearch();
      }
      if (e.key === 'Escape') {
        // Close any open modal
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onOpenSearch]);
  return null;
}
