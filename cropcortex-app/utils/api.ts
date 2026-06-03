import Constants from 'expo-constants';

type ExpoExtra = {
  apiUrl?: string;
};

export const API_BASE_URL =
  (Constants.expoConfig?.extra as ExpoExtra | undefined)?.apiUrl ?? 'http://localhost:5173';

const normalizePath = (path: string) => (path.startsWith('/') ? path : `/${path}`);

export const apiFetch = (path: string, options?: RequestInit) =>
  fetch(`${API_BASE_URL}${normalizePath(path)}`, options);

type RequestConfig = Omit<RequestInit, 'body' | 'method'>;

class ApiClient {
  private isOnline: boolean = true;

  setOnlineStatus(status: boolean) {
    this.isOnline = status;
  }

  getOnlineStatus(): boolean {
    return this.isOnline;
  }

  private async request<T>(endpoint: string, init: RequestInit = {}): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    const isFormData = typeof FormData !== 'undefined' && init.body instanceof FormData;

    try {
      const response = await apiFetch(endpoint, {
        ...init,
        signal: controller.signal,
        headers: {
          Accept: 'application/json',
          ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
          ...init.headers,
        },
      });

      const text = await response.text();
      const data: unknown = text ? JSON.parse(text) : null;

      if (!response.ok) {
        const message =
          typeof data === 'object' && data !== null && 'message' in data
            ? String(data.message)
            : `Request failed with status ${response.status}`;
        throw new Error(message);
      }

      this.isOnline = true;
      return data as T;
    } catch (error) {
      this.isOnline = false;
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  async post<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: isFormData ? data : JSON.stringify(data ?? {}),
    });
  }

  async put<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(data ?? {}),
    });
  }

  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }
}

export const api = new ApiClient();

// API endpoint functions
export const endpoints = {
  // Auth
  sendOtp: (mobile: string) => api.post('/auth/send-otp', { mobile }),
  verifyOtp: (mobile: string, otp: string) => api.post('/auth/verify-otp', { mobile, otp }),
  register: (data: { name: string; mobile: string; state: string }) => api.post('/auth/register', data),

  // Field
  getFieldHealth: (fieldId: string) => api.get(`/fields/${fieldId}/health`),
  getFieldNdvi: (fieldId: string) => api.get(`/fields/${fieldId}/ndvi`),
  addField: (data: { name: string; crop: string; lat: number; lng: number; area: number }) => api.post('/fields', data),

  // Disease
  diagnoseImage: (imageUri: string) => {
    const formData = new FormData();
    formData.append('image', { uri: imageUri, type: 'image/jpeg', name: 'leaf.jpg' } as unknown as Blob);
    return api.post('/diagnose', formData);
  },

  // Market
  getMandiPrices: (district: string) => api.get(`/market/prices?district=${encodeURIComponent(district)}`),
  getPriceHistory: (crop: string, mandi: string) => api.get(`/market/history?crop=${encodeURIComponent(crop)}&mandi=${encodeURIComponent(mandi)}`),
  setPriceAlert: (crop: string, targetPrice: number) => api.post('/market/alerts', { crop, targetPrice }),

  // Advisory
  getAdvisory: (fieldId: string, week: string) => api.get(`/advisory/${fieldId}?week=${encodeURIComponent(week)}`),
  markTaskDone: (taskId: string) => api.put(`/advisory/tasks/${taskId}/done`),

  // Yield
  getYieldForecast: (fieldId: string) => api.get(`/yield/${fieldId}/forecast`),

  // Weather
  getWeather: (lat: number, lng: number) => api.get(`/weather?lat=${lat}&lng=${lng}`),
};

export default api;
