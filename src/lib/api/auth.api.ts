// authApi.ts
import axios from 'axios';

// Types
export type AuthUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  username: string;
  billing: any;
  shipping: any;
  is_paying_customer: boolean;
  avatar_url: string;
  date_created: string;
  date_modified: string;
  token: string;
  wpToken: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  customer: AuthUser;
  token: string;
  wpToken: string;
};


export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  customer: AuthUser;
  token: string;
  wpToken: string;
}

export interface UpdateProfileRequest {
  first_name?: string;
  last_name?: string;
  password?: string;
  billing?: any;
  shipping?: any;
}

export interface UpdateProfileResponse {
  message: string;
  customer: AuthUser;
}

// Create axios instance
const authApi = axios.create({
  baseURL: '/api',
  /* baseURL: 'https://karakedi.xyz/api',  */
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token to requests
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('auth_token');
      localStorage.removeItem('wp_token');
      localStorage.removeItem('auth_user');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

// API functions
export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await authApi.post('/auth/login', credentials, {
      withCredentials: true // Ensure this is set
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Detailed error:', {
        url: error.config?.url,
        status: error.response?.status,
        headers: error.response?.headers,
        data: error.response?.data
      });
      throw new Error(error.response?.data?.error || 'Login failed');
    }
    throw error;
  }
};

export const registerUser = async (userData: RegisterRequest): Promise<RegisterResponse> => {
  try {
    const response = await authApi.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
    throw new Error('Network error occurred');
  }
};

export const verifyToken = async (token: string): Promise<AuthUser> => {
  try {
    const response = await authApi.get('/verify', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Token verification failed');
    }
    throw new Error('Network error occurred');
  }
};

export const refreshToken = async (token: string): Promise<{ token: string; wpToken: string }> => {
  try {
    const response = await authApi.post('/refresh', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Token refresh failed');
    }
    throw new Error('Network error occurred');
  }
};

export const updateProfile = async (updateData: UpdateProfileRequest): Promise<UpdateProfileResponse> => {
  try {
    const response = await authApi.put('/auth/update-profile', updateData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Profile update failed');
    }
    throw new Error('Network error occurred');
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await authApi.post('/auth/logout');
  } catch (error) {
    // Even if logout fails on server, we still want to clear local storage
    console.error('Logout error:', error);
  }
};