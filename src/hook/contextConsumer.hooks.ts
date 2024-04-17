import { useContext } from 'react';
import { AuthContextCreator } from '../context/AuthContext';

export const useAuthContext = () => {
  return useContext(AuthContextCreator);
};
