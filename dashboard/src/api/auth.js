const API_BASE = import.meta.env.VITE_API_URL || '';

async function parseJson(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
}

export async function loginRequest(email, password) {
  const response = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return parseJson(response);
}

export async function registerRequest(email, password, confirmPassword) {
  const response = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, confirmPassword }),
  });
  return parseJson(response);
}

export async function verifyToken(token) {
  const response = await fetch(`${API_BASE}/verify`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return parseJson(response);
}
