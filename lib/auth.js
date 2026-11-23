const USERS_KEY = 'smartagri_users_v1';
const SESSION_KEY = 'smartagri_session_v1';

function readUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
  catch { return []; }
}

async function passwordHash(password) {
  const bytes = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (value) => value.toString(16).padStart(2, '0')).join('');
}

export function getCurrentUser() {
  if (typeof window === 'undefined') return null;
  try {
    const id = localStorage.getItem(SESSION_KEY);
    return readUsers().find((user) => user.id === id) || null;
  } catch { return null; }
}

export async function registerUser({ name, email, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  const users = readUsers();
  if (users.some((user) => user.email === normalizedEmail)) throw new Error('An account with this email already exists.');
  const user = { id: crypto.randomUUID(), name: name.trim(), email: normalizedEmail, passwordHash: await passwordHash(password) };
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return { id: user.id, name: user.name, email: user.email };
}

export async function loginUser({ email, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  const hash = await passwordHash(password);
  const user = readUsers().find((item) => item.email === normalizedEmail && item.passwordHash === hash);
  if (!user) throw new Error('Email or password is incorrect.');
  localStorage.setItem(SESSION_KEY, user.id);
  return { id: user.id, name: user.name, email: user.email };
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}
