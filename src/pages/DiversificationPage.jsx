import { GEO, SECTORS } from '../data/constants';

export default function DiversificationPage() {
  const score = 72;
  const assetScore = 78;
  const geoScore = 65;
  const sectorScore = 70;
  const concentrationScore = 75;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-xl text-white display-serif">Score de diversification</h1>
        <p className="text-sm text-white/40 mt-1">Analysez la répartition de votre portefeuille</p>
      </div>

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-4 card flex flex-col items-center justify-center py-8">
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r="60" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10"/>
            <circle cx="70" cy="70" r="60" fill="none" stroke={score>=80?"#34d399":score>=60?"#f59e0b":"#ef4444"} strokeWidth="10" strokeLinecap="round"
              strokeDasharray={`${score/100*377} 377`} transform="rotate(-90 70 70)"/>
            <text x="70" y="65" textAnchor="middle" className="text-3xl font-bold" fill="white" fontSize="32">{score}</text>
            <text x="70" y="85" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="12">/100</text>
          </svg>
          <p className="text-sm text-white/60 mt-4">Score global</p>
        </div>
        <div className="col-span-8 card">
          <p className="text-sm font-medium text-white/80 mb-4">Détail des scores</p>
          <div className="space-y-4">
            {[
              {l:"Classes d'actifs",v:assetScore,c:"#34d399"},
              {l:"Géographie",v:geoScore,c:"#60a5fa"},
              {l:"Secteurs",v:sectorScore,c:"#d4a574"},
              {l:"Concentration",v:concentrationScore,c:"#f59e0b"},
            ].map(s => (
              <div key={s.l}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/60">{s.l}</span>
                  <span className="font-medium mono" style={{color:s.c}}>{s.v}/100</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{width:`${s.v}%`,background:s.c}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="card">
          <p className="text-sm font-medium text-white/80 mb-4">Répartition géographique</p>
          <div className="h-3 rounded-full overflow-hidden flex mb-4">
            {GEO.map(g => <div key={g.region} style={{width:g.pct+"%",background:g.color}} className="transition-all"/>)}
          </div>
          <div className="space-y-2">
            {GEO.map(g => (
              <div key={g.region} className="flex items-center gap-2 text-xs">
                <span>{g.flag}</span>
                <span className="text-white/60 flex-1">{g.region}</span>
                <span className="mono font-medium text-white/80">{g.pct}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <p className="text-sm font-medium text-white/80 mb-4">Répartition sectorielle</p>
          <div className="space-y-2">
            {SECTORS.map(s => (
              <div key={s.sector}>
                <div className="flex justify-between text-xs mb-0.5">
                  <span className="text-white/60">{s.sector} {s.over&&<span className="text-amber-400 text-[9px]">⚠ Sur-exposé</span>}</span>
                  <span className="mono text-white/40">{s.pct}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{width:`${s.pct}%`,background:s.color}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <p className="text-sm font-medium text-white/80 mb-3">Recommandations</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            {t:"Réduire la Tech",d:"Surpondération de 8% vs indice",impact:"+5 pts",c:"text-amber-400"},
            {t:"Augmenter Émergents",d:"Sous-exposé de 7% vs cible",impact:"+8 pts",c:"text-blue-400"},
            {t:"Diversifier l'énergie",d:"Trop concentré sur TotalEnergies",impact:"+3 pts",c:"text-purple-400"},
            {t:"Ajouter des obligations",d:"0% d'obligataire actuellement",impact:"+12 pts",c:"text-emerald-400"},
          ].map(r => (
            <div key={r.t} className="surface-2 rounded-lg p-3">
              <p className="text-sm font-medium text-white/80">{r.t}</p>
              <p className="text-xs text-white/40 mt-0.5">{r.d}</p>
              <span className={`text-xs font-medium ${r.c} mt-1 inline-block`}>{r.impact}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
