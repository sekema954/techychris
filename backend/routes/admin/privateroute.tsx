import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }:any) => {
  const token = localStorage.getItem('token');

  return token ? children : <Navigate to="/admin" replace />;
};

export default PrivateRoute;
