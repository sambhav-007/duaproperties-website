const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

async function uploadFileToCloudinary(file) {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error('Cloudinary env vars are missing. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET.');
  }

  const isVideo = file.type?.startsWith('video/');
  const endpoint = isVideo ? 'video/upload' : 'image/upload';

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${endpoint}`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || `${isVideo ? 'Video' : 'Image'} upload failed`);
  }

  return {
    url: data.secure_url,
    type: isVideo ? 'video' : 'image',
  };
}

export async function uploadImagesToCloudinary(files) {
  const uploads = files.map((file) => uploadFileToCloudinary(file));
  const results = await Promise.all(uploads);
  return results.filter((item) => item.type === 'image').map((item) => item.url);
}

export async function uploadVideoToCloudinary(file) {
  const result = await uploadFileToCloudinary(file);
  if (result.type !== 'video') {
    throw new Error('Selected file is not a video.');
  }

  return result.url;
}

export async function uploadMediaToCloudinary(files) {
  const uploads = files.map((file) => uploadFileToCloudinary(file));
  const results = await Promise.all(uploads);
  return results;
}
