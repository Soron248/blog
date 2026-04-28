const TOKEN_KEY = "token";
const EXPIRY_KEY = "token_expiry";

export const setToken = (token) => {
  const expiry = new Date().getTime() + 24 * 60 * 60 * 1000; // 24h
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EXPIRY_KEY, expiry);
};

export const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiry = localStorage.getItem(EXPIRY_KEY);

  if (!token || !expiry) return null;

  if (new Date().getTime() > expiry) {
    clearToken();
    return null;
  }

  return token;
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EXPIRY_KEY);
};