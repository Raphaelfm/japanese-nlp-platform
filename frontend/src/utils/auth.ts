import { jwtDecode } from "jwt-decode";
import { NavigateFunction } from "react-router-dom";
import { AxiosError } from "axios";

export function isTokenValid(token: string | null): boolean {
    if (!token) return false;

    try {
        const decoded: { exp: number } = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp > currentTime;
    } catch {
        return false;
    }
}

export function handleAuthError(error: AxiosError, navigate: NavigateFunction) {
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
      navigate("/");
    }
  }

export function getToken(): string | null {
    const token = localStorage.getItem("token");
    return isTokenValid(token) ? token : null;
}
