import { apiRequest } from './apiClient';

export function loginAdmin(email, password) {
  return apiRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function logoutAdmin() {
  return apiRequest('/api/auth/logout', { method: 'POST' });
}

export function getCurrentAdmin() {
  return apiRequest('/api/auth/me', { method: 'GET' });
}
