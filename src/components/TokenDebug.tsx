import React, { useState, useEffect } from 'react';
import { AuthService } from '@/services/auth.service';

export const TokenDebug: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkToken = () => {
    const storedToken = AuthService.getToken();
    const authStatus = AuthService.isAuthenticated();
    
    setToken(storedToken);
    setIsAuthenticated(authStatus);
    
    console.log('Current token:', storedToken);
    console.log('Is authenticated:', authStatus);
  };

  const clearToken = () => {
    AuthService.removeToken();
    checkToken();
    console.log('Token cleared');
  };

  // Check token on component mount
  useEffect(() => {
    checkToken();
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', margin: '10px', borderRadius: '8px' }}>
      <h3>Token Debug Info</h3>
      <div style={{ marginBottom: '10px' }}>
        <strong>Is Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>Token:</strong> {token ? 'Present' : 'Not found'}
      </div>
      {token && (
        <div style={{ marginBottom: '10px' }}>
          <strong>Token Preview:</strong> {token.substring(0, 20)}...
        </div>
      )}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={checkToken}
          style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Refresh
        </button>
        <button 
          onClick={clearToken}
          style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Clear Token
        </button>
      </div>
    </div>
  );
}; 