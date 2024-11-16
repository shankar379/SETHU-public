import React from "react";

const Footer = () => {
  return (
    <footer
      className="text-white text-center py-4"
      style={{
        background: "linear-gradient(180deg, #06042c, black)",
      }}
    >
      <p className="text-sm">© {new Date().getFullYear()} All rights to Team SETHU</p>
    </footer>
  );
};

export default Footer;
