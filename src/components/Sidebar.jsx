import { useState } from 'react';
import { NAV } from '../data/constants';
import { Icon } from '../data/icons';

const PoliMark = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="14" stroke="#34d399" strokeWidth="2.5"/>
    <path d="M16 8v8M12 16h8" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="16" cy="16" r="2" fill="#34d399"/>
  </svg>
);

export default function Sidebar({ currentPage, setCurrentPage }) {
  const sections = {
    main: NAV.filter(n => n.section === 'main'),
    tools: NAV.filter(n => n.section === 'tools'),
    account: NAV.filter(n => n.section === 'account')
  };

  return (
    <div className="w-64 surface-1 border-r border-soft flex flex-col h-screen animate-fadeIn">
      <div className="px-6 py-5 border-b border-subtle flex items-center gap-3">
        <PoliMark size={28} />
        <span className="display-serif text-lg font-semibold text-white">POLI</span>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        {Object.entries(sections).map(([section, items]) => (
          <div key={section} className="mb-6">
            <div className="px-4 text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
              {section === 'main' && 'Principal'}
              {section === 'tools' && 'Outils'}
              {section === 'account' && 'Compte'}
            </div>
            <nav className="space-y-1">
              {items.map(item => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg flex items-center gap-3 transition-all text-sm ${
                    currentPage === item.id
                      ? 'bg-accent-emerald/20 text-accent-emerald'
                      : 'text-white/70 hover:text-white/90 hover:bg-white/5'
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.label}</span>
                  {currentPage === item.id && <div className="ml-auto w-2 h-2 rounded-full bg-accent-emerald" />}
                </button>
              ))}
            </nav>
          </div>
        ))}
      </div>

      <div className="border-t border-subtle p-4">
        <div className="surface-2 rounded-lg p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent-emerald/20 flex items-center justify-center">
            <span className="text-sm font-bold text-accent-emerald">ZB</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-white truncate">Zara Brown</div>
            <div className="text-xs text-white/50">Premium Member</div>
          </div>
        </div>
      </div>
    </div>
  );
}
