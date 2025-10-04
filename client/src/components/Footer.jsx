import React from 'react';

function Footer() {
  return (
    <footer
      className="text-center shadow text-light py-3 "
      style={{background:"#302f2fff"}}
    >
      &copy; {new Date().getFullYear()} anjalikumari11. All rights reserved.
    </footer>
  );
}

export default Footer;
