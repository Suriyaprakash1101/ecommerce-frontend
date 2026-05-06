// hooks/useAutoLogout.js
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTimeUntilExpiry, isTokenExpired } from '../utils/tokenUtils';

export const useAutoLogout = () => {
  const navigate = useNavigate();
  const timerRef = useRef(null);
  
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
    // navigate('/login', { replace: true });
  };
  
  const setupLogoutTimer = () => {
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      return;
    }
   
    if (isTokenExpired(token)) {
      logout();
      return;
    }
    
   
    const timeUntilExpiry = getTimeUntilExpiry(token);
    
    console.log(`Token will expire in ${Math.floor(timeUntilExpiry / 1000)} seconds`);
    
   
    timerRef.current = setTimeout(() => {
      logout();
    }, timeUntilExpiry);
  };
  
  useEffect(() => {
    setupLogoutTimer();
    
   
    const handleStorageChange = (e) => {
      if (e.key === 'accessToken') {
        if (!e.newValue) {
          
          logout();
        } else {
       
          setupLogoutTimer();
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  return { logout };
};