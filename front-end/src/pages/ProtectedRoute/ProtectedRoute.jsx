import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import ax from "../../axios";
import { useCookies } from "react-cookie";

const useAuth = () => {
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const response = await ax.get("/token", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            setIsAuthenticated(true);
          }
        } catch (error) {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [token]);

  return { isAuthenticated, isLoading };
};

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
