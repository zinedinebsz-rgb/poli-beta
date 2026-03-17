import { createContext, useState, useCallback } from 'react';
import { NOTIFS } from '../data/constants';

export const AppCtx = createContext();

export function AppProvider({ children }) {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [notifs, setNotifs] = useState(NOTIFS);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showAssetDetail, setShowAssetDetail] = useState(false);

  const markNotifRead = useCallback((id) => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  return (
    <AppCtx.Provider value={{
      currentPage,
      setCurrentPage,
      notifs,
      markNotifRead,
      markAllRead,
      selectedAsset,
      setSelectedAsset,
      showAssetDetail,
      setShowAssetDetail
    }}>
      {children}
    </AppCtx.Provider>
  );
}
