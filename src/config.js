// API Configuration
import { API_BASE_URL as ENV_API_BASE_URL } from '@env';

// Use environment variable or fallback to production URL
export const API_BASE_URL = ENV_API_BASE_URL || 'https://api.concorddex.com';
export const API_URL = `${API_BASE_URL}/api`;

// For local development, update .env file with:
// API_BASE_URL=http://YOUR_LOCAL_IP:5001
