import { useState, useContext } from 'react';
import { NOTIFS } from '../data/constants';
import { Icon } from '../data/icons';
import { AppCtx } from '../lib/AppContext';

const NotificationBell = () => {
  const { notifs, markNotifRead, markAllRead } = useContext(AppCtx);
  const [showPanel, setShowPanel] = useState(false);
  const unreadCount = notifs.filter(n => !n.read).length;

  const getNotifColor = (type) => {
    const colors = { alert: 'bg-red-500', success: 'bg-green-500', info: 'bg-blue-500', warning: 'bg-yellow-500' };
    return colors[type] || 'bg-gray-500';
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="relative p-2 hover:bg-white/5 rounded-lg transition"
      >
        <Icon name="bell" size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {showPanel && (
        <div className="absolute right-0 top-full mt-2 w-96 surface-2 rounded-lg border border-soft shadow-xl z-50 animate-slideInUp">
          <div className="border-b border-subtle p-4 flex justify-between items-center">
            <span className="font-semibold text-white">Notifications</span>
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="text-xs text-accent-emerald hover:text-white/70">
                Tout marquer comme lu
              </button>
            )}
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifs.length === 0 ? (
              <div className="p-8 text-center text-white/50 text-sm">Aucune notification</div>
            ) : (
              notifs.map(n => (
                <button
                  key={n.id}
                  onClick={() => { markNotifRead(n.id); }}
                  className={`w-full text-left p-4 border-b border-subtle hover:bg-white/5 transition ${!n.read ? 'bg-white/3' : ''}`}
                >
                  <div className="flex gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${getNotifColor(n.type)}`}></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white">{n.title}</div>
                      <div className="text-xs text-white/60 mt-0.5">{n.message}</div>
                      <div className="text-xs text-white/40 mt-1">{n.time}</div>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default function TopBar() {
  return (
    <div className="surface-1 border-b border-soft px-8 h-16 flex items-center justify-between animate-slideInDown">
      <div className="flex-1"></div>
      <div className="flex items-center gap-6">
        <button className="p-2 hover:bg-white/5 rounded-lg transition">
          <Icon name="search" size={20} />
        </button>
        <NotificationBell />
      </div>
    </div>
  );
}
