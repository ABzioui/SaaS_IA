import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const useProtectedRoute = (requiredRole) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login', { replace: true });
      } else if (requiredRole && user.role !== requiredRole) {
        navigate('/', { replace: true });
      }
    }
  }, [user, loading, requiredRole, navigate]);
};

export default useProtectedRoute;
