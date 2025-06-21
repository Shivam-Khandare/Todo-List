import React from "react";

const Navbar = () => {

  return (
    <>
      <nav
        className="bg-indigo-800 text-white flex justify-around py-2"
      >
        <div className="logo">
          <span className="font-bold text-xl mx-12">iTask</span>
        </div>
        <ul className="flex gap-8 mx-12">
          <li className="cursor-pointer hover:font-bold tracking-all">Home</li>
          <li className="cursor-pointer hover:font-bold tracking-all">Your Tasks</li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
