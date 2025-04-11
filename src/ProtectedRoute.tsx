import {
  Navigate,
} from 'react-router';
import  { useAuth } from './AuthProvider';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { token }  =  useAuth()
  if (!token) {
    console.log('No token logout')
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute