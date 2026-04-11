import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const TOKEN_COOKIE_NAME = 'admin_token';
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('Missing JWT_SECRET environment variable.');
}

function parseCookies(cookieHeader = '') {
  return cookieHeader
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce((acc, cookie) => {
      const eqIndex = cookie.indexOf('=');
      if (eqIndex === -1) return acc;
      const key = cookie.slice(0, eqIndex).trim();
      const value = decodeURIComponent(cookie.slice(eqIndex + 1).trim());
      acc[key] = value;
      return acc;
    }, {});
}

export async function validateAdminCredentials(email, password) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || (!adminPasswordHash && !adminPassword)) {
    return false;
  }

  if (email !== adminEmail) return false;

  if (adminPasswordHash) {
    return bcrypt.compare(password, adminPasswordHash);
  }

  return password === adminPassword;
}

export function createAdminToken(email) {
  return jwt.sign({ role: 'admin', email }, JWT_SECRET, { expiresIn: '8h' });
}

export function setAuthCookie(res, token) {
  const isProd = process.env.NODE_ENV === 'production';
  res.setHeader(
    'Set-Cookie',
    `${TOKEN_COOKIE_NAME}=${encodeURIComponent(token)}; HttpOnly; Path=/; Max-Age=${8 * 60 * 60}; SameSite=Strict; ${isProd ? 'Secure;' : ''}`
  );
}

export function clearAuthCookie(res) {
  const isProd = process.env.NODE_ENV === 'production';
  res.setHeader(
    'Set-Cookie',
    `${TOKEN_COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; ${isProd ? 'Secure;' : ''}`
  );
}

function getTokenFromRequest(req) {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice('Bearer '.length).trim();
  }

  const cookies = parseCookies(req.headers.cookie || '');
  return cookies[TOKEN_COOKIE_NAME] || null;
}

export function requireAdmin(req) {
  const token = getTokenFromRequest(req);
  if (!token) return null;

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
