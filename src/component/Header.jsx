import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="py-4 shadow-sm flex justify-between items-center px-12">
      <Link to="/">TripUp</Link>
      <div className="bg-black px-4 py-1 text-white rounded-md">Sign In</div>
    </div>
  );
}

export default Header;
