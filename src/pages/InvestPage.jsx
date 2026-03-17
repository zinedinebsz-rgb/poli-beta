import { useState, useMemo } from 'react';
import { ETHIC_PROFILES, ASSETS } from '../data/constants';
import Icon from '../data/icons';

export default function InvestPage() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('allocation');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showAssetDetail, setShowAssetDetail] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const profiles = useMemo(() => {
    const cats = {};
    ETHIC_PROFILES.forEach(p => {
      if (!cats[p.category]) cats[p.category] = [];
      cats[p.category].push(p);
    });
    return cats;
  }, []);

  const filteredAssets = useMemo(() => {
    let filtered = ASSETS.filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.ticker.toLowerCase().includes(search.toLowerCase()));
    if (selectedProfile) {
      filtered = filtered.sort((a, b) => (b.scores[selectedProfile] || 0) - (a.scores[selectedProfile] || 0));
    } else {
      if (sortBy === 'allocation') filtered.sort((a, b) => b.allocation - a.allocation);
      if (sortBy === 'price') filtered.sort((a, b) => b.price - a.price);
      if (sortBy === 'change') filtered.sort((a, b) => b.change - a.change);
    }
    return filtered;
  }, [search, sortBy, selectedProfile]);

  return (
    <div className="space-y-6">
      <div className="card animate-slideInUp">
        <div className="mb-4">
          <div className="text-white/60 text-sm mb-3">Profils Éthiques</div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedProfile(null)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition text-sm font-medium ${
                !selectedProfile
                  ? 'bg-accent-emerald text-surface-0'
                  : 'bg-surface-2 text-white/70 hover:text-white'
              }`}
            >
              Tous
            </button>
            {Object.entries(profiles).map(([cat, items]) => (
              <div key={cat} className="flex gap-2">
                {items.slice(0, 3).map(profile => (
                  <button
                    key={profile.id}
                    onClick={() => setSelectedProfile(profile.id)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition text-sm font-medium ${
                      selectedProfile === profile.id
                        ? 'bg-accent-emerald text-surface-0'
                        : 'bg-surface-2 text-white/70 hover:text-white'
                    }`}
                    title={profile.description}
                  >
                    {profile.name}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card animate-slideInUp flex gap-4 items-center">
        <input
          type="text"
          placeholder="Rechercher un actif..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-base flex-1"
        />
        {!selectedProfile && (
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-base">
            <option value="allocation">Allocation</option>
            <option value="price">Prix</option>
            <option value="change">Variation</option>
          </select>
        )}
      </div>

      <div className="card animate-slideInUp">
        <div className="text-white/60 text-sm mb-4">Ma watchlist</div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {ASSETS.slice(0, 6).map(asset => (
            <button
              key={asset.id}
              onClick={() => { setSelectedAsset(asset); setShowAssetDetail(true); }}
              className="flex-shrink-0 surface-2 rounded-lg p-3 hover:border-accent-emerald border border-transparent transition min-w-max"
            >
              <div className="text-sm font-medium text-white">{asset.ticker}</div>
              <div className="text-xs text-white/60 mt-1">{asset.price.toFixed(2)}€</div>
              <div className={`text-xs mt-1 font-medium ${asset.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {asset.change > 0 ? '+' : ''}{asset.change}%
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-white/60 text-sm">Actifs disponibles ({filteredAssets.length})</div>
        {filteredAssets.map((asset, idx) => (
          <button
            key={asset.id}
            onClick={() => { setSelectedAsset(asset); setShowAssetDetail(true); }}
            className="card hover:border-accent-emerald border-transparent transition animate-slideInUp text-left"
            style={{ animationDelay: `${idx * 0.02}s` }}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-semibold text-white">{asset.name}</div>
                    <div className="text-xs text-white/60 mt-0.5">{asset.ticker} • {asset.allocation}% du portefeuille</div>
                  </div>
                </div>
                {selectedProfile && (
                  <div className="mt-2 text-sm">
                    <div className="text-white/60 text-xs mb-1">Score pour ce profil</div>
                    <div className="text-lg font-semibold text-accent-emerald">{asset.scores[selectedProfile]}/100</div>
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="font-semibold text-white">{asset.price.toFixed(2)}€</div>
                <div className={`text-sm mt-1 font-medium ${asset.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {asset.change > 0 ? '+' : ''}{asset.change}%
                </div>
                {asset.qty > 0 && <div className="text-xs text-white/60 mt-1">×{asset.qty.toFixed(2)}</div>}
              </div>
            </div>
          </button>
        ))}
      </div>

      {showAssetDetail && selectedAsset && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="surface-1 rounded-xl border border-soft max-w-2xl w-full max-h-96 overflow-y-auto animate-slideInUp">
            <div className="p-6 border-b border-soft flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-semibold text-white">{selectedAsset.name}</h2>
                <p className="text-white/60 text-sm mt-1">{selectedAsset.ticker}</p>
              </div>
              <button
                onClick={() => setShowAssetDetail(false)}
                className="p-1 hover:bg-white/10 rounded transition"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="surface-2 rounded p-4">
                  <div className="text-white/60 text-xs">Prix courant</div>
                  <div className="text-2xl font-semibold text-white mt-1">{selectedAsset.price.toFixed(2)}€</div>
                </div>
                <div className="surface-2 rounded p-4">
                  <div className="text-white/60 text-xs">Variation</div>
                  <div className={`text-2xl font-semibold mt-1 ${selectedAsset.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {selectedAsset.change > 0 ? '+' : ''}{selectedAsset.change}%
                  </div>
                </div>
              </div>

              <div>
                <div className="text-white/60 text-sm mb-3">Scores par profil éthique</div>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                  {Object.entries(selectedAsset.scores).map(([profileId, score]) => {
                    const profile = ETHIC_PROFILES.find(p => p.id === profileId);
                    return (
                      <div key={profileId} className="surface-2 rounded p-2 flex justify-between items-center">
                        <span className="text-xs text-white/70">{profile?.name || profileId}</span>
                        <span className="font-semibold text-accent-emerald text-sm">{score}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
