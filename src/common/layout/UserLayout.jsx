import React from "react";
import UserHeader from "../header/UserHeader";
import Footer from "../footer/Footer";

export default function UserLayout({ children }) {
  return (
    <>
      <UserHeader />
      {children}
      <Footer />
    </>
  );
}
