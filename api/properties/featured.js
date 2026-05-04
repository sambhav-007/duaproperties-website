import { connectToDatabase } from '../_lib/db.js';
import Property from '../_lib/propertyModel.js';
import { sendJson } from '../_lib/http.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  try {
    await connectToDatabase();

    // Fetch only featured properties with minimal fields for fast homepage loading
    const featured = await Property.find({ featuredInSlideshow: true })
      .select('title price location type images video_url')
      .lean()
      .limit(20);

    return sendJson(res, 200, { data: featured });
  } catch (error) {
    console.error('Error in /api/properties/featured:', {
      name: error?.name,
      message: error?.message,
    });
    return sendJson(res, 500, { error: 'Failed to load featured properties' });
  }
}
