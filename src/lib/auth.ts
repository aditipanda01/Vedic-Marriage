import { tokenStorage } from './token';

/**
 * Check if user is authenticated using both localStorage and Redux
 * @param reduxToken - Token from Redux store
 * @param reduxIsAuthenticated - Authentication status from Redux store
 * @returns boolean indicating if user is authenticated
 */
export const checkAuthenticationStatus = (
  reduxToken: string | null,
  reduxIsAuthenticated: boolean
): boolean => {
  const hasReduxAuth = reduxIsAuthenticated && !!reduxToken;
  const hasLocalStorageAuth = tokenStorage.isAuthenticated();
  
  // If Redux says not authenticated, trust it (logout scenario)
  if (!hasReduxAuth) {
    return false;
  }
  
  // If Redux says authenticated but localStorage doesn't have token, not authenticated
  if (hasReduxAuth && !hasLocalStorageAuth) {
    return false;
  }
  
  // If both Redux and localStorage agree, return the common state
  return hasReduxAuth && hasLocalStorageAuth;
};

/**
 * Get the current authentication token from localStorage
 * @returns string | null - The current token or null if not found
 */
export const getCurrentToken = (): string | null => {
  return tokenStorage.getToken();
};

/**
 * Check if user is authenticated using only localStorage
 * @returns boolean - True if token exists in localStorage
 */
export const isAuthenticatedFromStorage = (): boolean => {
  return tokenStorage.isAuthenticated();
};

/**
 * Clear all authentication data (localStorage and Redux)
 * This should be called during logout
 */
export const clearAllAuthData = (): void => {
  tokenStorage.removeToken();
};
