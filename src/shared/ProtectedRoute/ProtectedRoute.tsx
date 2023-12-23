import { useAppSelector } from "@/hooks/reduxHooks";
import { Navigate } from "react-router";
import Preloader from "../Preloader/Preloader";
interface ProtectedRouteProps {
  Component: React.FC;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  Component,
  ...props
}) => {
  const { isAuth  } = useAppSelector((state) => state.auth);
  const { loading  } = useAppSelector((state) => state.user);

  if(loading == "idle" || loading == "pending") {
      return <Preloader />
  }

  return <>{isAuth ? <Component {...props} /> : <Navigate to="/" replace />}</>;
};

export default ProtectedRoute;
