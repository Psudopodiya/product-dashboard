import { ApiError, User } from "@/types/authTypes";

export const getStoredUser = (): User | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const getStoredToken = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const getErrorMessageFromResponse = (error: unknown): string => {
  const apiError = error as ApiError;

  const details = apiError?.response?.data?.details;
  if (details && typeof details === "object") {
    const errorMessages = Object.entries(details)
      .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
      .join("\n");
    return (
      errorMessages || apiError?.response?.data?.error || "Something went wrong"
    );
  }

  if (apiError?.response?.data?.error) {
    return apiError.response.data.error;
  }

  if (apiError?.response?.data?.detail) {
    return apiError.response.data.detail;
  }

  return "Something went wrong. Please try again.";
};
