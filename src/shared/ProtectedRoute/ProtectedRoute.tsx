import { useAppSelector } from "@/hooks/reduxHooks";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
  Component: React.FC;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  Component,
  ...props
}) => {
  const { isAuth } = useAppSelector((state) => state.auth);

  return <>{isAuth ? <Component {...props} /> : <Navigate to="/" replace />}</>;
};

export default ProtectedRoute;
