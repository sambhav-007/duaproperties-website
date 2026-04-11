import { connectToDatabase } from '../_lib/db.js';
import Property from '../_lib/propertyModel.js';
import { methodNotAllowed, parseBody, sendJson } from '../_lib/http.js';
import { requireAdmin } from '../_lib/auth.js';

export default async function handler(req, res) {
  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      const properties = await Property.find({}).sort({ createdAt: -1 }).lean();
      return sendJson(res, 200, { data: properties });
    }

    if (req.method === 'POST') {
      const user = requireAdmin(req);
      if (!user) {
        return sendJson(res, 401, { error: 'Unauthorized' });
      }

      const body = parseBody(req);
      const { title, price, location, type, images, highlights, amenities, description } = body;

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
        description: description || '',
      });

      return sendJson(res, 201, { data: property });
    }

    return methodNotAllowed(res, ['GET', 'POST']);
  } catch (error) {
    console.error('Error in /api/properties:', error);
    return sendJson(res, 500, { error: 'Internal server error' });
  }
}
