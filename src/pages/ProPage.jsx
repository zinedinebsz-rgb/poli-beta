import { useState } from 'react';
import { PROP_FIRMS } from '../data/constants';

export default function ProPage() {
  const [tab, setTab] = useState("trading");
  const [accounts] = useState([
    {id:1,firm:"Topstep",accountId:"TS-50K-001",balance:52400,pnl:2400,status:"active"},
    {id:2,firm:"Apex Trader",accountId:"APX-150K-003",balance:148200,pnl:-1800,status:"active"},
    {id:3,firm:"FTMO",accountId:"FTMO-100K",balance:100000,pnl:0,status:"evaluation"},
  ]);
  const totalCapital = accounts.reduce((s, a) => s + a.balance, 0);
  const totalPnl = accounts.reduce((s, a) => s + a.pnl, 0);

  const [clients] = useState([
    {id:1,name:"ACME Corp",ca:45000,invoices:3,status:"actif"},
    {id:2,name:"TechStart SAS",ca:28000,invoices:2,status:"actif"},
    {id:3,name:"BioLab SARL",ca:12000,invoices:1,status:"prospect"},
  ]);
  const [invoices] = useState([
    {id:1,client:"ACME Corp",amount:15000,date:"01/03/2026",status:"paid"},
    {id:2,client:"ACME Corp",amount:15000,date:"15/02/2026",status:"pending"},
    {id:3,client:"TechStart SAS",amount:14000,date:"01/03/2026",status:"overdue"},
  ]);

  const [expenses] = useState([
    {id:1,label:"Loyer bureau",amount:1200,cat:"Locaux",date:"01/03"},
    {id:2,label:"Abonnement SaaS",amount:450,cat:"Logiciels",date:"05/03"},
    {id:3,label:"Déplacement client",amount:280,cat:"Transport",date:"12/03"},
  ]);
  const [revenue] = useState([
    {id:1,label:"Facture ACME",amount:15000,date:"01/03"},
    {id:2,label:"Facture TechStart",amount:14000,date:"15/03"},
  ]);
  const totalRev = revenue.reduce((s, r) => s + r.amount, 0);
  const totalExp = expenses.reduce((s, e) => s + e.amount, 0);
  const margin = Math.round((totalRev - totalExp) / totalRev * 100);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-xl text-white display-serif">POLI Pro</h1>
        <p className="text-sm text-white/40 mt-1">Trading, cabinet et gestion PME</p>
      </div>

      <div className="flex gap-1 p-0.5 surface-2 rounded-lg border border-white/5 w-fit">
        {[["trading","📊 Trading"],["cabinet","🏛 Cabinet"],["pme","🏢 PME"]].map(([v, l]) => (
          <button key={v} onClick={() => setTab(v)} className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${tab === v ? "bg-accent text-black" : "text-white/40 hover:text-white/60"}`}>{l}</button>
        ))}
      </div>

      {tab === "trading" && <>
        <div className="grid grid-cols-3 gap-4">
          {[
            {l:"Capital total",v:`${totalCapital.toLocaleString("fr-FR")} €`,c:"border-l-emerald-500"},
            {l:"PnL global",v:`${totalPnl>=0?"+":""}${totalPnl.toLocaleString("fr-FR")} €`,c:totalPnl>=0?"border-l-emerald-500":"border-l-red-500"},
            {l:"Comptes actifs",v:`${accounts.filter(a => a.status === "active").length}/${accounts.length}`,c:"border-l-blue-500"},
          ].map(k => (
            <div key={k.l} className={`card border-l-[3px] ${k.c}`}>
              <p className="text-[10px] font-medium text-white/40 uppercase tracking-wider mb-2">{k.l}</p>
              <p className="text-lg font-bold text-white mono">{k.v}</p>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {accounts.map(a => (
            <div key={a.id} className="flex items-center gap-4 px-5 py-4 card">
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{a.firm} · {a.accountId}</p>
                <p className="text-xs text-white/40">Status: <span className={a.status === "active" ? "text-emerald-400" : a.status === "evaluation" ? "text-amber-400" : "text-white/40"}>{a.status}</span></p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-white mono">{a.balance.toLocaleString("fr-FR")} €</p>
                <p className={`text-xs mono ${a.pnl >= 0 ? "text-emerald-400" : "text-red-400"}`}>{a.pnl >= 0 ? "+" : ""}{a.pnl.toLocaleString("fr-FR")} €</p>
              </div>
            </div>
          ))}
        </div>
        <div className="card">
          <p className="text-sm font-medium text-white/80 mb-3">Prop Firms</p>
          <div className="space-y-2">
            {PROP_FIRMS.map(f => (
              <div key={f.name} className="flex items-center gap-3 px-3 py-2 surface-2 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${f.status === "active" ? "bg-emerald-500" : f.status === "pending" ? "bg-amber-500" : "bg-white/20"}`}/>
                <span className="text-sm text-white flex-1">{f.name}</span>
                <span className="text-xs text-white/40">{f.type}</span>
                {f.funded && <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">Funded</span>}
              </div>
            ))}
          </div>
        </div>
      </>}

      {tab === "cabinet" && <>
        <div className="grid grid-cols-3 gap-4">
          <div className="card border-l-[3px] border-l-emerald-500"><p className="text-[10px] text-white/40 uppercase mb-2">CA Total</p><p className="text-lg font-bold text-emerald-400 mono">{clients.reduce((s, c) => s + c.ca, 0).toLocaleString("fr-FR")} €</p></div>
          <div className="card border-l-[3px] border-l-amber-500"><p className="text-[10px] text-white/40 uppercase mb-2">Impayés</p><p className="text-lg font-bold text-amber-400 mono">{invoices.filter(i => i.status !== "paid").reduce((s, i) => s + i.amount, 0).toLocaleString("fr-FR")} €</p></div>
          <div className="card border-l-[3px] border-l-blue-500"><p className="text-[10px] text-white/40 uppercase mb-2">Clients</p><p className="text-lg font-bold text-white mono">{clients.length}</p></div>
        </div>
        <div className="card">
          <p className="text-sm font-medium text-white/80 mb-3">Clients</p>
          <div className="space-y-2">
            {clients.map(c => (
              <div key={c.id} className="flex items-center gap-3 px-3 py-2.5 surface-2 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">{c.name.slice(0, 2)}</div>
                <div className="flex-1"><p className="text-sm text-white">{c.name}</p><p className="text-xs text-white/40">{c.invoices} factures</p></div>
                <span className={`text-xs px-2 py-0.5 rounded ${c.status === "actif" ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-white/40"}`}>{c.status}</span>
                <span className="text-sm font-medium text-white mono">{c.ca.toLocaleString("fr-FR")} €</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <p className="text-sm font-medium text-white/80 mb-3">Factures récentes</p>
          <div className="space-y-2">
            {invoices.map(inv => (
              <div key={inv.id} className="flex items-center gap-3 px-3 py-2.5 surface-2 rounded-lg">
                <span className="text-sm text-white flex-1">{inv.client}</span>
                <span className="text-xs text-white/40">{inv.date}</span>
                <span className="text-sm font-medium text-white mono">{inv.amount.toLocaleString("fr-FR")} €</span>
                <span className={`text-[10px] px-2 py-0.5 rounded ${inv.status === "paid" ? "bg-emerald-500/10 text-emerald-400" : inv.status === "pending" ? "bg-amber-500/10 text-amber-400" : "bg-red-500/10 text-red-400"}`}>{inv.status === "paid" ? "Payée" : inv.status === "pending" ? "En attente" : "Impayée"}</span>
              </div>
            ))}
          </div>
        </div>
      </>}

      {tab === "pme" && <>
        <div className="grid grid-cols-4 gap-4">
          <div className="card border-l-[3px] border-l-emerald-500"><p className="text-[10px] text-white/40 uppercase mb-2">Chiffre d'affaires</p><p className="text-lg font-bold text-emerald-400 mono">{totalRev.toLocaleString("fr-FR")} €</p></div>
          <div className="card border-l-[3px] border-l-red-500"><p className="text-[10px] text-white/40 uppercase mb-2">Charges</p><p className="text-lg font-bold text-red-400 mono">{totalExp.toLocaleString("fr-FR")} €</p></div>
          <div className="card border-l-[3px] border-l-blue-500"><p className="text-[10px] text-white/40 uppercase mb-2">Marge</p><p className="text-lg font-bold text-blue-400 mono">{margin}%</p></div>
          <div className="card border-l-[3px] border-l-amber-500"><p className="text-[10px] text-white/40 uppercase mb-2">Résultat</p><p className="text-lg font-bold text-white mono">{(totalRev - totalExp).toLocaleString("fr-FR")} €</p></div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="card">
            <p className="text-sm font-medium text-white/80 mb-3">Revenus</p>
            {revenue.map(r => (
              <div key={r.id} className="flex items-center gap-3 px-3 py-2 surface-2 rounded-lg mb-2">
                <span className="text-emerald-400">↑</span>
                <span className="text-sm text-white flex-1">{r.label}</span>
                <span className="text-xs text-white/40">{r.date}</span>
                <span className="text-sm font-medium text-emerald-400 mono">+{r.amount.toLocaleString("fr-FR")} €</span>
              </div>
            ))}
          </div>
          <div className="card">
            <p className="text-sm font-medium text-white/80 mb-3">Charges</p>
            {expenses.map(e => (
              <div key={e.id} className="flex items-center gap-3 px-3 py-2 surface-2 rounded-lg mb-2">
                <span className="text-red-400">↓</span>
                <span className="text-sm text-white flex-1">{e.label}</span>
                <span className="text-xs text-white/40">{e.cat} · {e.date}</span>
                <span className="text-sm font-medium text-red-400 mono">-{e.amount.toLocaleString("fr-FR")} €</span>
              </div>
            ))}
          </div>
        </div>
      </>}
    </div>
  );
}
