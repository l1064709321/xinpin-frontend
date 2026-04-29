import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// 请求拦截：自动带 token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('xp_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 响应拦截：统一错误处理 + 自动刷新 token
api.interceptors.response.use(
  (res) => res.data,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      const rt = localStorage.getItem('xp_refresh');
      if (rt) {
        try {
          const { data } = await axios.post('/api/v1/auth/refresh', { refreshToken: rt });
          localStorage.setItem('xp_token', data.data.token);
          original.headers.Authorization = `Bearer ${data.data.token}`;
          return api(original);
        } catch {
          localStorage.removeItem('xp_token');
          localStorage.removeItem('xp_refresh');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(err.response?.data || err);
  }
);

export default api;

// === Auth ===
export const authApi = {
  sendCode: (phone) => api.post('/auth/sms', { phone }),
  smsLogin: (phone, code) => api.post('/auth/login/sms', { phone, code }),
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

// === Jobs ===
export const jobsApi = {
  list: (params) => api.get('/jobs', { params }),
  search: (params) => api.get('/jobs/search', { params }),
  detail: (uuid) => api.get(`/jobs/${uuid}`),
  create: (data) => api.post('/jobs', data),
  update: (uuid, data) => api.put(`/jobs/${uuid}`, data),
  updateStatus: (uuid, status) => api.patch(`/jobs/${uuid}/status`, { status }),
  mine: () => api.get('/jobs/mine'),
};

// === Users ===
export const usersApi = {
  profile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
};

// === Companies ===
export const companiesApi = {
  detail: (uuid) => api.get(`/companies/${uuid}`),
  create: (data) => api.post('/companies', data),
  update: (uuid, data) => api.put(`/companies/${uuid}`, data),
  mine: () => api.get('/companies/mine'),
};

// === Applications ===
export const appsApi = {
  apply: (jobUuid) => api.post('/applications', { job_uuid: jobUuid }),
  list: (params) => api.get('/applications', { params }),
  updateStatus: (uuid, status) => api.patch(`/applications/${uuid}/status`, { status }),
};

// === Match ===
export const matchApi = {
  recommend: (params) => api.get('/match/recommend', { params }),
};

// === Messages ===
export const msgApi = {
  list: (params) => api.get('/messages', { params }),
  send: (data) => api.post('/messages', data),
  conversation: (userId) => api.get(`/messages/conversation/${userId}`),
};

// === Reviews ===
export const reviewsApi = {
  create: (data) => api.post('/reviews', data),
  list: (params) => api.get('/reviews', { params }),
};
