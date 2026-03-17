import { BUDGET_CATS, CASHFLOW } from '../data/constants';

export default function BudgetPage() {
  const totalBudget = BUDGET_CATS.reduce((s, c) => s + c.budget, 0);
  const totalSpent = BUDGET_CATS.reduce((s, c) => s + c.spent, 0);
  const income = CASHFLOW[CASHFLOW.length - 1].income;
  const savings = income - totalSpent;
  const savingsRate = Math.round(savings / income * 100);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-xl text-white display-serif">Budget & Cashflow</h1>
        <p className="text-sm text-white/40 mt-1">Suivez vos dépenses et votre épargne</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          {l:"Revenus",v:`${income.toLocaleString("fr-FR")} €`,c:"border-l-emerald-500",tc:"text-emerald-400"},
          {l:"Dépenses",v:`${totalSpent.toLocaleString("fr-FR")} €`,c:"border-l-red-500",tc:"text-red-400"},
          {l:"Épargne",v:`${savings.toLocaleString("fr-FR")} €`,c:"border-l-blue-500",tc:"text-blue-400"},
          {l:"Taux d'épargne",v:`${savingsRate}%`,c:"border-l-amber-500",tc:savingsRate>=20?"text-emerald-400":"text-amber-400"},
        ].map(k=>(
          <div key={k.l} className={`card border-l-[3px] ${k.c}`}>
            <p className="text-[10px] font-medium text-white/40 uppercase tracking-wider mb-2">{k.l}</p>
            <p className={`text-lg font-bold mono ${k.tc}`}>{k.v}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-7 card">
          <p className="text-sm font-medium text-white/80 mb-4">Cashflow 6 mois</p>
          <div className="flex items-end gap-2 h-32">
            {CASHFLOW.map((d, i) => {
              const maxVal = Math.max(...CASHFLOW.map(x => Math.max(x.income, x.expenses)));
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex gap-0.5" style={{height:"100px"}}>
                    <div className="flex-1 bg-emerald-500/30 rounded-t" style={{height:`${d.income/maxVal*100}%`,marginTop:"auto"}}/>
                    <div className="flex-1 bg-red-500/30 rounded-t" style={{height:`${d.expenses/maxVal*100}%`,marginTop:"auto"}}/>
                  </div>
                  <span className="text-[10px] text-white/40">{d.m}</span>
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 mt-3">
            <span className="text-[10px] text-white/40 flex items-center gap-1"><span className="w-2 h-2 bg-emerald-500/50 rounded"/>Revenus</span>
            <span className="text-[10px] text-white/40 flex items-center gap-1"><span className="w-2 h-2 bg-red-500/50 rounded"/>Dépenses</span>
          </div>
        </div>
        <div className="col-span-5 card">
          <p className="text-sm font-medium text-white/80 mb-4">Budget par catégorie</p>
          <div className="space-y-3">
            {BUDGET_CATS.map(c => {
              const pct = Math.round(c.spent / c.budget * 100);
              return (
                <div key={c.id}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/60">{c.icon} {c.name}</span>
                    <span className="text-white/40 mono">{c.spent}/{c.budget} €</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{width:`${Math.min(pct,100)}%`,background:pct>100?"#ef4444":c.color}}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="card border-l-[3px] border-l-emerald-500">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-amber-400">💡</span>
          <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider">Conseil</span>
        </div>
        <p className="text-sm text-white/60">Vous épargnez {savingsRate}% de vos revenus. {savingsRate>=20?"Excellent rythme !":"Essayez d'atteindre 20% pour accélérer vos objectifs."}</p>
      </div>
    </div>
  );
}
