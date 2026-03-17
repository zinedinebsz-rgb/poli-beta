import { useState, useEffect } from 'react';
import { OB_STEPS } from '../data/constants';

const PoliMark = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="14" stroke="#34d399" strokeWidth="2.5"/>
    <path d="M16 8v8M12 16h8" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="16" cy="16" r="2" fill="#34d399"/>
  </svg>
);

export default function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const s = OB_STEPS[step];
  const isLast = step === OB_STEPS.length - 1;

  useEffect(() => {
    try {
      const stored = localStorage.getItem("poli_ob");
      if (stored) setCompleted(JSON.parse(stored));
    } catch {
      setCompleted(false);
    }
  }, []);

  const next = () => {
    if (isLast) {
      setCompleted(true);
      localStorage.setItem("poli_ob", JSON.stringify(true));
      onDone();
    } else {
      setStep(p => p + 1);
    }
  };

  const handleClose = () => {
    setCompleted(true);
    localStorage.setItem("poli_ob", JSON.stringify(true));
    onDone();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center">
      <div className="absolute inset-0 surface-0" style={{opacity: 0.95}}/>
      <div className="relative surface-3 border border-white/10 rounded-xl w-full max-w-[520px] mx-4 overflow-hidden shadow-2xl animate-slideInUp">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-white z-20 transition-colors"
        >
          ✕
        </button>

        {s.hero && (
          <div className="relative h-[180px] flex items-center justify-center overflow-hidden surface-0">
            <div className="absolute w-40 h-40 rounded-full bg-accent/10 blur-3xl top-2 left-1/4"/>
            <div className="absolute w-32 h-32 rounded-full bg-gold/10 blur-3xl bottom-2 right-1/4"/>
            <PoliMark size={56}/>
          </div>
        )}

        <div className="flex gap-1 px-6 pt-4">
          {OB_STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-0.5 flex-1 rounded-full transition-all ${i <= step ? "bg-accent-emerald" : "bg-white/10"}`}
            />
          ))}
        </div>

        <div className="px-6 pt-5 pb-6 min-h-[280px] flex flex-col">
          <h2 className="text-xl text-white mb-1 display-serif">{s.title}</h2>
          <p className="text-sm text-white/40 mb-3">{s.sub}</p>
          <p className="text-[13px] text-white/60 leading-relaxed mb-4">{s.desc}</p>
          <div className="space-y-2 flex-1">
            {s.feats.map((f, fi) => (
              <div key={fi} className="flex items-start gap-2.5">
                <span className="text-accent-emerald text-xs mt-0.5">✓</span>
                <span className="text-[13px] text-white/70">{f}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between pt-4 mt-auto border-t border-white/5">
            <div>
              {step > 0 && (
                <button
                  onClick={() => setStep(p => p - 1)}
                  className="text-sm text-white/40 hover:text-white transition-colors"
                >
                  ← Retour
                </button>
              )}
            </div>
            <div className="flex items-center gap-3">
              {s.skip && (
                <button onClick={next} className="text-xs text-white/30 hover:text-white/60 transition-colors">
                  {s.skip}
                </button>
              )}
              <button onClick={next} className="btn-primary text-sm">
                {s.cta} {!isLast && "→"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
