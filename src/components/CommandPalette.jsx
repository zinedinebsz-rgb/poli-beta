import { useState, useEffect, useRef, useContext } from 'react';
import { COMMANDS } from '../data/constants';
import { Icon } from '../data/icons';
import { AppCtx } from '../lib/AppContext';

export default function CommandPalette() {
  const { currentPage, setCurrentPage } = useContext(AppCtx);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(o => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const filtered = COMMANDS.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.desc.toLowerCase().includes(query.toLowerCase())
  );

  const exec = (cmd) => {
    setCurrentPage(cmd.id);
    setOpen(false);
    setQuery("");
  };

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "ArrowDown") setSelected(s => Math.min(s + 1, filtered.length - 1));
      if (e.key === "ArrowUp") setSelected(s => Math.max(s - 1, 0));
      if (e.key === "Enter" && filtered[selected]) exec(filtered[selected]);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, selected]);

  if (!open) return null;

  const getEmojiForIcon = (iconName) => {
    const emojiMap = {
      'chart-square': '📊',
      'trending-up': '📈',
      'wallet': '💰',
      'calculator': '🧮',
      'zap': '⚡',
      'coins': '🪙',
      'pie-chart': '🥧',
      'target': '🎯',
      'document': '📄',
      'star': '⭐',
      'users': '👥',
      'cog': '⚙️'
    };
    return emojiMap[iconName] || '▸';
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[20vh]" onClick={() => setOpen(false)}>
      <div className="absolute inset-0 bg-black/60"/>
      <div className="relative surface-3 border border-white/10 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl animate-slideInDown" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
          <span className="text-white/30">⌘</span>
          <input
            ref={inputRef}
            className="flex-1 bg-transparent text-white text-sm outline-none placeholder-white/30"
            placeholder="Rechercher une page, commande..."
            value={query}
            onChange={e => { setQuery(e.target.value); setSelected(0); }}
          />
          <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/30">ESC</kbd>
        </div>
        <div className="max-h-64 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <p className="text-sm text-white/30 text-center py-6">Aucun résultat</p>
          ) : (
            filtered.map((c, i) => (
              <button
                key={c.id}
                onClick={() => exec(c)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                  i === selected ? "bg-white/5 text-white" : "text-white/60 hover:bg-white/[0.02]"
                }`}
              >
                <span className="text-xs">{getEmojiForIcon(c.icon)}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{c.label}</p>
                  <p className="text-xs text-white/30">{c.desc}</p>
                </div>
                {i === selected && <span className="text-[10px] text-white/20">↵</span>}
              </button>
            ))
          )}
        </div>
        <div className="px-4 py-2 border-t border-white/5 flex gap-4 text-[10px] text-white/20">
          <span>↑↓ naviguer</span><span>↵ ouvrir</span><span>esc fermer</span>
        </div>
      </div>
    </div>
  );
}
