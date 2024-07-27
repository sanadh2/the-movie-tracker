const BASE_URL = process.env.TMDB_API_URI;
const AUTH_TOKEN = process.env.TMDB_ACCESS_TOKEN_AUTH;

interface FetchOptions extends RequestInit {
  headers?: HeadersInit;
}

const fetchWithAuth = (url: string, options: FetchOptions = {}) => {
  const headers = {
    ...options.headers,
    accept: "application/json",
    Authorization: `Bearer ${AUTH_TOKEN}`,
  };

  // Create a new options object with the Authorization header
  const newOptions = {
    ...options,
    headers,
  };

  // Prepend the BASE_URL to the URL
  const fullUrl = `${BASE_URL}${url}`;

  return fetch(fullUrl, newOptions);
};

export default fetchWithAuth;
