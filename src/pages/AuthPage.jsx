import { useState } from 'react';
import { useAuth } from '../lib/AuthContext';

export default function AuthPage() {
  const { signIn, signUp, resetPassword } = useAuth();
  const [mode, setMode] = useState('login'); // login | register | reset
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const { error } = await signIn(email, password);
        if (error) setError(error.message);
      } else if (mode === 'register') {
        const { error } = await signUp(email, password, { full_name: name });
        if (error) setError(error.message);
        else setMessage('Compte cr\u00e9\u00e9 ! V\u00e9rifie ton email pour confirmer.');
      } else if (mode === 'reset') {
        const { error } = await resetPassword(email);
        if (error) setError(error.message);
        else setMessage('Email de r\u00e9initialisation envoy\u00e9.');
      }
    } catch (err) {
      setError('Une erreur est survenue. R\u00e9essaie.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen surface-0 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fadeIn">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="display-serif text-5xl text-white mb-2">POLI</h1>
          <p className="text-zinc-500 text-sm">Gestion de patrimoine \u00e9thique</p>
        </div>

        {/* Card */}
        <div className="card">
          <h2 className="text-white text-lg font-semibold mb-1">
            {mode === 'login' ? 'Connexion' : mode === 'register' ? 'Cr\u00e9er un compte' : 'Mot de passe oubli\u00e9'}
          </h2>
          <p className="text-zinc-500 text-sm mb-6">
            {mode === 'login'
              ? 'Connecte-toi \u00e0 ton espace POLI'
              : mode === 'register'
              ? 'Rejoins la beta de POLI'
              : 'On t\u2019envoie un lien de r\u00e9initialisation'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="text-zinc-400 text-xs font-medium mb-1 block">Nom complet</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-base w-full"
                  placeholder="Zin\u00e9dine B."
                  required
                />
              </div>
            )}

            <div>
              <label className="text-zinc-400 text-xs font-medium mb-1 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-base w-full"
                placeholder="toi@email.com"
                required
              />
            </div>

            {mode !== 'reset' && (
              <div>
                <label className="text-zinc-400 text-xs font-medium mb-1 block">Mot de passe</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-base w-full"
                  placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
                  required
                  minLength={6}
                />
              </div>
            )}

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 text-red-400 text-sm">
                {error}
              </div>
            )}

            {message && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2 text-emerald-400 text-sm">
                {message}
              </div>
            )}

            <button type="submit" className="btn-primary w-full py-3 text-sm" disabled={loading}>
              {loading ? (
                <span className="animate-pulse-subtle">Chargement\u2026</span>
              ) : mode === 'login' ? (
                'Se connecter'
              ) : mode === 'register' ? (
                'Cr\u00e9er mon compte'
              ) : (
                'Envoyer le lien'
              )}
            </button>
          </form>

          {/* Mode switchers */}
          <div className="mt-6 pt-4 border-t border-white/5 text-center space-y-2">
            {mode === 'login' && (
              <>
                <button onClick={() => setMode('reset')} className="text-zinc-500 hover:text-zinc-300 text-xs block w-full">
                  Mot de passe oubli\u00e9 ?
                </button>
                <button onClick={() => setMode('register')} className="text-emerald-400 hover:text-emerald-300 text-sm block w-full">
                  Pas encore de compte ? S\u2019inscrire
                </button>
              </>
            )}
            {mode === 'register' && (
              <button onClick={() => setMode('login')} className="text-emerald-400 hover:text-emerald-300 text-sm">
                D\u00e9j\u00e0 un compte ? Se connecter
              </button>
            )}
            {mode === 'reset' && (
              <button onClick={() => setMode('login')} className="text-emerald-400 hover:text-emerald-300 text-sm">
                Retour \u00e0 la connexion
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-zinc-600 text-xs mt-8">
          POLI Beta &middot; Gestion de patrimoine \u00e9thique
        </p>
      </div>
    </div>
  );
}
