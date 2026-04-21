import { apiRequest } from './apiClient';
import staticProperties from '../data/properties.json';

const CACHE_KEY = 'dua_properties_cache_v1';
const LOCAL_STORE_KEY = 'dua_properties_local_store_v1';
const CACHE_TTL_MS = 5 * 60 * 1000;

let inFlightAllProperties = null;
let inMemoryCache = null;

export function invalidatePropertiesCache() {
  inMemoryCache = null;
  inFlightAllProperties = null;

  try {
    sessionStorage.removeItem(CACHE_KEY);
  } catch {
    // Ignore storage access issues.
  }
}

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

function cloneProperties(properties) {
  return JSON.parse(JSON.stringify(properties));
}

function readLocalStoredProperties() {
  try {
    const raw = localStorage.getItem(LOCAL_STORE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function writeLocalStoredProperties(properties) {
  try {
    localStorage.setItem(LOCAL_STORE_KEY, JSON.stringify(properties));
  } catch {
    // Ignore localStorage failures.
  }
}

function getFallbackPropertyCollection() {
  return readLocalStoredProperties() || cloneProperties(staticProperties);
}

function normalizePropertyId(property) {
  return property?._id || property?.id;
}

function makeLocalPropertyId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function sortPropertiesNewestFirst(properties) {
  return [...properties].sort((a, b) => {
    const bTime = Number.isFinite(Date.parse(b.createdAt)) ? Date.parse(b.createdAt) : 0;
    const aTime = Number.isFinite(Date.parse(a.createdAt)) ? Date.parse(a.createdAt) : 0;
    return bTime - aTime;
  });
}

function applyPropertyToLocalStore(transformer) {
  const current = getFallbackPropertyCollection();
  const next = transformer(cloneProperties(current));
  writeLocalStoredProperties(next);
  writeCachedProperties(next);
  return next;
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
        writeLocalStoredProperties(data.data);
        return data.data;
      }

      const fallbackProperties = getFallbackPropertyCollection();
      const sortedFallback = sortPropertiesNewestFirst(fallbackProperties);
      writeCachedProperties(sortedFallback);
      return sortedFallback;
    } catch {
      const fallbackProperties = getFallbackPropertyCollection();
      const sortedFallback = sortPropertiesNewestFirst(fallbackProperties);
      writeCachedProperties(sortedFallback);
      return sortedFallback;
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
  try {
    const data = await apiRequest('/api/properties', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (data?.data) {
      return data.data;
    }
  } catch {
    // Fall back to local browser storage below.
  }

  const now = new Date().toISOString();
  const localId = makeLocalPropertyId();
  const fallbackProperty = {
    _id: localId,
    id: localId,
    ...payload,
    createdAt: now,
  };

  applyPropertyToLocalStore((properties) => sortPropertiesNewestFirst([fallbackProperty, ...properties]));
  return fallbackProperty;
}

export async function updateProperty(id, payload) {
  try {
    const data = await apiRequest(`/api/properties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });

    if (data?.data) {
      return data.data;
    }
  } catch {
    // Fall back to local browser storage below.
  }

  const updatedProperty = applyPropertyToLocalStore((properties) =>
    properties.map((property) => {
      if (String(normalizePropertyId(property)) !== String(id)) return property;

      return {
        ...property,
        ...payload,
        _id: normalizePropertyId(property),
        id: property.id,
      };
    })
  ).find((property) => String(normalizePropertyId(property)) === String(id));

  return updatedProperty || null;
}

export async function setPropertySlideshowStatus(id, featuredInSlideshow) {
  try {
    const data = await apiRequest(`/api/properties/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ featuredInSlideshow: Boolean(featuredInSlideshow) }),
    });

    if (data?.data) {
      return data.data;
    }
  } catch {
    // Fall back to local browser storage below.
  }

  return applyPropertyToLocalStore((properties) =>
    properties.map((property) => {
      if (String(normalizePropertyId(property)) !== String(id)) return property;
      return { ...property, featuredInSlideshow: Boolean(featuredInSlideshow) };
    })
  ).find((property) => String(normalizePropertyId(property)) === String(id)) || null;
}

export async function deleteProperty(id) {
  try {
    return await apiRequest(`/api/properties/${id}`, { method: 'DELETE' });
  } catch {
    applyPropertyToLocalStore((properties) =>
      properties.filter((property) => String(normalizePropertyId(property)) !== String(id))
    );
    return { message: 'Property deleted locally.' };
  }
}
