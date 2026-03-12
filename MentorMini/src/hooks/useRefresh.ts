import { useState, useCallback } from 'react';



export const useRefresh = (refetch: () => Promise<void>) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await refetch();
    } finally {
      // Always reset — even if refetch throws
      setIsRefreshing(false);
    }
  }, [refetch]);

  return { isRefreshing, onRefresh };
};