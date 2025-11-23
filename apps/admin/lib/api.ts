const API_BASE_URL = 'http://localhost:3001/api';

let authToken: string | null = null;

export const setAuthToken = (token: string) => {
  authToken = token;
};

export const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  ...(authToken && { Authorization: `Bearer ${authToken}` })
});

// Authentication
export async function login(username: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) {
    throw new Error('Invalid credentials');
  }

  const data = await response.json();
  setAuthToken(data.token);
  return data;
}

// Routes
export async function getRoutes() {
  const response = await fetch(`${API_BASE_URL}/routes`, {
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch routes');
  }
  
  return response.json();
}

export async function createRoute(route: any) {
  const response = await fetch(`${API_BASE_URL}/routes`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(route)
  });
  
  if (!response.ok) {
    throw new Error('Failed to create route');
  }
  
  return response.json();
}

// Buses
export async function getBuses() {
  const response = await fetch(`${API_BASE_URL}/buses`, {
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch buses');
  }
  
  return response.json();
}

// Feedback
export async function getFeedback() {
  const response = await fetch(`${API_BASE_URL}/feedback`, {
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch feedback');
  }
  
  return response.json();
}