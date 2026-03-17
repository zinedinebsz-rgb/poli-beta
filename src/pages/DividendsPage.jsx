import { useState } from 'react';
import { DIV_HOLDINGS } from '../data/constants';

export default function DividendsPage() {
  const [view, setView] = useState("calendar");
  const annualDiv = DIV_HOLDINGS.reduce((s, h) => s + h.shares * h.divPerShare, 0);
  const monthlyAvg = Math.round(annualDiv / 12);
  const activeCount = DIV_HOLDINGS.filter(h => h.divPerShare > 0).length;
  const avgYield = (DIV_HOLDINGS.reduce((s, h) => s + h.yld, 0) / DIV_HOLDINGS.length).toFixed(1);
  const monthlyData = [
    {m:"Jan",v:320},{m:"Fév",v:180},{m:"Mar",v:640},{m:"Avr",v:850},{m:"Mai",v:420},
    {m:"Jun",v:380},{m:"Jul",v:290},{m:"Aoû",v:180},{m:"Sep",v:520},{m:"Oct",v:310},{m:"Nov",v:190},{m:"Déc",v:480}
  ];
  const maxM = Math.max(...monthlyData.map(d => d.v));

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-xl text-white display-serif">Dividendes & Revenus passifs</h1>
        <p className="text-sm text-white/40 mt-1">Suivez vos dividendes et revenus</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          {l:"Dividendes annuels",v:`${Math.round(annualDiv).toLocaleString("fr-FR")} €`,c:"border-l-emerald-500"},
          {l:"Moyenne mensuelle",v:`${monthlyAvg.toLocaleString("fr-FR")} €`,c:"border-l-blue-500"},
          {l:"Rendement moyen",v:`${avgYield}%`,c:"border-l-amber-500"},
          {l:"Sources actives",v:`${activeCount}/${DIV_HOLDINGS.length}`,c:"border-l-purple-500"},
        ].map(k => (
          <div key={k.l} className={`card border-l-[3px] ${k.c}`}>
            <p className="text-[10px] font-medium text-white/40 uppercase tracking-wider mb-2">{k.l}</p>
            <p className="text-lg font-bold text-white mono">{k.v}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        {[["calendar","📅 Calendrier"],["holdings","📊 Holdings"]].map(([v, l]) => (
          <button key={v} onClick={() => setView(v)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${view === v ? "border-accent bg-accent/10 text-white" : "border-white/5 text-white/40"}`}>{l}</button>
        ))}
      </div>

      {view === "calendar" ? (
        <div className="card">
          <p className="text-sm font-medium text-white/80 mb-4">Dividendes par mois</p>
          <div className="flex items-end gap-2 h-32">
            {monthlyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-emerald-500/30 rounded-t transition-all" style={{height:`${d.v/maxM*100}px`}}/>
                <span className="text-[8px] text-white/40">{d.m}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Prochains versements</p>
            {DIV_HOLDINGS.filter(h => h.divPerShare > 0 && h.nextDate !== "-").sort((a, b) => a.nextDate.localeCompare(b.nextDate)).slice(0, 4).map(h => (
              <div key={h.ticker} className="flex items-center gap-3 px-3 py-2 surface-2 rounded-lg">
                <span className="text-xs font-bold text-white/60 mono w-10">{h.ticker}</span>
                <span className="text-xs text-white/40 flex-1">{h.name}</span>
                <span className="text-xs text-white/40">{h.nextDate}</span>
                <span className="text-xs font-medium text-emerald-400 mono">{Math.round(h.shares * h.divPerShare)} €</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {["Actif","Actions","Div/action","Rendement","Annuel"].map(h => (
                  <th key={h} className="text-left text-[10px] font-medium text-white/40 uppercase tracking-wider py-2 px-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DIV_HOLDINGS.map(h => (
                <tr key={h.ticker} className="border-b border-white/3 hover:bg-white/[0.02]">
                  <td className="py-2.5 px-3"><span className="font-medium text-white">{h.ticker}</span><span className="text-white/40 ml-2 text-xs">{h.name}</span></td>
                  <td className="py-2.5 px-3 mono text-white/60">{h.shares}</td>
                  <td className="py-2.5 px-3 mono text-white/60">{h.divPerShare} €</td>
                  <td className="py-2.5 px-3 mono text-white/60">{h.yld}%</td>
                  <td className="py-2.5 px-3 mono text-emerald-400 font-medium">{Math.round(h.shares * h.divPerShare)} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
