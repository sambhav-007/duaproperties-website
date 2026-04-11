import { clearAuthCookie } from '../_lib/auth.js';
import { methodNotAllowed, sendJson } from '../_lib/http.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return methodNotAllowed(res, ['POST']);
  }

  clearAuthCookie(res);
  return sendJson(res, 200, { message: 'Logged out.' });
}
