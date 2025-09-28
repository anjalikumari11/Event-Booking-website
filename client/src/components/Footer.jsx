import React from 'react';

function Footer() {
  return (
    <footer
      className="text-center shadow text-secondary py-3 mt-5"
      style={{background:"#ebe7e7ff"}}
    >
      &copy; {new Date().getFullYear()} anjalikumari11. All rights reserved.
    </footer>
  );
}

export default Footer;
