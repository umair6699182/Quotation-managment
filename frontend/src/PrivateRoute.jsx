import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // Check if the required data exists in localStorage
  const data = localStorage.getItem('data'); // Replace 'userData' with the actual key you're using

  // If data is not found in localStorage, redirect to login
  if (!data) {
    return <Navigate to="/" replace />;
  }

  // If data exists, allow access to the dashboard and its nested routes
  return <Outlet />;
};

export default PrivateRoute;
