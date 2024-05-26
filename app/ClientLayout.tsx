"use client";

import React, { useEffect, useState } from "react";
import { Footer, Navbar, NavbarUser } from "@/components";
import { useAuth } from "@/context/AuthContext";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const [authStatus, setAuthStatus] = useState(isAuthenticated);

  useEffect(() => {
    setAuthStatus(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <div className="relative">
      {authStatus ? <NavbarUser /> : <Navbar />}
      {children}
      <Footer />
    </div>
  );
};

export default ClientLayout;