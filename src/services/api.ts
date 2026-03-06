import { useAuth } from "@clerk/clerk-react";

export const useApi = () => {
  const { getToken } = useAuth();

  const request = async <T>(
    method: string,
    url: string,
    body?: unknown
  ): Promise<T> => {
    const token = await getToken();

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}${url}`,
      {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body ? JSON.stringify(body) : undefined,
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