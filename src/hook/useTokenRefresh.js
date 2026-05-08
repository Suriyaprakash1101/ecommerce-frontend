import { useEffect, useRef } from 'react';
import { manualRefreshToken } from '../Api/api';

export const useTokenRefresh = (isLoggedIn, refreshIntervalMinutes = 29) => {
    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);

    const refreshToken = async () => {
        try {
            console.log(`🔄 Auto-refreshing token at ${new Date().toLocaleTimeString()}`);
            await manualRefreshToken();
            console.log('✅ Token auto-refreshed successfully');
        } catch (error) {
            console.error('❌ Auto-refresh failed:', error);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            // Clear any existing intervals
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // Start refresh after 5 seconds to ensure initial load is complete
            timeoutRef.current = setTimeout(() => {
                intervalRef.current = setInterval(refreshToken, refreshIntervalMinutes * 60 * 1000);
                console.log(`⏰ Token refresh scheduled every ${refreshIntervalMinutes} minutes`);
            }, 5000);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                console.log('🛑 Token refresh stopped');
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [isLoggedIn, refreshIntervalMinutes]);
};