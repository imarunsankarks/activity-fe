import { useCallback } from 'react';
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  }, [dispatch]); 

  return { logout };
};
