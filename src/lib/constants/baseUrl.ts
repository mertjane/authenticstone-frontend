// production url 
// export const baseUrl = 'https://karakedi.xyz/api';

// dev url
/* export const baseUrl = 'http://localhost:4000/api'; */
/* export const baseUrl = '/api'; */
export const baseUrl = import.meta.env.VITE_API_URL || '/api';