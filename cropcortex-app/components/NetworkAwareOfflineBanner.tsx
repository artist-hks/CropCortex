import React, { useEffect } from 'react';
import { OfflineBanner } from './OfflineBanner';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { useAppStore } from '../store/useAppStore';

export function NetworkAwareOfflineBanner() {
  const isOnline = useNetworkStatus();
  const { lastSyncTimestamp, setOnline } = useAppStore();

  useEffect(() => {
    setOnline(isOnline);
  }, [isOnline, setOnline]);

  if (isOnline) {
    return null;
  }

  return <OfflineBanner lastSync={lastSyncTimestamp} onRetry={() => setOnline(true)} />;
}
