import React from "react";
import AdminHeader from "../header/AdminHeader";
import AdminFooter from "../footer/AdminFooter";

export default function AdminLayout({ children }) {
  return (
    <>
      <AdminHeader />
      {children}
      <AdminFooter />
    </>
  );
}
