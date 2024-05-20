"use client"; // Esto asegura que este archivo se trate como un componente del cliente

import React from "react";
import { Footer, Navbar, NavbarUser } from "@/components";
import { useAuth } from "@/context/AuthContext";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative">
      {isAuthenticated ? <NavbarUser /> : <Navbar />}
      {children}
      <Footer />
    </div>
  );
};

export default ClientLayout;