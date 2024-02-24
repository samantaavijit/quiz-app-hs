import React from "react";
import AdminHeader from "../header/AdminHeader";
import Footer from "../footer/Footer";

export default function AdminLayout({ children }) {
  return (
    <>
      <AdminHeader />
      {children}
      <Footer />
    </>
  );
}
