"use client";

const SESSION_KEY = "absendsi_session";

/** Kredensial perusahaan (dummy untuk demo) */
const COMPANY_USERS = [
  {
    username: "CEOMiro",
    password: "1234",
    displayName: "PAK MIRO",
    role: "CEO",
  },
  {
    username: "GUNADI",
    password: "Gunadi",
    displayName: "Gordon Gunadi",
    role: "Admin",
  },
];

export interface Session {
  username: string;
  displayName: string;
  role: string;
  loggedInAt: string;
}

export function login(username: string, password: string): { ok: true; session: Session } | { ok: false; error: string } {
  const u = username.trim();
  const p = password;

  if (!u || !p) {
    return { ok: false, error: "Username dan password wajib diisi" };
  }

  // Username case-insensitive; password exact
  const user = COMPANY_USERS.find(
    (x) => x.username.toLowerCase() === u.toLowerCase() && x.password === p
  );

  if (!user) {
    return { ok: false, error: "Username atau password salah" };
  }

  const session: Session = {
    username: user.username,
    displayName: user.displayName,
    role: user.role,
    loggedInAt: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  return { ok: true, session };
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_KEY);
  }
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export function isLoggedIn(): boolean {
  return getSession() !== null;
}
