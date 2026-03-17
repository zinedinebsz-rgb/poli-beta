import { useState, useMemo } from 'react';
import { SCENARIOS } from '../data/constants';

export default function SimulatorPage() {
  const [initial, setInitial] = useState(50000);
  const [monthly, setMonthly] = useState(500);
  const [years, setYears] = useState(20);
  const [scenario, setScenario] = useState("moderate");
  const [showFIRE, setShowFIRE] = useState(false);
  const [monthlyExpenses, setMonthlyExpenses] = useState(2500);

  const sc = SCENARIOS[scenario];
  const sim = useMemo(() => {
    const data = [];
    let balance = initial;
    for (let y = 0; y <= years; y++) {
      const invested = initial + monthly * 12 * y;
      data.push({year: y, nominal: Math.round(balance), invested});
      balance = (balance + monthly * 12) * (1 + sc.ret);
    }
    return data;
  }, [initial, monthly, years, scenario]);

  const final = sim[sim.length - 1];
  const totalInvested = initial + monthly * 12 * years;
  const gains = final.nominal - totalInvested;
  const fireTarget = monthlyExpenses * 12 * 25;
  const yearsToFIRE = useMemo(() => {
    let b = initial;
    for (let y = 1; y <= 60; y++) {
      b = (b + monthly * 12) * (1 + sc.ret);
      if (b >= fireTarget) return y;
    }
    return 60;
  }, [initial, monthly, scenario, fireTarget]);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-xl text-white display-serif">Simulateur patrimoine</h1>
        <p className="text-sm text-white/40 mt-1">Projetez l'évolution de votre patrimoine</p>
      </div>

      <div className="flex gap-2">
        {Object.entries(SCENARIOS).map(([k, s]) => (
          <button key={k} onClick={() => setScenario(k)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${scenario === k ? `border-[${s.color}] bg-[${s.color}]/10 text-white` : "border-white/5 text-white/40 hover:text-white/60"}`}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          {l:"Capital initial",v:initial,set:setInitial,min:0,max:500000,step:5000,unit:"€"},
          {l:"Épargne mensuelle",v:monthly,set:setMonthly,min:0,max:5000,step:100,unit:"€/mois"},
          {l:"Horizon",v:years,set:setYears,min:1,max:40,step:1,unit:"ans"},
        ].map(s => (
          <div key={s.l} className="card">
            <p className="text-xs text-white/40 mb-2">{s.l}</p>
            <p className="text-lg font-bold text-white mono mb-2">{s.v.toLocaleString("fr-FR")} {s.unit}</p>
            <input type="range" min={s.min} max={s.max} step={s.step} value={s.v} onChange={e => s.set(Number(e.target.value))}
              className="w-full accent-emerald-500 h-1"/>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          {l:"Capital final",v:`${final.nominal.toLocaleString("fr-FR")} €`,c:"text-emerald-400"},
          {l:"Total investi",v:`${totalInvested.toLocaleString("fr-FR")} €`,c:"text-white"},
          {l:"Plus-values",v:`${gains.toLocaleString("fr-FR")} €`,c:"text-emerald-400"},
          {l:"Rendement",v:`${sc.ret*100}% / an`,c:"text-amber-400"},
        ].map(k => (
          <div key={k.l} className="card">
            <p className="text-[10px] font-medium text-white/40 uppercase tracking-wider mb-2">{k.l}</p>
            <p className={`text-lg font-bold mono ${k.c}`}>{k.v}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <p className="text-sm font-medium text-white/80 mb-4">Projection sur {years} ans</p>
        <div className="flex items-end gap-1 h-40">
          {sim.filter((_, i) => i % Math.max(1, Math.floor(sim.length / 20)) === 0 || i === sim.length - 1).map((d, i) => {
            const maxVal = final.nominal;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full relative" style={{height:"120px"}}>
                  <div className="absolute bottom-0 w-full bg-white/10 rounded-t" style={{height:`${d.invested/maxVal*120}px`}}/>
                  <div className="absolute bottom-0 w-full rounded-t" style={{height:`${d.nominal/maxVal*120}px`,background:sc.color+"40"}}/>
                </div>
                <span className="text-[8px] text-white/30 mono">{d.year}</span>
              </div>
            );
          })}
        </div>
      </div>

      <button onClick={() => setShowFIRE(!showFIRE)} className="w-full card border-l-[3px] border-l-amber-500 text-left hover:bg-white/[0.02] transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider">🔥 Calculateur FIRE</span>
            <p className="text-sm text-white/60 mt-1">Indépendance financière : {yearsToFIRE} ans</p>
          </div>
          <span className="text-white/30">{showFIRE?"▲":"▼"}</span>
        </div>
      </button>
      {showFIRE && (
        <div className="card space-y-4 animate-slideInUp">
          <div>
            <p className="text-xs text-white/40 mb-2">Dépenses mensuelles</p>
            <p className="text-lg font-bold text-white mono mb-2">{monthlyExpenses.toLocaleString("fr-FR")} €/mois</p>
            <input type="range" min={500} max={10000} step={100} value={monthlyExpenses} onChange={e => setMonthlyExpenses(Number(e.target.value))} className="w-full accent-amber-500 h-1"/>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="surface-2 rounded-lg p-4"><p className="text-[10px] text-white/40 uppercase mb-1">Objectif FIRE</p><p className="text-lg font-bold text-amber-400 mono">{fireTarget.toLocaleString("fr-FR")} €</p></div>
            <div className="surface-2 rounded-lg p-4"><p className="text-[10px] text-white/40 uppercase mb-1">Années restantes</p><p className="text-lg font-bold text-white mono">{yearsToFIRE} ans</p></div>
            <div className="surface-2 rounded-lg p-4"><p className="text-[10px] text-white/40 uppercase mb-1">Revenu passif</p><p className="text-lg font-bold text-emerald-400 mono">{Math.round(fireTarget*0.04/12).toLocaleString("fr-FR")} €/mois</p></div>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full transition-all" style={{width:`${Math.min(100,final.nominal/fireTarget*100)}%`}}/>
          </div>
          <p className="text-xs text-white/40 text-center">{Math.round(final.nominal/fireTarget*100)}% de l'objectif FIRE atteint en {years} ans</p>
        </div>
      )}
    </div>
  );
}
