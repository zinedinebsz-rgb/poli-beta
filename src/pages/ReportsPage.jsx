import { useState } from 'react';
import { REPORT_TYPES } from '../data/constants';

export default function ReportsPage() {
  const [reports] = useState([
    {id:1,title:"Bilan Patrimonial Q1 2026",type:"patrimonial",date:"15/03/2026",sections:[
      {title:"Synthèse",metrics:[{l:"Patrimoine net",v:"782 150 €",t:"up"},{l:"Performance YTD",v:"+12.5%",t:"up"},{l:"Score ESG",v:"78/100",t:"stable"}]},
      {title:"Allocation",metrics:[{l:"Actions",v:"45%",t:"stable"},{l:"Obligations",v:"25%",t:"up"},{l:"Immobilier",v:"15%",t:"stable"}]}
    ]},
    {id:2,title:"Rapport ESG Annuel",type:"esg",date:"01/03/2026"},
    {id:3,title:"Performance Q4 2025",type:"performance",date:"01/01/2026"},
    {id:4,title:"Analyse des frais 2025",type:"fiscal",date:"15/02/2026"},
  ]);
  const [viewing, setViewing] = useState(null);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl text-white display-serif">Rapports</h1>
          <p className="text-sm text-white/40 mt-1">Vos rapports et analyses</p>
        </div>
        <button className="btn-primary text-sm">+ Générer un rapport</button>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {REPORT_TYPES.map(t => (
          <div key={t.id} className="card text-center hover:bg-white/[0.02] transition-colors cursor-pointer">
            <span className="text-2xl">{t.icon}</span>
            <p className="text-sm font-medium text-white mt-2">{t.title}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        {reports.map(r => {
          const type = REPORT_TYPES.find(t => t.id === r.type);
          return (
            <div key={r.id} className="flex items-center gap-4 px-5 py-4 card hover:bg-white/[0.02] transition-colors cursor-pointer" onClick={() => setViewing(viewing === r.id ? null : r.id)}>
              <span className="text-xl">{type?.icon||"📄"}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">{r.title}</p>
                <p className="text-xs text-white/40">{type?.title}</p>
              </div>
              <span className="text-xs text-white/40 mono">{r.date}</span>
              <span className="text-white/30">{viewing === r.id?"▲":"▼"}</span>
            </div>
          );
        })}
      </div>

      {viewing && reports.find(r => r.id === viewing)?.sections && (
        <div className="card animate-slideInUp">
          {reports.find(r => r.id === viewing).sections.map((s, i) => (
            <div key={i} className={i>0?"mt-4 pt-4 border-t border-white/5":""}>
              <p className="text-sm font-medium text-white/80 mb-3">{s.title}</p>
              <div className="grid grid-cols-3 gap-3">
                {s.metrics.map(m => (
                  <div key={m.l} className="surface-2 rounded-lg p-3">
                    <p className="text-[10px] text-white/40 uppercase">{m.l}</p>
                    <p className="text-sm font-bold text-white mono mt-1">{m.v}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
