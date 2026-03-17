import { useState, useMemo } from 'react';
import MiniChart from '../components/MiniChart';
import { PATRIMOINE, ALLOC, FEES, TX, genChart } from '../data/constants';

export default function DashboardPage() {
  const [mode, setMode] = useState('brut');
  const [showFees, setShowFees] = useState(false);
  const chartData = useMemo(() => genChart(12), []);
  const patrimoine = mode === 'brut' ? PATRIMOINE.brut : mode === 'net' ? PATRIMOINE.net : PATRIMOINE.financier;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        {['brut', 'net', 'financier'].map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
              mode === m
                ? 'bg-accent-emerald text-surface-0'
                : 'bg-surface-1 text-white/70 hover:text-white border border-soft'
            }`}
          >
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="card animate-slideInUp">
          <div className="text-white/60 text-sm">Patrimoine</div>
          <div className="text-3xl font-semibold text-white mt-2">{(patrimoine / 1000).toFixed(1)}k€</div>
          <div className="text-accent-emerald text-sm mt-2">+{PATRIMOINE.perf}% YTD</div>
        </div>

        <div className="card animate-slideInUp" style={{ animationDelay: '0.05s' }}>
          <div className="text-white/60 text-sm">Performance</div>
          <div className="text-3xl font-semibold text-white mt-2">{PATRIMOINE.perf}%</div>
          <div className="text-accent-emerald text-sm mt-2">+{PATRIMOINE.perfMois}% ce mois</div>
        </div>

        <div className="card animate-slideInUp" style={{ animationDelay: '0.1s' }}>
          <div className="text-white/60 text-sm">Score Éthique</div>
          <div className="text-3xl font-semibold text-white mt-2">{PATRIMOINE.scoreEthique}</div>
          <div className="text-accent-emerald text-sm mt-2">Excellent</div>
        </div>

        <div className="card animate-slideInUp" style={{ animationDelay: '0.15s' }}>
          <div className="text-white/60 text-sm">Frais Annuels</div>
          <div className="text-3xl font-semibold text-white mt-2">{PATRIMOINE.fraisAnnuels}€</div>
          <div className="text-white/60 text-sm mt-2">0.25% du patrimoine</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 card animate-slideInLeft">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-white/60 text-sm">Évolution du patrimoine</div>
              <div className="text-2xl font-semibold text-white mt-1">{(patrimoine / 1000).toFixed(1)}k€</div>
            </div>
            <button onClick={() => setShowFees(!showFees)} className="btn-secondary text-xs">
              {showFees ? 'Masquer frais' : 'Voir frais'}
            </button>
          </div>
          <div className="h-32">
            <MiniChart data={chartData} color="#34d399" />
          </div>
        </div>

        <div className="card animate-slideInRight">
          <div className="text-white/60 text-sm mb-4">Allocation</div>
          <div className="space-y-2">
            {ALLOC.slice(0, 5).map(item => (
              <div key={item.label} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-white/70">{item.label}</span>
                </div>
                <span className="text-white font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showFees && (
        <div className="card animate-slideInUp border-accent-emerald/30 border-2">
          <div className="text-white font-semibold mb-4">Analyse des frais</div>
          <div className="grid grid-cols-4 gap-4">
            {FEES.map(fee => (
              <div key={fee.name} className="surface-2 rounded p-3">
                <div className="text-xs text-white/60">{fee.name}</div>
                <div className="text-lg font-semibold text-white mt-1">{fee.value}%</div>
                <div className="text-xs text-white/50 mt-1">{fee.freq}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 card animate-slideInLeft">
          <div className="text-white/60 text-sm mb-4">Transactions récentes</div>
          <div className="space-y-2">
            {TX.slice(0, 3).map(tx => (
              <div key={tx.id} className="flex justify-between items-center py-2 border-b border-subtle text-sm last:border-0">
                <div>
                  <div className="text-white font-medium">{tx.asset}</div>
                  <div className="text-white/50 text-xs">{tx.date}</div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">{tx.total}€</div>
                  <div className={`text-xs font-medium ${tx.type === 'achat' ? 'text-red-400' : tx.type === 'vente' ? 'text-orange-400' : 'text-green-400'}`}>{tx.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card animate-slideInRight">
          <div className="text-white/60 text-sm mb-4">Actions rapides</div>
          <div className="space-y-2">
            <button className="w-full btn-primary text-sm">Investir</button>
            <button className="w-full btn-secondary text-sm">Retirer</button>
            <button className="w-full btn-secondary text-sm">Rééquilibrer</button>
            <button className="w-full btn-secondary text-sm">Rapports</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="card animate-slideInLeft">
          <div className="text-white/60 text-sm mb-4">Diversification</div>
          <div className="flex items-center gap-6">
            <div className="w-32 h-32 rounded-full bg-surface-2 flex items-center justify-center relative">
              <svg width="100%" height="100%" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(52, 211, 153, 0.3)" strokeWidth="10" />
                <circle cx="60" cy="60" r="50" fill="none" stroke="#34d399" strokeWidth="10" strokeDasharray="95 282" />
              </svg>
              <div className="absolute text-center">
                <div className="text-2xl font-semibold text-accent-emerald">78%</div>
                <div className="text-xs text-white/60">diversifié</div>
              </div>
            </div>
            <div className="space-y-2 flex-1">
              {[{ label: 'Secteurs', value: 8 }, { label: 'Géographies', value: 45 }, { label: 'Actifs', value: 127 }].map(item => (
                <div key={item.label}>
                  <div className="text-xs text-white/60">{item.label}</div>
                  <div className="text-lg font-semibold text-white">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card animate-slideInRight">
          <div className="text-white/60 text-sm mb-4">Checklist de progression</div>
          <div className="space-y-2">
            {[
              { label: 'Patrimoine min. atteint', done: true },
              { label: 'Allocation définie', done: true },
              { label: 'Premiers investissements', done: true },
              { label: 'Frais optimisés', done: false },
              { label: 'Rééquilibrage planifié', done: false }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={item.done} readOnly className="w-4 h-4 accent-accent-emerald rounded cursor-pointer" />
                <span className={item.done ? 'text-white/60 line-through' : 'text-white'}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
