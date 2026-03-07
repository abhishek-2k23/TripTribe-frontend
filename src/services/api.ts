import { useAuth } from "@clerk/clerk-react";

export const useApi = () => {
  const { getToken } = useAuth();

  const request = async <T>(
    method: string,
    url: string,
    body?: unknown
  ): Promise<T> => {
    const token = await getToken();

    // 1. Check if the body is FormData
    const isFormData = body instanceof FormData;

    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };

    // 2. ONLY set Content-Type to JSON if it's NOT FormData
    // Browser automatically sets the correct boundary for FormData
    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}${url}`,
      {
        method,
        headers,
        // 3. Do NOT stringify if it's FormData
        body: isFormData ? (body as any) : (body ? JSON.stringify(body) : undefined),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  };

  return {
    get: <T>(url: string) => request<T>("GET", url),
    post: <T>(url: string, body?: unknown) =>
      request<T>("POST", url, body),
    put: <T>(url: string, body?: unknown) =>
      request<T>("PUT", url, body),
    patch: <T>(url: string, body?: unknown) =>
      request<T>("PATCH", url, body),
    delete: <T>(url: string) =>
      request<T>("DELETE", url),
  };
};