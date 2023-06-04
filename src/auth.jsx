import * as React from "react";

import PropTypes from "prop-types";
import { useGoogleLogin } from "@react-oauth/google";
import { Navigate, useNavigate, useLoaderData } from "react-router-dom";

import useLocalStorage from "./hooks/useLocalStorage";
import { oauthGoogleCallback } from "./services/auth";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const onSuccessCallback = ({ code }) => {
    if (!code) return;
    oauthGoogleCallback(code)
      .then(({ access_token }) => {
        setUser({ access_token });
        navigate("/");
      })
      .catch(console.log);
  };

  const login = useGoogleLogin({
    redirect_uri: "http://localhost:5173/api/v1/auth/google/callback",
    onSuccess: onSuccessCallback,
    flow: "auth-code",
  });

  // call this function to sign out logged in user
  const logout = React.useCallback(() => {
    setUser({});
    navigate("/login", { replace: true });
  }, [navigate, setUser]);

  const value = React.useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [login, logout, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const ProtectedRoute = ({ children }) => {
  const data = useLoaderData();

  if (typeof data?.data?.username === "undefined") {
    return <Navigate to="/login" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};
