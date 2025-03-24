import { API_URL } from "../config";

const API = {
  auth: {
    login: `${API_URL}/auth/login`,
    register: `${API_URL}/auth/register`,
  },
  translation: {
    analyze: `${API_URL}/text-analysis`,
    getAll: `${API_URL}/text-analysis`,
    delete: (id: number) => `${API_URL}/text-analysis/${id}`,
  },
};

export default API;
