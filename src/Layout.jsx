import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ backgroundColor: "#daf6ef" }}>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
