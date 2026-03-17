import { useState } from 'react';
import { BANKS } from '../data/constants';

export default function BankPage() {
  const [accounts, setAccounts] = useState([
    {id:1,name:"Compte Courant Boursorama",bank:"Boursorama",emoji:"🏦",balance:8420,score:82},
    {id:2,name:"PEA Boursorama",bank:"Boursorama",emoji:"🏦",balance:45600,score:88},
    {id:3,name:"Livret A BNP",bank:"BNP Paribas",emoji:"🏛",balance:22500,score:75},
    {id:4,name:"Assurance-Vie Generali",bank:"Generali",emoji:"🛡",balance:32000,score:70},
  ]);
  const [showDialog,setShowDialog]=useState(false);
  const [step,setStep]=useState(1);
  const [search,setSearch]=useState("");
  const [selected,setSelected]=useState(null);
  const total=accounts.reduce((s,a)=>s+a.balance,0);
  const filteredBanks=BANKS.filter(b=>b.n.toLowerCase().includes(search.toLowerCase()));

  const connectBank=()=>{
    if(!selected)return;
    setStep(2);
    setTimeout(()=>{setStep(3);},1500);
    setTimeout(()=>{
      setAccounts(p=>[...p,{id:Date.now(),name:"Nouveau compte "+selected.n,bank:selected.n,emoji:selected.e,balance:Math.round(Math.random()*20000+1000),score:Math.round(Math.random()*20+70)}]);
      setShowDialog(false);setStep(1);setSelected(null);setSearch("");
    },3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl text-white display-serif">Banque</h1>
          <p className="text-sm text-white/40 mt-1">Comptes connectés et soldes</p>
        </div>
        <button onClick={()=>setShowDialog(true)} className="btn-primary text-sm flex items-center gap-2">+ Connecter un compte</button>
      </div>

      <div className="card">
        <p className="text-[10px] font-medium text-white/40 uppercase tracking-wider mb-2">Total tous comptes</p>
        <p className="text-2xl font-bold text-white mono">{total.toLocaleString("fr-FR")} €</p>
      </div>

      <div className="flex gap-3">
        {[{l:"AES-256",d:"Chiffrement"},{l:"DSP2",d:"Conformité"},{l:"RGPD",d:"Données EU"}].map(b=>(
          <div key={b.l} className="flex items-center gap-2 px-3 py-2 rounded-lg surface-2 border border-white/5 text-xs">
            <span className="text-accent">✓</span>
            <span className="text-white/60">{b.d}</span>
            <span className="text-white/80 font-medium">{b.l}</span>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        {accounts.map(a=>(
          <div key={a.id} className="flex items-center gap-4 px-5 py-4 rounded-lg surface-1 border border-white/5 hover:border-white/10 transition-all">
            <span className="text-2xl">{a.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">{a.name}</p>
              <p className="text-xs text-white/40">{a.bank} · Score {a.score}/100</p>
            </div>
            <p className="text-sm font-semibold text-white mono">{a.balance.toLocaleString("fr-FR")} €</p>
            <button onClick={()=>setAccounts(p=>p.filter(x=>x.id!==a.id))} className="text-white/20 hover:text-red-400 transition-colors text-xs">✕</button>
          </div>
        ))}
      </div>

      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={()=>{setShowDialog(false);setStep(1);setSelected(null);}}>
          <div className="absolute inset-0 bg-black/60"/>
          <div className="relative surface-3 border border-white/10 rounded-xl w-full max-w-md p-6 animate-slideInUp" onClick={e=>e.stopPropagation()}>
            <button onClick={()=>{setShowDialog(false);setStep(1);setSelected(null);}} className="absolute top-3 right-3 text-white/40 hover:text-white">✕</button>
            {step===1 && <>
              <h2 className="text-lg font-semibold text-white mb-4 display-serif">Connecter une banque</h2>
              <input className="input-base w-full mb-4" placeholder="Rechercher une banque..." value={search} onChange={e=>setSearch(e.target.value)}/>
              <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                {filteredBanks.map(b=>(
                  <button key={b.n} onClick={()=>setSelected(b)} className={"flex flex-col items-center gap-1 p-3 rounded-lg border transition-all text-center "+(selected?.n===b.n?"border-accent bg-accent/10":"border-white/5 hover:border-white/10")}>
                    <span className="text-xl">{b.e}</span>
                    <span className="text-[10px] text-white/60">{b.n}</span>
                  </button>
                ))}
              </div>
              {selected && <button onClick={connectBank} className="btn-primary w-full mt-4 text-sm">Connecter {selected.n}</button>}
            </>}
            {step===2 && <div className="text-center py-8">
              <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"/>
              <p className="text-white font-medium">Vérification sécurisée...</p>
              <p className="text-white/40 text-sm mt-1">Connexion DSP2 en cours</p>
            </div>}
            {step===3 && <div className="text-center py-8">
              <div className="text-4xl mb-4">✅</div>
              <p className="text-white font-medium">Compte connecté !</p>
              <p className="text-white/40 text-sm mt-1">Synchronisation en cours...</p>
            </div>}
          </div>
        </div>
      )}
    </div>
  );
}
