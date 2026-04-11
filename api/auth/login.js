import { createAdminToken, setAuthCookie, validateAdminCredentials } from '../_lib/auth.js';
import { methodNotAllowed, parseBody, sendJson } from '../_lib/http.js';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return methodNotAllowed(res, ['POST']);
    }

    const body = parseBody(req);
    const { email, password } = body;

    if (!email || !password) {
      return sendJson(res, 400, { error: 'Email and password are required.' });
    }

    const isValid = await validateAdminCredentials(email, password);
    if (!isValid) {
      return sendJson(res, 401, { error: 'Invalid credentials.' });
    }

    const token = createAdminToken(email);
    setAuthCookie(res, token);

    return sendJson(res, 200, {
      message: 'Login successful.',
      user: { email, role: 'admin' },
    });
  } catch (error) {
    console.error('Error in /api/auth/login:', error);
    return sendJson(res, 500, { error: 'Internal server error' });
  }
}
