import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { connectToDatabase } from '../api/_lib/db.js';
import Property from '../api/_lib/propertyModel.js';
import rawProperties from '../src/data/properties.json' with { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ALLOWED_TYPES = new Set([
  '1BHK',
  '2BHK',
  '3BHK',
  '4BHK',
  '5BHK',
  'plot',
  'villa',
  'apartment',
  'commercial',
  'independent-floor',
  'penthouse',
  'studio',
  'other',
]);

function normalizeType(property) {
  const candidates = [
    property.type,
    property.subType,
    property.bhkType,
    property.configuration,
  ]
    .filter(Boolean)
    .map((value) => String(value).toLowerCase());

  for (const value of candidates) {
    if (value.includes('1bhk')) return '1BHK';
    if (value.includes('2bhk')) return '2BHK';
    if (value.includes('3bhk')) return '3BHK';
    if (value.includes('4bhk')) return '4BHK';
    if (value.includes('5bhk')) return '5BHK';
    if (value.includes('plot')) return 'plot';
    if (value.includes('villa')) return 'villa';
    if (value.includes('apartment')) return 'apartment';
    if (value.includes('commercial')) return 'commercial';
    if (value.includes('independent floor') || value.includes('independent-floor')) return 'independent-floor';
    if (value.includes('penthouse')) return 'penthouse';
    if (value.includes('studio')) return 'studio';
  }

  return 'other';
}

function normalizePrice(property) {
  if (property.priceValue !== undefined && property.priceValue !== null && Number(property.priceValue) > 0) {
    return Number(property.priceValue);
  }

  if (property.price !== undefined && property.price !== null && property.price !== '') {
    return property.price;
  }

  if (property.priceDisplay) {
    return property.priceDisplay;
  }

  return 'Price on Request';
}

function normalizeImages(property) {
  const images = [];

  if (Array.isArray(property.images)) {
    images.push(...property.images);
  }

  if (property.image_main) {
    images.push(property.image_main);
  }

  if (Array.isArray(property.images_gallery)) {
    images.push(...property.images_gallery);
  }

  return Array.from(new Set(images.filter(Boolean)));
}

function normalizeProperty(property) {
  const normalizedType = normalizeType(property);
  const type = ALLOWED_TYPES.has(normalizedType) ? normalizedType : 'other';

  return {
    title: property.title || property.name || 'Untitled Property',
    price: normalizePrice(property),
    location: property.location || 'Location not specified',
    type,
    images: normalizeImages(property),
    highlights: Array.isArray(property.highlights) ? property.highlights.filter(Boolean) : [],
    amenities: Array.isArray(property.amenities) ? property.amenities.filter(Boolean) : [],
    description: property.description || '',
    createdAt: property.createdAt ? new Date(property.createdAt) : new Date(),
  };
}

async function seed() {
  const reset = process.argv.includes('--reset');

  await connectToDatabase();

  if (reset) {
    await Property.deleteMany({});
    console.log('Cleared existing properties collection.');
  }

  let inserted = 0;
  let updated = 0;

  for (const item of rawProperties) {
    const normalized = normalizeProperty(item);

    const result = await Property.updateOne(
      {
        title: normalized.title,
        location: normalized.location,
      },
      {
        $set: {
          price: normalized.price,
          type: normalized.type,
          images: normalized.images,
          highlights: normalized.highlights,
          amenities: normalized.amenities,
          description: normalized.description,
        },
        $setOnInsert: {
          createdAt: normalized.createdAt,
        },
      },
      { upsert: true }
    );

    if (result.upsertedCount > 0) {
      inserted += 1;
    } else if (result.modifiedCount > 0 || result.matchedCount > 0) {
      updated += 1;
    }
  }

  const total = await Property.countDocuments();
  console.log(`Seed complete. Inserted: ${inserted}, Updated: ${updated}, Total in DB: ${total}`);
}

seed()
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await Promise.resolve();
    process.stdout.write('Done.\n');
  });
