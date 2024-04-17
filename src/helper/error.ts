import { getValue } from "../utils/object"

export const parseApiError = (error: any) => {
  console.log(error.response?.data?.details[0]?.message, 'message')
    return (
      error?.message ||
      error.response?.data?.errorMessage ||
      error.response?.data?.error?.message ||
      getValue(error, 'response.data.details[0].message') ||
      error.response?.data?.message || 
      'An unknown error has occured'
    );
  };
  