import mongoose from 'mongoose';
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
    const { id } = req.query;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendJson(res, 400, { error: 'Invalid property id.' });
    }

    if (req.method === 'GET') {
      const property = await Property.findById(id).lean();

      if (!property) {
        return sendJson(res, 404, { error: 'Property not found.' });
      }

      return sendJson(res, 200, { data: property });
    }

    const user = requireAdmin(req);
    if (!user) {
      return sendJson(res, 401, { error: 'Unauthorized' });
    }

    if (req.method === 'PUT') {
      const body = parseBody(req);
      const updates = {
        title: body.title,
        price: body.price,
        location: body.location,
        type: body.type,
        images: Array.isArray(body.images) ? body.images : [],
        highlights: Array.isArray(body.highlights) ? body.highlights : [],
        amenities: Array.isArray(body.amenities) ? body.amenities : [],
        featuredInSlideshow: Boolean(body.featuredInSlideshow),
        description: body.description || '',
      };

      if (!updates.title || updates.price === undefined || !updates.location || !updates.type) {
        return sendJson(res, 400, {
          error: 'Validation failed: title, price, location, and type are required.',
        });
      }

      const property = await Property.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      }).lean();

      if (!property) {
        return sendJson(res, 404, { error: 'Property not found.' });
      }

      return sendJson(res, 200, { data: property });
    }

    if (req.method === 'PATCH') {
      const body = parseBody(req);

      if (typeof body.featuredInSlideshow !== 'boolean') {
        return sendJson(res, 400, {
          error: 'Validation failed: featuredInSlideshow must be a boolean.',
        });
      }

      const property = await Property.findByIdAndUpdate(
        id,
        { featuredInSlideshow: body.featuredInSlideshow },
        { new: true, runValidators: true }
      ).lean();

      if (!property) {
        return sendJson(res, 404, { error: 'Property not found.' });
      }

      return sendJson(res, 200, { data: property });
    }

    if (req.method === 'DELETE') {
      const deleted = await Property.findByIdAndDelete(id).lean();
      if (!deleted) {
        return sendJson(res, 404, { error: 'Property not found.' });
      }

      return sendJson(res, 200, { message: 'Property deleted successfully.' });
    }

    return methodNotAllowed(res, ['GET', 'PUT', 'PATCH', 'DELETE']);
  } catch (error) {
    const code = classifyApiError(error);
    console.error('Error in /api/properties/[id]:', {
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
