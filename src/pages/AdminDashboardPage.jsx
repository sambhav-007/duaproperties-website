import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { createProperty, deleteProperty, invalidatePropertiesCache, setPropertySlideshowStatus, updateProperty, getPropertyById } from '../services/propertyApi';
import { getAllProperties } from '../services/propertyApi';
import { getCurrentAdmin, logoutAdmin } from '../services/authApi';
import { uploadMediaToCloudinary } from '../services/cloudinaryApi';
import { getPropertyGallery, getPropertyId, getPropertyTitle } from '../utils/propertyMappers';

const PROPERTY_TYPES = [
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
];

const initialForm = {
  title: '',
  price: '',
  location: '',
  type: 'apartment',
  highlights: '',
  amenities: '',
  video_url: '',
  description: '',
  images: [],
  featuredInSlideshow: false,
};

function toLinesArray(value) {
  return String(value || '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function toMultiline(value) {
  return Array.isArray(value) ? value.join('\n') : '';
}

function AdminDashboardPage() {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loadingList, setLoadingList] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [operationPopup, setOperationPopup] = useState({
    open: false,
    status: 'loading',
    message: '',
  });
  const popupTimeoutRef = useRef(null);

  const formTitle = useMemo(() => (editingId ? 'Edit Property' : 'Add Property'), [editingId]);

  const loadProperties = async () => {
    setLoadingList(true);
    try {
      // Use the same resilient property loader as the public site so local dev still shows properties.
      const data = await getAllProperties();
      setProperties(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Could not fetch properties.');
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    const verifySession = async () => {
      try {
        await getCurrentAdmin();
        await loadProperties();
      } catch {
        navigate('/admin/login', { replace: true });
      } finally {
        setCheckingAuth(false);
      }
    };

    verifySession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const clearPopupTimeout = () => {
    if (popupTimeoutRef.current) {
      clearTimeout(popupTimeoutRef.current);
      popupTimeoutRef.current = null;
    }
  };

  const showLoadingPopup = (popupMessage) => {
    clearPopupTimeout();
    setOperationPopup({ open: true, status: 'loading', message: popupMessage });
  };

  const showSuccessPopup = (popupMessage) => {
    clearPopupTimeout();
    setOperationPopup({ open: true, status: 'success', message: popupMessage });
    popupTimeoutRef.current = setTimeout(() => {
      setOperationPopup((prev) => ({ ...prev, open: false }));
      popupTimeoutRef.current = null;
    }, 1400);
  };

  const hideOperationPopup = () => {
    clearPopupTimeout();
    setOperationPopup((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    return () => {
      clearPopupTimeout();
    };
  }, []);

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleMediaUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setError('');
    setMessage('');
    setUploading(true);
    showLoadingPopup('Uploading media...');

    try {
      const uploads = await uploadMediaToCloudinary(files);
      const imageUrls = uploads.filter((item) => item.type === 'image').map((item) => item.url);
      const videoUrls = uploads.filter((item) => item.type === 'video').map((item) => item.url);

      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...imageUrls],
        video_url: videoUrls.at(-1) || prev.video_url,
      }));
      setMessage('Media uploaded successfully.');
      showSuccessPopup('Media uploaded successfully.');
    } catch (err) {
      hideOperationPopup();
      setError(err.message || 'Media upload failed.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');
    showLoadingPopup(editingId ? 'Updating property...' : 'Adding property...');

    try {
      const payload = {
        ...form,
        price: Number.isNaN(Number(form.price)) ? form.price : Number(form.price),
        highlights: toLinesArray(form.highlights),
        amenities: toLinesArray(form.amenities),
        featuredInSlideshow: Boolean(form.featuredInSlideshow),
      };

      if (editingId) {
        await updateProperty(editingId, payload);
        invalidatePropertiesCache();
        setMessage('Property updated successfully.');
        showSuccessPopup('Property updated successfully.');
      } else {
        await createProperty(payload);
        invalidatePropertiesCache();
        setMessage('Property added successfully.');
        showSuccessPopup('Property added successfully.');
      }

      clearForm();
      await loadProperties();
    } catch (err) {
      hideOperationPopup();
      setError(err.message || 'Could not save property.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (property) => {
    showLoadingPopup('Loading property details...');
    try {
      const fullProperty = await getPropertyById(getPropertyId(property)) || property;
      const existingImages = getPropertyGallery(fullProperty);
      setEditingId(getPropertyId(fullProperty));
      setForm({
        title: getPropertyTitle(fullProperty),
        price: fullProperty.price ?? '',
        location: fullProperty.location || '',
        type: fullProperty.type || 'apartment',
        highlights: toMultiline(fullProperty.highlights),
        amenities: toMultiline(fullProperty.amenities),
        video_url: fullProperty.video_url || '',
        description: fullProperty.description || '',
        images: existingImages,
        featuredInSlideshow: Boolean(fullProperty.featuredInSlideshow),
      });
      hideOperationPopup();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      hideOperationPopup();
      setError('Could not load full property details.');
    }
  };

  const handleSlideshowToggle = async (property) => {
    setError('');
    setMessage('');
    const willBeFeatured = !property.featuredInSlideshow;
    showLoadingPopup(willBeFeatured ? 'Adding to slideshow...' : 'Removing from slideshow...');

    try {
      const id = getPropertyId(property);
      await setPropertySlideshowStatus(id, willBeFeatured);
      invalidatePropertiesCache();
      setMessage(
        willBeFeatured
          ? 'Property added to slideshow.'
          : 'Property removed from slideshow.'
      );
      showSuccessPopup(
        willBeFeatured
          ? 'Property added to slideshow.'
          : 'Property removed from slideshow.'
      );
      await loadProperties();
    } catch (err) {
      hideOperationPopup();
      setError(err.message || 'Could not update slideshow status.');
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this property permanently?');
    if (!confirmed) return;

    setError('');
    setMessage('');
    showLoadingPopup('Deleting property...');

    try {
      await deleteProperty(id);
      invalidatePropertiesCache();
      setMessage('Property deleted successfully.');
      showSuccessPopup('Property deleted successfully.');
      await loadProperties();
      if (editingId === id) {
        clearForm();
      }
    } catch (err) {
      hideOperationPopup();
      setError(err.message || 'Delete failed.');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutAdmin();
    } finally {
      navigate('/admin/login', { replace: true });
    }
  };

  if (checkingAuth) {
    return (
      <main className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-dua-body">Checking admin session...</p>
      </main>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Dua Property</title>
      </Helmet>

      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24 pb-10 px-3 sm:px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-dua-text">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 font-semibold text-dua-text"
            >
              Logout
            </button>
          </div>

          {(message || error) && (
            <div className={`mb-4 rounded-lg px-4 py-3 text-sm border ${error ? 'bg-red-50 border-red-200 text-red-700' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
              {error || message}
            </div>
          )}

          <section className="bg-white rounded-2xl border border-gray-200 shadow-lg p-5 sm:p-6 mb-8">
            <h2 className="text-xl font-bold text-dua-text mb-4">{formTitle}</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-dua-text mb-1">Title</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setField('title', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300"
                  placeholder="e.g. Amayra Vista"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-dua-text mb-1">Price</label>
                <input
                  required
                  value={form.price}
                  onChange={(e) => setField('price', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300"
                  placeholder="e.g. 5490000 or Price on Request"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-dua-text mb-1">Location</label>
                <input
                  required
                  value={form.location}
                  onChange={(e) => setField('location', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300"
                  placeholder="e.g. Mohali, Punjab"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-dua-text mb-1">Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setField('type', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300"
                >
                  {PROPERTY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-dua-text mb-1">Highlights (one per line)</label>
                <textarea
                  rows={4}
                  value={form.highlights}
                  onChange={(e) => setField('highlights', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300"
                  placeholder="e.g. RERA Approved"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-dua-text mb-1">Amenities (one per line)</label>
                <textarea
                  rows={4}
                  value={form.amenities}
                  onChange={(e) => setField('amenities', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300"
                  placeholder="e.g. 24x7 Security"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-dua-text mb-1">Upload Media (Photos or Video)</label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleMediaUpload}
                  disabled={uploading}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 disabled:cursor-not-allowed disabled:opacity-60"
                />

                {form.images.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-semibold text-dua-text mb-2">Photos</p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3">
                      {form.images.map((url) => (
                        <div key={url} className="relative">
                          <img src={url} alt="Uploaded property" className="h-24 w-full object-cover rounded-lg border" />
                          <button
                            type="button"
                            onClick={() => setField('images', form.images.filter((img) => img !== url))}
                            className="absolute top-1 right-1 bg-black/70 text-white text-xs rounded-full px-2 py-0.5"
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {form.video_url && (
                  <div className="mt-3 rounded-lg border border-gray-200 p-3 bg-gray-50">
                    <p className="text-sm font-semibold text-dua-text mb-2">Video</p>
                    <video
                      controls
                      preload="metadata"
                      className="w-full max-h-64 rounded-lg"
                    >
                      <source src={form.video_url} type="video/mp4" />
                      <source src={form.video_url} type="video/webm" />
                      <source src={form.video_url} type="video/ogg" />
                      Your browser does not support the video tag.
                    </video>
                    <button
                      type="button"
                      onClick={() => setField('video_url', '')}
                      className="mt-2 px-3 py-1.5 text-sm rounded-md bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                    >
                      Remove Video
                    </button>
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-dua-text mb-1">Description</label>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => setField('description', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300"
                  placeholder="Short property description"
                />
              </div>

              <div className="md:col-span-2">
                <label className="inline-flex items-center gap-3 text-sm font-semibold text-dua-text">
                  <input
                    type="checkbox"
                    checked={Boolean(form.featuredInSlideshow)}
                    onChange={(e) => setField('featuredInSlideshow', e.target.checked)}
                    className="h-4 w-4"
                  />
                  Feature this property in homepage slideshow
                </label>
              </div>

              <div className="md:col-span-2 flex flex-col sm:flex-row sm:flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-dua-primary hover:bg-cyan-700 text-white font-semibold disabled:opacity-60"
                >
                  {saving ? 'Saving...' : editingId ? 'Update Property' : 'Add Property'}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={clearForm}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 font-semibold"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </section>

          <section className="bg-white rounded-2xl border border-gray-200 shadow-lg p-5 sm:p-6">
            <h2 className="text-xl font-bold text-dua-text mb-4">All Properties</h2>

            {loadingList ? (
              <p className="text-dua-body">Loading properties...</p>
            ) : properties.length === 0 ? (
              <p className="text-dua-body">No properties yet. Add your first listing above.</p>
            ) : (
              <>
                <div className="md:hidden space-y-3">
                  {properties.map((property) => (
                    <article key={getPropertyId(property)} className="rounded-xl border border-gray-200 p-4 bg-gray-50">
                      <h3 className="font-semibold text-dua-text text-base mb-2 line-clamp-2">{getPropertyTitle(property)}</h3>
                      <dl className="text-sm space-y-1">
                        <div className="flex items-start justify-between gap-3">
                          <dt className="text-gray-500">Type</dt>
                          <dd className="text-dua-text text-right">{property.type}</dd>
                        </div>
                        <div className="flex items-start justify-between gap-3">
                          <dt className="text-gray-500">Location</dt>
                          <dd className="text-dua-text text-right">{property.location}</dd>
                        </div>
                        <div className="flex items-start justify-between gap-3">
                          <dt className="text-gray-500">Price</dt>
                          <dd className="text-dua-text text-right">{String(property.price)}</dd>
                        </div>
                        <div className="flex items-start justify-between gap-3">
                          <dt className="text-gray-500">Slideshow</dt>
                          <dd className={`text-right font-medium ${property.featuredInSlideshow ? 'text-emerald-700' : 'text-gray-500'}`}>
                            {property.featuredInSlideshow ? 'Featured' : 'Not Featured'}
                          </dd>
                        </div>
                      </dl>

                      <div className="grid grid-cols-1 gap-2 mt-3">
                        <button
                          type="button"
                          onClick={() => handleSlideshowToggle(property)}
                          className={`w-full px-3 py-2 text-sm rounded-md border ${property.featuredInSlideshow ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'}`}
                        >
                          {property.featuredInSlideshow ? 'Remove From Slideshow' : 'Add To Slideshow'}
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(property)}
                          className="w-full px-3 py-2 text-sm rounded-md bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(getPropertyId(property))}
                          className="w-full px-3 py-2 text-sm rounded-md bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full min-w-[700px] text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-2 pr-3">Title</th>
                        <th className="py-2 pr-3">Type</th>
                        <th className="py-2 pr-3">Location</th>
                        <th className="py-2 pr-3">Price</th>
                        <th className="py-2 pr-3">Slideshow</th>
                        <th className="py-2 pr-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {properties.map((property) => (
                        <tr key={getPropertyId(property)} className="border-b border-gray-100 align-top">
                          <td className="py-3 pr-3 font-medium text-dua-text">{getPropertyTitle(property)}</td>
                          <td className="py-3 pr-3">{property.type}</td>
                          <td className="py-3 pr-3">{property.location}</td>
                          <td className="py-3 pr-3">{String(property.price)}</td>
                          <td className="py-3 pr-3">
                            <button
                              type="button"
                              onClick={() => handleSlideshowToggle(property)}
                              className={`px-3 py-1.5 text-sm rounded-md border ${property.featuredInSlideshow ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'}`}
                            >
                              {property.featuredInSlideshow ? 'Remove' : 'Add'}
                            </button>
                          </td>
                          <td className="py-3 pr-3">
                            <div className="flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => handleEdit(property)}
                                className="px-3 py-1.5 text-sm rounded-md bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(getPropertyId(property))}
                                className="px-3 py-1.5 text-sm rounded-md bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </section>
        </div>
      </main>

      {operationPopup.open && (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl border border-gray-200 p-6 text-center">
            {operationPopup.status === 'loading' ? (
              <>
                <div className="mx-auto h-12 w-12 rounded-full border-4 border-dua-primary/20 border-t-dua-primary animate-spin" />
                <p className="mt-4 text-dua-text font-semibold">{operationPopup.message || 'Processing...'}</p>
              </>
            ) : (
              <>
                <div className="mx-auto h-12 w-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl font-bold">
                  ✓
                </div>
                <p className="mt-4 text-dua-text font-semibold">{operationPopup.message || 'Success'}</p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default AdminDashboardPage;
