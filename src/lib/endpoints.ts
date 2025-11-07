export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
  },

  ORGANIZATION: {
    GET: "/api/organization",
    GET_ALL: '/api/organization/all',
    GET_BY_ID: (id: number) => `/api/organization/${id}`,
    UPDATE: '/api/organization',
    DEACTIVATE: '/api/organization/deactivate',
    DELETE: (id: number) => `/api/organization/${id}`,
  },

  USER: {
    PROFILE: '/api/organization/{id}',
  },
} as const;
