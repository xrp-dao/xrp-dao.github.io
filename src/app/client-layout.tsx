// src/app/client-layout.tsx
"use client";

import React from "react";
import "bootstrap/dist/css/bootstrap.css";

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <>{children}</>;
};

export default ClientLayout;
