import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import authService from '../services/auth-service';

const UserContext = createContext(null);

function deriveRole(userData) {
  if (!userData) return null;
  const root = userData || {};
  const nested = root.user || {};
  const tipo = root.tipo || nested.tipo;
  if (tipo === 'Estudiante' || tipo === 'Universidad') return tipo;
  return null;
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    const stored = authService.getCurrentUser();
    setUser(stored || null);
    setRole(deriveRole(stored));
  }, []);

  useEffect(() => {
    refresh();
    setLoading(false);
  }, [refresh]);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setRole(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      role,
      isStudent: role === 'Estudiante',
      isUniversity: role === 'Universidad',
      setUser,
      setRole,
      refresh,
      logout,
      loading,
    }),
    [user, role, refresh, logout, loading]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within a UserProvider');
  return ctx;
}

