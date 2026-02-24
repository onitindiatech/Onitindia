import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://api.onitindia.com/v1/admin',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor for Auth
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('admin_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor for Error Handling
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message = error.response?.data?.message || 'An unexpected error occurred';

        if (error.response?.status === 401) {
            // Handle logout logic here (Phase 2)
            console.error('Session expired. Redirecting to login...');
        }

        return Promise.reject({ message, status: error.response?.status });
    }
);

// KYC Endpoints
export const updateKYCStatus = (id, status, reason = null) => {
    return api.patch(`/kyc/${id}/status`, { status, reason });
};

export const getKYCRequests = (params) => {
    return api.get('/kyc/requests', { params });
};

// Communication Endpoints
export const sendBroadcast = (data) => {
    return api.post('/communications/broadcast', data);
};

export const getSystemHealth = () => {
    return api.get('/system/health');
};

// Moderation Endpoints
export const getFlaggedContent = () => {
    return api.get('/moderation/flagged');
};

export const updateContentStatus = (id, action) => {
    return api.post(`/moderation/content/${id}/${action}`);
};

export const muteUser = (userId, duration, reason) => {
    return api.post(`/moderation/user/${userId}/mute`, { duration, reason });
};

// Report Endpoints
export const generateReport = (config) => {
    return api.post('/reports/generate', config);
};

// Settings Endpoints
export const getSystemSettings = () => {
    return api.get('/settings');
};

export const updateSystemSettings = (settings) => {
    return api.patch('/settings', settings);
};

export default api;
