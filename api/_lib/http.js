export function sendJson(res, statusCode, payload) {
  res.status(statusCode).json(payload);
}

export function methodNotAllowed(res, methods) {
  res.setHeader('Allow', methods);
  return sendJson(res, 405, { error: `Method not allowed. Use: ${methods.join(', ')}` });
}

export function parseBody(req) {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
}
