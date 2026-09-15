export const getAccessToken = () => {
  try {
    return localStorage.getItem('access_token');
  } catch {
    return null;
  }
};

export const toAuthorizationValue = (token) => {
  if (!token) return null;
  const normalizedToken = String(token).trim();
  if (!normalizedToken) return null;
  return /^Bearer\s+/i.test(normalizedToken) ? normalizedToken : `Bearer ${normalizedToken}`;
};
