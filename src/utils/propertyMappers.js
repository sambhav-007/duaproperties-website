export function getPropertyId(property) {
  return property?._id || property?.id;
}

export function getPropertyTitle(property) {
  return property?.title || property?.name || 'Untitled Property';
}

export function getPropertyMainImage(property) {
  if (Array.isArray(property?.images) && property.images.length > 0) {
    return property.images[0];
  }
  return property?.image_main || '/images/placeholder.png';
}

export function getPropertyGallery(property) {
  if (Array.isArray(property?.images) && property.images.length > 0) {
    return property.images;
  }
  if (Array.isArray(property?.images_gallery)) {
    return property.images_gallery;
  }
  return [];
}
