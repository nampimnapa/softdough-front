// contexts/SessionContext.tsx
import { createContext, useContext, ReactNode } from 'react';
import { useSession } from '../hooks/useSession';

interface SessionContextType {
  session: any;
  loading: boolean;
  refreshSession: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType>({
  session: null,
  loading: true,
  refreshSession: async () => {}
});

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const { session, loading, refreshSession } = useSession();

  return (
    <SessionContext.Provider value={{ session, loading, refreshSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => useContext(SessionContext);