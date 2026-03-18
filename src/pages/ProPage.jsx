import { useState, useEffect } from 'react';
import { PROP_FIRMS } from '../data/constants';

export default function ProPage() {
  const [tab, setTab] = useState("trading");

  // Load from localStorage or use defaults
  const [accounts, setAccounts] = useState([]);
  const [pmeData, setPmeData] = useState({company:"",siret:"",sector:"",revenue:"",employees:"",foundingDate:"",description:""});
  const [cabinetData, setCabinetData] = useState({name:"",amfNumber:"",aum:"",clients:"",specialties:""});
  const [editingAccount, setEditingAccount] = useState(null);
  const [newAccount, setNewAccount] = useState({firm:"",accountId:"",balance:"",pnl:"",status:"active"});

  useEffect(() => {
    const saved = localStorage.getItem('poliPro');
    if (saved) {
      const data = JSON.parse(saved);
      if(data.accounts) setAccounts(data.accounts);
      if(data.pme) setPmeData(data.pme);
      if(data.cabinet) setCabinetData(data.cabinet);
    }
  }, []);

  const savePro = (key, value) => {
    const data = JSON.parse(localStorage.getItem('poliPro') || '{}');
    data[key] = value;
    localStorage.setItem('poliPro', JSON.stringify(data));
  };

  const addAccount = () => {
    if(newAccount.firm && newAccount.accountId && newAccount.balance) {
      const acc = {...newAccount, id: Date.now(), balance: parseFloat(newAccount.balance), pnl: parseFloat(newAccount.pnl || 0)};
      const updated = [...accounts, acc];
      setAccounts(updated);
      savePro('accounts', updated);
      setNewAccount({firm:"",accountId:"",balance:"",pnl:"",status:"active"});
    }
  };

  const updateAccount = () => {
    if(editingAccount) {
      const updated = accounts.map(a => a.id === editingAccount.id ? editingAccount : a);
      setAccounts(updated);
      savePro('accounts', updated);
      setEditingAccount(null);
    }
  };

  const deleteAccount = (id) => {
    const updated = accounts.filter(a => a.id !== id);
    setAccounts(updated);
    savePro('accounts', updated);
  };

  const updatePmeData = (key, value) => {
    const updated = {...pmeData, [key]: value};
    setPmeData(updated);
    savePro('pme', updated);
  };

  const updateCabinetData = (key, value) => {
    const updated = {...cabinetData, [key]: value};
    setCabinetData(updated);
    savePro('cabinet', updated);
  };

  const totalCapital = accounts.reduce((s, a) => s + (a.balance || 0), 0);
  const totalPnl = accounts.reduce((s, a) => s + (a.pnl || 0), 0);

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

        <div className="card">
          <p className="text-sm font-medium text-white/80 mb-4">Ajouter un compte prop firm</p>
          <div className="grid grid-cols-6 gap-2 mb-4">
            <input placeholder="Cabinet" value={newAccount.firm} onChange={(e) => setNewAccount({...newAccount, firm: e.target.value})} className="input-base text-xs" />
            <input placeholder="ID Compte" value={newAccount.accountId} onChange={(e) => setNewAccount({...newAccount, accountId: e.target.value})} className="input-base text-xs" />
            <input placeholder="Solde €" type="number" value={newAccount.balance} onChange={(e) => setNewAccount({...newAccount, balance: e.target.value})} className="input-base text-xs" />
            <input placeholder="PnL €" type="number" value={newAccount.pnl} onChange={(e) => setNewAccount({...newAccount, pnl: e.target.value})} className="input-base text-xs" />
            <select value={newAccount.status} onChange={(e) => setNewAccount({...newAccount, status: e.target.value})} className="input-base text-xs">
              <option value="active">Active</option>
              <option value="evaluation">Evaluation</option>
              <option value="funded">Funded</option>
            </select>
            <button onClick={addAccount} className="btn-primary text-xs">Ajouter</button>
          </div>
        </div>

        <div className="space-y-2">
          {accounts.map(a => (
            <div key={a.id} className="flex items-center gap-4 px-5 py-4 card hover:bg-white/5">
              {editingAccount?.id === a.id ? (
                <>
                  <input placeholder="Cabinet" value={editingAccount.firm} onChange={(e) => setEditingAccount({...editingAccount, firm: e.target.value})} className="input-base text-xs flex-1" />
                  <input placeholder="ID" value={editingAccount.accountId} onChange={(e) => setEditingAccount({...editingAccount, accountId: e.target.value})} className="input-base text-xs" />
                  <input type="number" value={editingAccount.balance} onChange={(e) => setEditingAccount({...editingAccount, balance: parseFloat(e.target.value)})} className="input-base text-xs w-24" />
                  <input type="number" value={editingAccount.pnl} onChange={(e) => setEditingAccount({...editingAccount, pnl: parseFloat(e.target.value)})} className="input-base text-xs w-24" />
                  <select value={editingAccount.status} onChange={(e) => setEditingAccount({...editingAccount, status: e.target.value})} className="input-base text-xs">
                    <option value="active">Active</option>
                    <option value="evaluation">Evaluation</option>
                    <option value="funded">Funded</option>
                  </select>
                  <button onClick={updateAccount} className="btn-primary text-xs">✓</button>
                  <button onClick={() => setEditingAccount(null)} className="btn-secondary text-xs">✕</button>
                </>
              ) : (
                <>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{a.firm} · {a.accountId}</p>
                    <p className="text-xs text-white/40">Status: <span className={a.status === "active" ? "text-emerald-400" : a.status === "evaluation" ? "text-amber-400" : "text-white/40"}>{a.status}</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white mono">{a.balance.toLocaleString("fr-FR")} €</p>
                    <p className={`text-xs mono ${a.pnl >= 0 ? "text-emerald-400" : "text-red-400"}`}>{a.pnl >= 0 ? "+" : ""}{a.pnl.toLocaleString("fr-FR")} €</p>
                  </div>
                  <button onClick={() => setEditingAccount(a)} className="btn-secondary text-xs">Éditer</button>
                  <button onClick={() => deleteAccount(a.id)} className="btn-secondary text-xs">Suppr.</button>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="card">
          <p className="text-sm font-medium text-white/80 mb-3">Prop Firms disponibles</p>
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
        {cabinetData.name ? (
          <div className="grid grid-cols-3 gap-4">
            <div className="card border-l-[3px] border-l-emerald-500"><p className="text-[10px] text-white/40 uppercase mb-2">Cabinet</p><p className="text-lg font-bold text-emerald-400">{cabinetData.name}</p></div>
            <div className="card border-l-[3px] border-l-amber-500"><p className="text-[10px] text-white/40 uppercase mb-2">Numéro AMF</p><p className="text-lg font-bold text-amber-400 mono">{cabinetData.amfNumber}</p></div>
            <div className="card border-l-[3px] border-l-blue-500"><p className="text-[10px] text-white/40 uppercase mb-2">AUM</p><p className="text-lg font-bold text-white mono">{cabinetData.aum.toLocaleString("fr-FR")} €</p></div>
          </div>
        ) : null}

        <div className="card">
          <p className="text-sm font-medium text-white/80 mb-4">Infos Cabinet</p>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-xs text-white/40 mb-1 block">Nom du cabinet</label><input value={cabinetData.name} onChange={(e) => updateCabinetData('name', e.target.value)} className="input-base w-full" placeholder="Nom du cabinet" /></div>
            <div><label className="text-xs text-white/40 mb-1 block">Numéro AMF</label><input value={cabinetData.amfNumber} onChange={(e) => updateCabinetData('amfNumber', e.target.value)} className="input-base w-full" placeholder="AMF XXX" /></div>
            <div><label className="text-xs text-white/40 mb-1 block">AUM (€)</label><input type="number" value={cabinetData.aum} onChange={(e) => updateCabinetData('aum', parseFloat(e.target.value) || 0)} className="input-base w-full" placeholder="0" /></div>
            <div><label className="text-xs text-white/40 mb-1 block">Nombre de clients</label><input type="number" value={cabinetData.clients} onChange={(e) => updateCabinetData('clients', e.target.value)} className="input-base w-full" placeholder="0" /></div>
            <div className="col-span-2"><label className="text-xs text-white/40 mb-1 block">Spécialités</label><input value={cabinetData.specialties} onChange={(e) => updateCabinetData('specialties', e.target.value)} className="input-base w-full" placeholder="Gestion d'actifs, CGP, etc." /></div>
          </div>
        </div>
      </>}

      {tab === "pme" && <>
        {pmeData.company ? (
          <div className="grid grid-cols-3 gap-4">
            <div className="card border-l-[3px] border-l-emerald-500"><p className="text-[10px] text-white/40 uppercase mb-2">Entreprise</p><p className="text-lg font-bold text-emerald-400">{pmeData.company}</p></div>
            <div className="card border-l-[3px] border-l-blue-500"><p className="text-[10px] text-white/40 uppercase mb-2">SIRET</p><p className="text-lg font-bold text-white mono">{pmeData.siret}</p></div>
            <div className="card border-l-[3px] border-l-amber-500"><p className="text-[10px] text-white/40 uppercase mb-2">Chiffre d'affaires</p><p className="text-lg font-bold text-amber-400 mono">{pmeData.revenue.toLocaleString("fr-FR")} €</p></div>
          </div>
        ) : null}

        <div className="card">
          <p className="text-sm font-medium text-white/80 mb-4">Informations PME/Entreprise</p>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-xs text-white/40 mb-1 block">Nom de l'entreprise</label><input value={pmeData.company} onChange={(e) => updatePmeData('company', e.target.value)} className="input-base w-full" placeholder="Votre entreprise" /></div>
            <div><label className="text-xs text-white/40 mb-1 block">SIRET</label><input value={pmeData.siret} onChange={(e) => updatePmeData('siret', e.target.value)} className="input-base w-full" placeholder="SIRET 14 chiffres" /></div>
            <div><label className="text-xs text-white/40 mb-1 block">Secteur d'activité</label><input value={pmeData.sector} onChange={(e) => updatePmeData('sector', e.target.value)} className="input-base w-full" placeholder="ex: Technologie, Commerce" /></div>
            <div><label className="text-xs text-white/40 mb-1 block">Chiffre d'affaires (€)</label><input type="number" value={pmeData.revenue} onChange={(e) => updatePmeData('revenue', e.target.value)} className="input-base w-full" placeholder="0" /></div>
            <div><label className="text-xs text-white/40 mb-1 block">Nombre d'employés</label><input type="number" value={pmeData.employees} onChange={(e) => updatePmeData('employees', e.target.value)} className="input-base w-full" placeholder="0" /></div>
            <div><label className="text-xs text-white/40 mb-1 block">Date de création</label><input type="date" value={pmeData.foundingDate} onChange={(e) => updatePmeData('foundingDate', e.target.value)} className="input-base w-full" /></div>
            <div className="col-span-2"><label className="text-xs text-white/40 mb-1 block">Description</label><textarea value={pmeData.description} onChange={(e) => updatePmeData('description', e.target.value)} className="input-base w-full h-20" placeholder="Description de votre activité..." /></div>
          </div>
        </div>
      </>}
    </div>
  );
}
