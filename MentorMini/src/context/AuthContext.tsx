import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { User } from '../types';
import { storageService } from '../services/storageService';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;      // NEW — true while checking storage
  login: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // On mount — check if a session was saved from a previous app open
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const saved = await storageService.loadAuth();
        if (saved) {
          setUser(saved.user);
          setToken(saved.token);
        }
      } catch {
        // Storage error — stay logged out, don't crash
      } finally {
        setIsLoadingAuth(false);
      }
    };

    restoreSession();
  }, []);

  // login is now async — it saves to storage before updating state
  const login = useCallback(async (user: User, token: string) => {
    await storageService.saveAuth(user, token);
    setUser(user);
    setToken(token);
  }, []);

  // logout clears storage first
  const logout = useCallback(async () => {
    await storageService.clearAuth();
    setUser(null);
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoadingAuth,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};