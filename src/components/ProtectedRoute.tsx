import React from "react";
import { useAuth } from "../hooks/useAuth";

import Loader from "./Loader";
import MyAccount from "../pages/MyAccount";
import Auth from "../pages/Auth";

const AuthOrAccount: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return isAuthenticated ? <MyAccount /> : <Auth />;
};

export default AuthOrAccount;
