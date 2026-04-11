import { apiRequest } from './apiClient';
import staticProperties from '../data/properties.json';

const CACHE_KEY = 'dua_properties_cache_v1';
const CACHE_TTL_MS = 5 * 60 * 1000;

let inFlightAllProperties = null;
let inMemoryCache = null;

function readCachedProperties() {
  if (inMemoryCache && Date.now() - inMemoryCache.timestamp < CACHE_TTL_MS) {
    return inMemoryCache.data;
  }

  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed?.timestamp || !Array.isArray(parsed?.data)) return null;
    if (Date.now() - parsed.timestamp > CACHE_TTL_MS) return null;

    inMemoryCache = parsed;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCachedProperties(data) {
  const payload = { timestamp: Date.now(), data };
  inMemoryCache = payload;

  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore storage errors and keep the in-memory cache only.
  }
}

export async function getAllProperties() {
  const cached = readCachedProperties();
  if (cached) {
    return cached;
  }

  if (inFlightAllProperties) {
    return inFlightAllProperties;
  }

  inFlightAllProperties = (async () => {
    try {
      const data = await apiRequest('/api/properties', { method: 'GET' });
      if (Array.isArray(data?.data)) {
        writeCachedProperties(data.data);
        return data.data;
      }

      // Vite dev serves index.html for unknown routes; fallback keeps listings visible locally.
      writeCachedProperties(staticProperties);
      return staticProperties;
    } catch {
      writeCachedProperties(staticProperties);
      return staticProperties;
    } finally {
      inFlightAllProperties = null;
    }
  })();

  return inFlightAllProperties;
}

export async function getPropertyById(id) {
  const cached = readCachedProperties();
  if (cached) {
    const found = cached.find((property) => String(property._id || property.id) === String(id));
    if (found) return found;
  }

  try {
    const data = await apiRequest(`/api/properties/${id}`, { method: 'GET' });
    if (data?.data) {
      return data.data;
    }
  } catch {
    // fall back to cached collection below
  }

  const properties = await getAllProperties();
  return properties.find((property) => String(property._id || property.id) === String(id)) || null;
}

export async function createProperty(payload) {
  const data = await apiRequest('/api/properties', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return data.data;
}

export async function updateProperty(id, payload) {
  const data = await apiRequest(`/api/properties/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  return data.data;
}

export async function deleteProperty(id) {
  return apiRequest(`/api/properties/${id}`, { method: 'DELETE' });
}
