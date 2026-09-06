import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import {
  getCurrentUser,
  signInAsGuest as signInAsGuestRequest,
  signInWithGoogle as signInWithGoogleRequest,
  signOut as signOutRequest,
  type User,
} from "@/lib/auth";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<User>;
  signInAsGuest: () => Promise<User>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUser(getCurrentUser());
    setIsLoading(false);
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const nextUser = await signInWithGoogleRequest();
    setUser(nextUser);
    return nextUser;
  }, []);

  const signInAsGuest = useCallback(async () => {
    const nextUser = await signInAsGuestRequest();
    setUser(nextUser);
    return nextUser;
  }, []);

  const signOut = useCallback(() => {
    signOutRequest();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, signInWithGoogle, signInAsGuest, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
