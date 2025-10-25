import { useState, useCallback } from 'react';

interface PaginationState {
  cursor: string | null;
  hasMore: boolean;
  isLoading: boolean;
}

export function usePagination(initialCursor: string | null = null) {
  const [state, setState] = useState<PaginationState>({
    cursor: initialCursor,
    hasMore: true,
    isLoading: false,
  });

  const setNextCursor = useCallback((nextCursor: string | null) => {
    setState(prev => ({
      ...prev,
      cursor: nextCursor,
      hasMore: !!nextCursor,
    }));
  }, []);

  const setLoading = useCallback((isLoading: boolean) => {
    setState(prev => ({ ...prev, isLoading }));
  }, []);

  return {
    cursor: state.cursor,
    hasMore: state.hasMore,
    isLoading: state.isLoading,
    setNextCursor,
    setLoading,
  };
} 