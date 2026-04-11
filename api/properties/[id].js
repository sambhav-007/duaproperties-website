import mongoose from 'mongoose';
import { connectToDatabase } from '../_lib/db.js';
import Property from '../_lib/propertyModel.js';
import { methodNotAllowed, parseBody, sendJson } from '../_lib/http.js';
import { requireAdmin } from '../_lib/auth.js';

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

    if (req.method === 'DELETE') {
      const deleted = await Property.findByIdAndDelete(id).lean();
      if (!deleted) {
        return sendJson(res, 404, { error: 'Property not found.' });
      }

      return sendJson(res, 200, { message: 'Property deleted successfully.' });
    }

    return methodNotAllowed(res, ['GET', 'PUT', 'DELETE']);
  } catch (error) {
    console.error('Error in /api/properties/[id]:', error);
    return sendJson(res, 500, { error: 'Internal server error' });
  }
}
