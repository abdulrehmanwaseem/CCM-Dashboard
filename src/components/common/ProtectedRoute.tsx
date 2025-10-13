import { RootState } from "@/redux/store";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import Spinner from "./Spinner";

interface ProtectedRouteProps {
  children: ReactNode;
  waitTime?: number;
}

const ProtectedRoute = ({ children, waitTime = 5000 }: ProtectedRouteProps) => {
  // const navigate = useNavigate();
  const { isAuthenticated, userData } = useSelector(
    (state: RootState) => state.auth
  );

  const [allowRedirect, setAllowRedirect] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAllowRedirect(true);
    }, waitTime);

    return () => clearTimeout(timer);
  }, [waitTime]);

  if (!userData && !isAuthenticated && !allowRedirect) {
    return (
      <div className="h-[90vh] flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (allowRedirect && (!isAuthenticated || !userData)) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
