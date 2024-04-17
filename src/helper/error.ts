import { getValue } from "../utils/object"

export const parseApiError = (error: any) => {
    return (
      error?.message ||
      error.response?.data?.errorMessage ||
      getValue(error, 'response.data.details[0].message') ||
      error.response?.data?.error?.message ||
      error.response?.data?.message || 
      'An unknown error has occured'
    );
  };
  