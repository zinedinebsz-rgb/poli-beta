import { useState } from 'react';
import { GOAL_TEMPLATES } from '../data/constants';

export default function GoalsPage() {
  const [goals, setGoals] = useState([
    {id:1,title:"Fonds d'urgence",target:15000,current:12400,months:6,color:"emerald"},
    {id:2,title:"Apport immobilier",target:50000,current:18200,months:24,color:"blue"},
    {id:3,title:"Patrimoine 100k €",target:100000,current:67800,months:36,color:"amber"},
  ]);
  const [showDialog, setShowDialog] = useState(false);
  const [form, setForm] = useState({title:"",target:10000,current:0,months:12,color:"emerald"});
  const totalTarget = goals.reduce((s, g) => s + g.target, 0);
  const totalCurrent = goals.reduce((s, g) => s + g.current, 0);
  const avgCompletion = Math.round(totalCurrent / totalTarget * 100);

  const addGoal = () => {
    if (!form.title) return;
    setGoals(p => [...p, {...form, id: Date.now()}]);
    setShowDialog(false);
    setForm({title:"",target:10000,current:0,months:12,color:"emerald"});
  };

  const colorMap = {emerald:"#34d399",blue:"#60a5fa",amber:"#f59e0b",purple:"#8b5cf6",red:"#ef4444"};

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl text-white display-serif">Objectifs</h1>
          <p className="text-sm text-white/40 mt-1">Suivez vos objectifs financiers</p>
        </div>
        <button onClick={() => setShowDialog(true)} className="btn-primary text-sm flex items-center gap-2">+ Nouvel objectif</button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          {l:"Total cible",v:`${totalTarget.toLocaleString("fr-FR")} €`},
          {l:"Progression",v:`${avgCompletion}%`},
          {l:"Objectifs actifs",v:`${goals.length}`},
        ].map(k => (
          <div key={k.l} className="card">
            <p className="text-[10px] font-medium text-white/40 uppercase tracking-wider mb-2">{k.l}</p>
            <p className="text-lg font-bold text-white mono">{k.v}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 mb-2">
        {GOAL_TEMPLATES.map(t => (
          <button key={t.id} onClick={() => {setForm({title:t.title,target:t.target,current:0,months:t.months,color:t.color});setShowDialog(true);}}
            className="card text-left hover:bg-white/[0.02] transition-colors group">
            <span className="text-2xl">{t.icon}</span>
            <p className="text-sm font-medium text-white mt-2">{t.title}</p>
            <p className="text-xs text-white/40">{t.desc}</p>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {goals.map(g => {
          const pct = Math.round(g.current / g.target * 100);
          return (
            <div key={g.id} className="card border-l-[3px]" style={{borderLeftColor:colorMap[g.color]||"#34d399"}}>
              <div className="flex items-center justify-between mb-3">
                <div><p className="text-sm font-medium text-white">{g.title}</p><p className="text-xs text-white/40">{g.months} mois restants</p></div>
                <div className="flex items-center gap-3">
                  <p className="text-lg font-bold text-white mono">{pct}%</p>
                  <button onClick={() => setGoals(p => p.filter(x => x.id !== g.id))} className="text-white/20 hover:text-red-400 text-xs">✕</button>
                </div>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-2">
                <div className="h-full rounded-full transition-all" style={{width:pct+"%",background:colorMap[g.color]}}/>
              </div>
              <div className="flex justify-between text-xs text-white/40 mono">
                <span>{g.current.toLocaleString("fr-FR")} €</span>
                <span>{g.target.toLocaleString("fr-FR")} €</span>
              </div>
            </div>
          );
        })}
      </div>

      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setShowDialog(false)}>
          <div className="absolute inset-0 bg-black/60"/>
          <div className="relative surface-3 border border-white/10 rounded-xl w-full max-w-md p-6 animate-slideInUp" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowDialog(false)} className="absolute top-3 right-3 text-white/40 hover:text-white">✕</button>
            <h2 className="text-lg font-semibold text-white mb-4 display-serif">Nouvel objectif</h2>
            <div className="space-y-3">
              <div><label className="text-xs text-white/40 mb-1 block">Titre</label><input className="input-base w-full" value={form.title} onChange={e => setForm({...form,title:e.target.value})} placeholder="Mon objectif"/></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs text-white/40 mb-1 block">Objectif (€)</label><input type="number" className="input-base w-full" value={form.target} onChange={e => setForm({...form,target:Number(e.target.value)})}/></div>
                <div><label className="text-xs text-white/40 mb-1 block">Déjà épargné (€)</label><input type="number" className="input-base w-full" value={form.current} onChange={e => setForm({...form,current:Number(e.target.value)})}/></div>
              </div>
              <div><label className="text-xs text-white/40 mb-1 block">Horizon (mois)</label><input type="number" className="input-base w-full" value={form.months} onChange={e => setForm({...form,months:Number(e.target.value)})}/></div>
              <div>
                <label className="text-xs text-white/40 mb-1 block">Couleur</label>
                <div className="flex gap-2">
                  {["emerald","blue","amber","purple","red"].map(c => (
                    <button key={c} onClick={() => setForm({...form,color:c})} className={`w-8 h-8 rounded-full border-2 transition-all ${form.color===c?"border-white scale-110":"border-transparent"}`} style={{background:colorMap[c]}}/>
                  ))}
                </div>
              </div>
              <button onClick={addGoal} className="btn-primary w-full mt-2">Créer l'objectif</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
