import { requireAdmin } from '../_lib/auth.js';
import { methodNotAllowed, sendJson } from '../_lib/http.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return methodNotAllowed(res, ['GET']);
  }

  const user = requireAdmin(req);
  if (!user) {
    return sendJson(res, 401, { error: 'Unauthorized' });
  }

  return sendJson(res, 200, {
    user: {
      email: user.email,
      role: user.role,
    },
  });
}
