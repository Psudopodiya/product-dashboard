import { AxiosResponse } from 'axios';

// Standard API response interface
export interface StandardResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any;
}

/**
 * Extracts data from a standardized API response
 * @param response The axios response object
 * @returns The data from the response
 */
export const extractResponseData = <T>(response: AxiosResponse<StandardResponse<T>>): T => {
  if (response.data.data) {
    return response.data.data;
  }
  return {} as T;
};

/**
 * Handles API errors in a standardized way
 * @param error The error object from axios
 * @returns A standardized error message
 */
export const handleApiError = (error: any): string => {
  // Check if it's our standard error format
  if (error?.response?.data?.success === false) {
    if (error.response.data.errors) {
      // If errors is an object, format it
      if (typeof error.response.data.errors === 'object') {
        return Object.entries(error.response.data.errors)
          .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
          .join('\n');
      }
      return error.response.data.errors;
    }
    
    if (error.response.data.message) {
      return error.response.data.message;
    }
  }
  
  // Fallback to existing error handling
  if (error?.response?.data?.detail) {
    return error.response.data.detail;
  }
  
  return error?.message || 'An unexpected error occurred';
};