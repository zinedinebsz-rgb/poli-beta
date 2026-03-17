import { useState } from 'react';

export default function ManagersPage() {
  const [sub, setSub] = useState(false);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-xl text-white display-serif">Gestionnaires</h1>
        <p className="text-sm text-white/40 mt-1">Annuaire des gestionnaires partenaires</p>
      </div>
      <div className="card text-center py-12">
        <span className="text-4xl">🏗</span>
        <h2 className="text-lg font-semibold text-white mt-4 display-serif">Bientôt disponible</h2>
        <p className="text-sm text-white/40 mt-2 max-w-md mx-auto">Accédez à un annuaire de gestionnaires de patrimoine éthiques, certifiés par POLI.</p>
        <div className="flex gap-4 justify-center mt-6">
          {[
            {t:"Gestionnaires certifiés",d:"Vérifiés et notés par la communauté"},
            {t:"Matching éthique",d:"Trouvez un conseiller aligné avec vos valeurs"},
            {t:"Consultation en ligne",d:"Prenez RDV directement depuis POLI"},
          ].map(f => (
            <div key={f.t} className="surface-2 rounded-lg p-4 max-w-[200px] text-left">
              <p className="text-sm font-medium text-white">{f.t}</p>
              <p className="text-xs text-white/40 mt-1">{f.d}</p>
            </div>
          ))}
        </div>
        <button onClick={() => setSub(!sub)} className={sub?"btn-secondary mt-6":"btn-primary mt-6"}>
          {sub?"✓ Inscrit · Merci !":"M'avertir du lancement"}
        </button>
      </div>
    </div>
  );
}
