import React from 'react';
import { WifiOff, Database, CheckCircle2, RefreshCw, HardDrive, Download, X } from 'lucide-react';
import { useOfflineStatus } from '../lib/offlineManager';

interface OfflineBannerProps {
  onOpenOfflineModal: () => void;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ onOpenOfflineModal }) => {
  const { isOffline, cacheStats } = useOfflineStatus();
  const [dismissed, setDismissed] = React.useState(false);

  if (!isOffline || dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white px-4 py-2.5 shadow-md relative z-40">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-medium">
        <div className="flex items-center space-x-2">
          <span className="p-1 rounded-full bg-white/20 animate-pulse">
            <WifiOff className="w-3.5 h-3.5" />
          </span>
          <div>
            <span className="font-bold">Offline Mode Active:</span> You are disconnected from the internet.
            <span className="hidden sm:inline text-amber-100 ml-1">
              ({cacheStats.totalCourses} courses & lesson materials cached for offline access)
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenOfflineModal}
            className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white font-bold flex items-center space-x-1.5 transition-all text-[11px]"
          >
            <HardDrive className="w-3.5 h-3.5" />
            <span>Manage Offline Library ({cacheStats.totalCourses})</span>
          </button>
          
          <button
            onClick={() => setDismissed(true)}
            className="text-white/80 hover:text-white p-0.5 rounded"
            title="Dismiss notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
