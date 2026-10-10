import { useState } from 'react';
import { LayoutDashboard, Users, ClipboardCheck, Award, DollarSign, Home, Menu, X } from 'lucide-react';
import DashboardView from './components/DashboardView';
import MembersView from './components/MembersView';
import AttendanceView from './components/AttendanceView';
import GradingView from './components/GradingView';
import PaymentsView from './components/PaymentsView';
import ParentPortalView from './components/ParentPortalView';

type ViewType = 'dashboard' | 'members' | 'attendance' | 'grading' | 'payments' | 'parents';

const navItems: { key: ViewType; label: string; icon: typeof LayoutDashboard }[] = [
  { key: 'dashboard', label: 'Tableau de Bord', icon: LayoutDashboard },
  { key: 'members', label: 'Licenciés', icon: Users },
  { key: 'attendance', label: 'Assiduité', icon: ClipboardCheck },
  { key: 'grading', label: 'Grades', icon: Award },
  { key: 'payments', label: 'Trésorerie', icon: DollarSign },
  { key: 'parents', label: 'Portail Famille', icon: Home },
];

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <DashboardView />;
      case 'members': return <MembersView />;
      case 'attendance': return <AttendanceView />;
      case 'grading': return <GradingView />;
      case 'payments': return <PaymentsView />;
      case 'parents': return <ParentPortalView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 border-r border-slate-700 transform transition-transform duration-300 lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-5 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🥋</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-sm">Confidence Sports</h1>
                <p className="text-slate-400 text-xs">Academy — Taekwondo</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-xs font-medium">FITKD</span>
              <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded text-xs font-medium">Kukkiwon</span>
              <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs font-medium">World Taekwondo</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navItems.map(item => (
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

          {/* Footer */}
          <div className="p-4 border-t border-slate-700">
            <div className="bg-slate-700/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <span className="text-emerald-400 text-xs font-bold">DT</span>
                </div>
                <div>
                  <p className="text-white text-xs font-medium">Directeur Technique</p>
                  <p className="text-slate-500 text-[10px]">Administrateur</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-slate-500 text-[10px]">En ligne</span>
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
              <div className="hidden md:flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-1.5 border border-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-slate-400 text-xs">Dojang Ouvert</span>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-white text-xs font-medium">{new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                <p className="text-slate-500 text-[10px]">Saison 2024-2025</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-6">
          {renderView()}
        </div>
      </main>
    </div>
  );
}
