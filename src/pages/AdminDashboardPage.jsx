import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { createProperty, deleteProperty, updateProperty } from '../services/propertyApi';
import { getCurrentAdmin, logoutAdmin } from '../services/authApi';
import { uploadImagesToCloudinary } from '../services/cloudinaryApi';
import { apiRequest } from '../services/apiClient';
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
  description: '',
  images: [],
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

  const formTitle = useMemo(() => (editingId ? 'Edit Property' : 'Add Property'), [editingId]);

  const loadProperties = async () => {
    setLoadingList(true);
    try {
      // Admin should always read live API data (no static fallback/cache shape drift).
      const response = await apiRequest('/api/properties', { method: 'GET' });
      setProperties(Array.isArray(response?.data) ? response.data : []);
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

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setError('');
    setMessage('');
    setUploading(true);

    try {
      // Upload each image and keep the returned URL in the form.
      const urls = await uploadImagesToCloudinary(files);
      setForm((prev) => ({ ...prev, images: [...prev.images, ...urls] }));
      setMessage('Images uploaded successfully.');
    } catch (err) {
      setError(err.message || 'Image upload failed.');
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

    try {
      const payload = {
        ...form,
        price: Number.isNaN(Number(form.price)) ? form.price : Number(form.price),
        highlights: toLinesArray(form.highlights),
        amenities: toLinesArray(form.amenities),
      };

      if (editingId) {
        await updateProperty(editingId, payload);
        setMessage('Property updated successfully.');
      } else {
        await createProperty(payload);
        setMessage('Property added successfully.');
      }

      clearForm();
      await loadProperties();
    } catch (err) {
      setError(err.message || 'Could not save property.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (property) => {
    const existingImages = getPropertyGallery(property);
    setEditingId(getPropertyId(property));
    setForm({
      title: getPropertyTitle(property),
      price: property.price ?? '',
      location: property.location || '',
      type: property.type || 'apartment',
      highlights: toMultiline(property.highlights),
      amenities: toMultiline(property.amenities),
      description: property.description || '',
      images: existingImages,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this property permanently?');
    if (!confirmed) return;

    setError('');
    setMessage('');

    try {
      await deleteProperty(id);
      setMessage('Property deleted successfully.');
      await loadProperties();
      if (editingId === id) {
        clearForm();
      }
    } catch (err) {
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

      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24 pb-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-dua-text">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 font-semibold text-dua-text"
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
                <label className="block text-sm font-semibold text-dua-text mb-1">Upload Images</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 bg-white"
                />
                {uploading && <p className="text-sm text-dua-body mt-2">Uploading images...</p>}

                {form.images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-3">
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
                )}
              </div>

              <div className="md:col-span-2 flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="px-5 py-2.5 rounded-lg bg-dua-primary hover:bg-cyan-700 text-white font-semibold disabled:opacity-60"
                >
                  {saving ? 'Saving...' : editingId ? 'Update Property' : 'Add Property'}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={clearForm}
                    className="px-5 py-2.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 font-semibold"
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
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-2 pr-3">Title</th>
                      <th className="py-2 pr-3">Type</th>
                      <th className="py-2 pr-3">Location</th>
                      <th className="py-2 pr-3">Price</th>
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
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => handleEdit(property)}
                              className="px-3 py-1.5 text-sm rounded-md bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
                            >
                              Edit
                            </button>
                            <button
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
            )}
          </section>
        </div>
      </main>
    </>
  );
}

export default AdminDashboardPage;
