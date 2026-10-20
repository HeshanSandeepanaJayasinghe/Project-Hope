// Every backend error has the shape { message, fieldErrors? }.
export const getErrorMessage = (error, fallback = 'Something went wrong. Please try again.') => {
  let data = error?.response?.data;
  if (typeof data === 'string') {
    // Requests made with responseType: 'text' receive JSON error bodies as strings.
    try { data = JSON.parse(data); } catch { return fallback; }
  }
  if (!data || typeof data !== 'object') return fallback;
  return data.message || Object.values(data.fieldErrors || {})[0] || fallback;
};

// Must match com.example.backend.utility.PasswordPolicy on the server.
export const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=\S+$).{8,64}$/;
export const PASSWORD_MESSAGE =
  'Password must be 8-64 characters and contain a digit, a lowercase letter, an uppercase letter and a special character';
