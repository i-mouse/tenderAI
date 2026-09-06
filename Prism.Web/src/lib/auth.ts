export type AuthProvider = "google" | "guest";

export interface User {
  id: string;
  email: string | null;
  name: string | null;
  provider: AuthProvider;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
}

const STORAGE_KEY = "prism.auth.user";

export function getCurrentUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

function persistUser(user: User) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

// TODO(auth): replace with a real Google OAuth flow (e.g. redirect to
// /api/auth/google, exchange the callback code for a session) once the
// backend supports it. This placeholder exists so the UI can be built
// and reviewed independently of the OAuth integration.
export async function signInWithGoogle(): Promise<User> {
  const user: User = {
    id: crypto.randomUUID(),
    email: "user@example.com",
    name: "Test User",
    provider: "google",
  };
  persistUser(user);
  return user;
}

export async function signInAsGuest(): Promise<User> {
  const user: User = {
    id: "demo-user-01",
    email: null,
    name: "Guest",
    provider: "guest",
  };
  persistUser(user);
  return user;
}

export function signOut(): void {
  localStorage.removeItem(STORAGE_KEY);
}
