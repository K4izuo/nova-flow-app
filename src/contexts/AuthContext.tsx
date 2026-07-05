import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  company: string;
  phone?: string;
  location?: string;
  bio?: string;
  initials: string;
}

interface StoredSession {
  user: AuthUser;
}

interface LoginInput {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface RegisterInput {
  fullName: string;
  company: string;
  email: string;
  password: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (password: string) => Promise<void>;
  updateProfile: (patch: Partial<AuthUser>) => void;
}

const STORAGE_KEY = "kaizuodev.session";
const AuthContext = createContext<AuthContextValue | null>(null);

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0] + parts[parts.length - 1]![0]).toUpperCase();
}

function readSession(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY) ?? window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredSession;
    return parsed.user;
  } catch {
    return null;
  }
}

function writeSession(user: AuthUser, persist: boolean) {
  const payload = JSON.stringify({ user } satisfies StoredSession);
  if (persist) {
    window.localStorage.setItem(STORAGE_KEY, payload);
    window.sessionStorage.removeItem(STORAGE_KEY);
  } else {
    window.sessionStorage.setItem(STORAGE_KEY, payload);
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

function clearSession() {
  window.localStorage.removeItem(STORAGE_KEY);
  window.sessionStorage.removeItem(STORAGE_KEY);
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUser(readSession());
    setIsLoading(false);
  }, []);

  const login = useCallback(async ({ email, password, rememberMe }: LoginInput) => {
    await delay(700);
    if (!email || password.length < 6) {
      throw new Error("Invalid email or password.");
    }
    const namePart = email.split("@")[0] ?? "there";
    const fullName = namePart
      .replace(/[._-]+/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    const nextUser: AuthUser = {
      id: crypto.randomUUID(),
      fullName: fullName || "KaizuoDev User",
      email,
      company: "KaizuoDev",
      phone: "",
      location: "",
      bio: "",
      initials: getInitials(fullName || email),
    };
    writeSession(nextUser, rememberMe);
    setUser(nextUser);
  }, []);

  const register = useCallback(async ({ fullName, company, email, password }: RegisterInput) => {
    await delay(900);
    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters.");
    }
    const nextUser: AuthUser = {
      id: crypto.randomUUID(),
      fullName,
      email,
      company,
      phone: "",
      location: "",
      bio: "",
      initials: getInitials(fullName),
    };
    writeSession(nextUser, true);
    setUser(nextUser);
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const requestPasswordReset = useCallback(async (email: string) => {
    await delay(800);
    if (!email.includes("@")) {
      throw new Error("Please enter a valid email address.");
    }
  }, []);

  const resetPassword = useCallback(async (password: string) => {
    await delay(800);
    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters.");
    }
  }, []);

  const updateProfile = useCallback((patch: Partial<AuthUser>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...patch };
      if (patch.fullName) next.initials = getInitials(patch.fullName);
      const persisted = window.localStorage.getItem(STORAGE_KEY);
      writeSession(next, !!persisted);
      return next;
    });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      requestPasswordReset,
      resetPassword,
      updateProfile,
    }),
    [user, isLoading, login, register, logout, requestPasswordReset, resetPassword, updateProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
