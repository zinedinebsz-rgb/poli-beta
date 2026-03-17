import { useState } from 'react';
import { useAuth } from './lib/AuthContext';
import { AppProvider } from './lib/AppContext';

// Layout
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import CommandPalette from './components/CommandPalette';
import Onboarding from './components/Onboarding';

// Pages
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import InvestPage from './pages/InvestPage';
import BankPage from './pages/BankPage';
import BudgetPage from './pages/BudgetPage';
import SimulatorPage from './pages/SimulatorPage';
import DividendsPage from './pages/DividendsPage';
import DiversificationPage from './pages/DiversificationPage';
import GoalsPage from './pages/GoalsPage';
import ReportsPage from './pages/ReportsPage';
import ProPage from './pages/ProPage';
import ManagersPage from './pages/ManagersPage';
import SettingsPage from './pages/SettingsPage';

const pages = {
  dashboard: DashboardPage,
  invest: InvestPage,
  bank: BankPage,
  budget: BudgetPage,
  simulator: SimulatorPage,
  dividends: DividendsPage,
  diversification: DiversificationPage,
  goals: GoalsPage,
  reports: ReportsPage,
  pro: ProPage,
  managers: ManagersPage,
  settings: SettingsPage,
};

function AppShell() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [obDone, setObDone] = useState(() => localStorage.getItem('poli_ob') === 'done');

  const PageComp = pages[currentPage] || DashboardPage;

  return (
    <AppProvider value={{ currentPage, setCurrentPage }}>
      <div className="layout-main">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <div className="layout-content">
          <TopBar currentPage={currentPage} />
          <div className="page-container animate-fadeIn" key={currentPage}>
            <PageComp />
          </div>
        </div>
        <CommandPalette />
        {!obDone && <Onboarding onDone={() => setObDone(true)} />}
      </div>
    </AppProvider>
  );
}

export default function App() {
  const { user, loading } = useAuth();

  // Skip auth check if no Supabase configured (dev mode)
  const supabaseConfigured = !!(
    import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
  );

  if (loading && supabaseConfigured) {
    return (
      <div className="min-h-screen surface-0 flex items-center justify-center">
        <div className="text-center animate-fadeIn">
          <h1 className="display-serif text-4xl text-white mb-2">POLI</h1>
          <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mt-4" />
        </div>
      </div>
    );
  }

  // If Supabase not configured, skip auth (dev/demo mode)
  if (!supabaseConfigured || user) {
    return <AppShell />;
  }

  return <AuthPage />;
}
