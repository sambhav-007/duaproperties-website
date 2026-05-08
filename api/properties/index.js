import { connectToDatabase } from '../_lib/db.js';
import Property from '../_lib/propertyModel.js';
import { methodNotAllowed, parseBody, sendJson } from '../_lib/http.js';
import { requireAdmin } from '../_lib/auth.js';

function classifyApiError(error) {
  const name = String(error?.name || '');
  const message = String(error?.message || '').toLowerCase();

  if (message.includes('missing mongodb_uri')) return 'MISSING_MONGODB_URI';
  if (name.includes('Mongo') || message.includes('mongodb')) return 'DB_CONNECTION_ERROR';
  return 'API_RUNTIME_ERROR';
}

export default async function handler(req, res) {
  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      const properties = await Property.find({})
        .select('title price location type images video_url featuredInSlideshow createdAt')
        .sort({ createdAt: -1 })
        .lean();
      return sendJson(res, 200, { data: properties });
    }

    if (req.method === 'POST') {
      const user = requireAdmin(req);
      if (!user) {
        return sendJson(res, 401, { error: 'Unauthorized' });
      }

      const body = parseBody(req);
      const { title, price, location, type, images, highlights, amenities, description, featuredInSlideshow, video_url } = body;

      if (!title || price === undefined || !location || !type) {
        return sendJson(res, 400, {
          error: 'Validation failed: title, price, location, and type are required.',
        });
      }

      const property = await Property.create({
        title,
        price,
        location,
        type,
        images: Array.isArray(images) ? images : [],
        highlights: Array.isArray(highlights) ? highlights : [],
        amenities: Array.isArray(amenities) ? amenities : [],
        featuredInSlideshow: Boolean(featuredInSlideshow),
        video_url: video_url || '',
        description: description || '',
      });

      return sendJson(res, 201, { data: property });
    }

    return methodNotAllowed(res, ['GET', 'POST']);
  } catch (error) {
    const code = classifyApiError(error);
    console.error('Error in /api/properties:', {
      code,
      name: error?.name,
      message: error?.message,
      stack: error?.stack,
    });
    return sendJson(res, 500, {
      error: 'Internal server error',
      code,
    });
  }
}
