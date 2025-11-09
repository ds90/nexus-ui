import axios from "axios";

// Leggi URL backend da variabile d'ambiente
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error("❌ NEXT_PUBLIC_API_URL mancante!");
}

// Crea istanza Axios configurata
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 secondi timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor per aggiungere JWT token alle richieste
apiClient.interceptors.request.use(
  (config) => {
    // Leggi il token da localStorage se esiste
    const token = localStorage.getItem("token");

    if (token) {
      // Aggiunge header Authorization
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor per gestire errori globali
apiClient.interceptors.request.use(
  (response) => response, // Risposta OK passa attraverso
  (error) => {
    // Se 401 Unauthorized, redirect a login
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default apiClient;
