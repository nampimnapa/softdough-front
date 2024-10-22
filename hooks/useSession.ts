// hooks/useSession.ts
import { useState, useEffect } from 'react';

interface SessionUser {
  st_id?: number;
}

export const useSession = () => {
  const [session, setSession] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  const checkSession = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login/check-session`, {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setSession(data.user);
      } else {
        setSession(null);
      }
    } catch (error) {
      console.error('Session check failed:', error);
      setSession(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return { session, loading, refreshSession: checkSession };
};