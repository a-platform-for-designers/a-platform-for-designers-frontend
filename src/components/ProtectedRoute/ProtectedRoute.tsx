import { Navigate } from "react-router";

interface ProtectedRouteProps {
  Component: React.FC;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  Component,
  ...props
}) => {
  const isAuth = true;

  return <>{isAuth ? <Component {...props} /> : <Navigate to="/" replace />}</>;
};

export default ProtectedRoute;
