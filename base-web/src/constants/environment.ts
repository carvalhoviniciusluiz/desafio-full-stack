export const ENV = (process.env.REACT_APP_ENV || 'production').trim();

export const API_ENDPOINT = (process.env.REACT_APP_API_ENDPOINT || '').trim();

if (!API_ENDPOINT) throw new Error('Please provide an API_ENDPOINT');

export const TOAST_DEFAULT_TIMEOUT = 3000;
export const TOAST_ERROR_TIMEOUT = 4000;

export const IS_DEVELOPMENT = ENV === 'development';
