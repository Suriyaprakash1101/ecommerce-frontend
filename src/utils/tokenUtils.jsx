// utils/tokenUtils.js
export const getTokenExpiryTime = (token) => {
  try {
   
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));
    
   
    return payload.exp * 1000; 
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const isTokenExpired = (token) => {
  const expiryTime = getTokenExpiryTime(token);
  if (!expiryTime) return true;
  return Date.now() >= expiryTime;
};

export const getTimeUntilExpiry = (token) => {
  const expiryTime = getTokenExpiryTime(token);
  if (!expiryTime) return 0;
  return Math.max(0, expiryTime - Date.now());
};