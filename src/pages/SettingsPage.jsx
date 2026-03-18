import { useState, useEffect } from 'react';
import { ETHIC_PROFILES } from '../data/constants';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({name:"",email:"",phone:""});
  const [prefs, setPrefs] = useState({currency:"EUR",language:"fr",theme:"dark"});
  const [notifPrefs, setNotifPrefs] = useState({perf:true,esg:true,fees:true,goals:false,dividends:true,security:true});
  const [twoFA, setTwoFA] = useState(false);
  const [selectedEthicalProfile, setSelectedEthicalProfile] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('poliSettings');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.profile) setProfile(data.profile);
      if (data.prefs) setPrefs(data.prefs);
      if (data.notifPrefs) setNotifPrefs(data.notifPrefs);
      if (data.twoFA !== undefined) setTwoFA(data.twoFA);
      if (data.selectedEthicalProfile) setSelectedEthicalProfile(data.selectedEthicalProfile);
    }
  }, []);

  const saveSettings = () => {
    const data = {profile, prefs, notifPrefs, twoFA, selectedEthicalProfile};
    localStorage.setItem('poliSettings', JSON.stringify(data));
  };

  const updateProfile = (key, value) => {
    const updated = {...profile, [key]: value};
    setProfile(updated);
    const data = JSON.parse(localStorage.getItem('poliSettings') || '{}');
    data.profile = updated;
    localStorage.setItem('poliSettings', JSON.stringify(data));
  };

  const updatePrefs = (key, value) => {
    const updated = {...prefs, [key]: value};
    setPrefs(updated);
    const data = JSON.parse(localStorage.getItem('poliSettings') || '{}');
    data.prefs = updated;
    localStorage.setItem('poliSettings', JSON.stringify(data));
  };

  const updateNotifPrefs = (key, value) => {
    const updated = {...notifPrefs, [key]: value};
    setNotifPrefs(updated);
    const data = JSON.parse(localStorage.getItem('poliSettings') || '{}');
    data.notifPrefs = updated;
    localStorage.setItem('poliSettings', JSON.stringify(data));
  };

  const updateTwoFA = (value) => {
    setTwoFA(value);
    const data = JSON.parse(localStorage.getItem('poliSettings') || '{}');
    data.twoFA = value;
    localStorage.setItem('poliSettings', JSON.stringify(data));
  };

  const selectEthicalProfile = (profileId) => {
    setSelectedEthicalProfile(profileId);
    const data = JSON.parse(localStorage.getItem('poliSettings') || '{}');
    data.selectedEthicalProfile = profileId;
    localStorage.setItem('poliSettings', JSON.stringify(data));
  };

  const Toggle = ({on, onChange}) => (
    <button onClick={() => onChange(!on)} className={`w-10 h-5 rounded-full transition-colors flex items-center ${on ? "bg-accent" : "bg-white/10"}`}>
      <div className={`w-4 h-4 rounded-full bg-white transition-transform mx-0.5 ${on ? "translate-x-5" : "translate-x-0"}`}/>
    </button>
  );

  const tabs = [
    {id:"profile",label:"Profil",icon:"👤"},
    {id:"connections",label:"Connexions",icon:"🔗"},
    {id:"notifications",label:"Notifications",icon:"🔔"},
    {id:"ethical",label:"Éthique",icon:"🌱"},
    {id:"security",label:"Sécurité",icon:"🔒"},
    {id:"data",label:"Données",icon:"💾"},
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-xl text-white display-serif">Paramètres</h1>
        <p className="text-sm text-white/40 mt-1">Configuration de votre compte</p>
      </div>

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-3">
          <div className="space-y-1">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all text-left ${activeTab === t.id ? "bg-white/5 text-white" : "text-white/40 hover:text-white/60"}`}>
                <span>{t.icon}</span>{t.label}
              </button>
            ))}
          </div>
        </div>
        <div className="col-span-9">
          {activeTab === "profile" && (
            <div className="card space-y-4">
              <h2 className="text-sm font-semibold text-white display-serif">Profil</h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-xl font-bold text-accent">{profile.name.slice(0, 2).toUpperCase()}</div>
                <div><p className="font-medium text-white">{profile.name || "Votre nom"}</p><p className="text-xs text-white/40">{profile.email || "email@example.com"}</p><span className="text-[10px] px-2 py-0.5 rounded bg-accent/10 text-accent">Plan Pro</span></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs text-white/40 mb-1 block">Nom</label><input className="input-base w-full" value={profile.name} onChange={(e) => updateProfile('name', e.target.value)} placeholder="Votre nom"/></div>
                <div><label className="text-xs text-white/40 mb-1 block">Email</label><input className="input-base w-full" value={profile.email} onChange={(e) => updateProfile('email', e.target.value)} placeholder="email@example.com"/></div>
                <div className="col-span-2"><label className="text-xs text-white/40 mb-1 block">Téléphone</label><input className="input-base w-full" value={profile.phone} onChange={(e) => updateProfile('phone', e.target.value)} placeholder="+33 6 xx xx xx xx"/></div>
              </div>
              <div className="text-xs text-white/40 mt-2">Paramètres sauvegardés automatiquement</div>
            </div>
          )}

          {activeTab === "connections" && (
            <div className="card space-y-4">
              <h2 className="text-sm font-semibold text-white display-serif">Préférences</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <div><p className="text-sm text-white">Devise</p><p className="text-xs text-white/40">Affichage des montants</p></div>
                  <select value={prefs.currency} onChange={(e) => updatePrefs('currency', e.target.value)} className="input-base text-sm w-32">
                    <option value="EUR">EUR (€)</option>
                    <option value="USD">USD ($)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="CHF">CHF (CHF)</option>
                  </select>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div><p className="text-sm text-white">Langue</p><p className="text-xs text-white/40">Interface de l'application</p></div>
                  <select value={prefs.language} onChange={(e) => updatePrefs('language', e.target.value)} className="input-base text-sm w-32">
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                    <option value="de">Deutsch</option>
                    <option value="es">Español</option>
                  </select>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div><p className="text-sm text-white">Thème</p><p className="text-xs text-white/40">Apparence de l'application</p></div>
                  <select value={prefs.theme} onChange={(e) => updatePrefs('theme', e.target.value)} className="input-base text-sm w-32">
                    <option value="dark">Sombre</option>
                    <option value="light">Clair</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="card space-y-4">
              <h2 className="text-sm font-semibold text-white display-serif">Notifications</h2>
              {Object.entries(notifPrefs).map(([k, v]) => (
                <div key={k} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div><p className="text-sm text-white capitalize">{k === 'perf' ? 'Performance' : k === 'esg' ? 'ESG' : k === 'fees' ? 'Frais' : k === 'goals' ? 'Objectifs' : k === 'dividends' ? 'Dividendes' : 'Sécurité'}</p><p className="text-xs text-white/40">Alertes {k}</p></div>
                  <Toggle on={v} onChange={val => updateNotifPrefs(k, val)}/>
                </div>
              ))}
            </div>
          )}

          {activeTab === "security" && (
            <div className="card space-y-4">
              <h2 className="text-sm font-semibold text-white display-serif">Sécurité</h2>
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <div><p className="text-sm text-white">Authentification 2FA</p><p className="text-xs text-white/40">TOTP / Authenticator</p></div>
                <Toggle on={twoFA} onChange={updateTwoFA}/>
              </div>
              <div className="surface-2 rounded-lg p-4">
                <p className="text-xs text-white/40 mb-2">Chiffrement</p>
                <div className="flex gap-3">
                  {["AES-256","TLS 1.3","Zero-knowledge"].map(s => (
                    <span key={s} className="text-xs px-2 py-1 rounded bg-emerald-500/10 text-emerald-400">{s}</span>
                  ))}
                </div>
              </div>
              <button className="btn-secondary text-sm">Changer le mot de passe</button>
            </div>
          )}

          {activeTab === "connections" && (
            <div className="card space-y-4">
              <h2 className="text-sm font-semibold text-white display-serif">Connexions</h2>
              {[{n:"Boursorama",s:"Connecté",c:true},{n:"BNP Paribas",s:"Connecté",c:true},{n:"Degiro",s:"Non connecté",c:false}].map(b => (
                <div key={b.n} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div><p className="text-sm text-white">{b.n}</p><p className="text-xs text-white/40">{b.s}</p></div>
                  <span className={b.c ? "text-xs text-emerald-400" : "text-xs text-white/40"}>{b.c ? "✓ Synchro" : "Connecter"}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "ethical" && (
            <div className="card space-y-4">
              <h2 className="text-sm font-semibold text-white display-serif">Profil éthique</h2>
              <p className="text-sm text-white/60">Votre profil éthique détermine les scores affichés sur chaque actif.</p>
              {selectedEthicalProfile && (
                <div className="px-3 py-2 rounded-lg bg-accent-emerald/10 border border-accent-emerald/30">
                  <p className="text-xs text-accent-emerald/60">Profil sélectionné</p>
                  <p className="text-sm font-medium text-accent-emerald">{ETHIC_PROFILES.find(p => p.id === selectedEthicalProfile)?.name}</p>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {ETHIC_PROFILES.map(p => (
                  <button key={p.id} onClick={() => selectEthicalProfile(p.id)} className={`px-3 py-1.5 rounded-md text-xs transition-all ${
                    selectedEthicalProfile === p.id
                      ? 'bg-accent-emerald text-surface-0 border border-accent-emerald'
                      : 'border border-white/5 text-white/60 hover:border-accent hover:text-accent'
                  }`}>
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === "data" && (
            <div className="card space-y-4">
              <h2 className="text-sm font-semibold text-white display-serif">Données</h2>
              <div className="flex gap-3">
                {["CSV","PDF","JSON"].map(f => (
                  <button key={f} className="btn-secondary text-sm flex items-center gap-2">📥 Exporter {f}</button>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-lg border border-red-500/20 bg-red-500/5">
                <p className="text-sm font-medium text-red-400">Zone dangereuse</p>
                <p className="text-xs text-white/40 mt-1">Supprimer votre compte et toutes vos données.</p>
                <button className="mt-3 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm hover:bg-red-500/20 transition-colors">Supprimer mon compte</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
