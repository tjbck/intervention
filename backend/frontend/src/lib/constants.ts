import { dev } from '$app/environment';

export const SERVER_BASE_URL = dev ? 'http://localhost:7777' : '';
export const API_BASE_URL = `${SERVER_BASE_URL}/api/v1`;
