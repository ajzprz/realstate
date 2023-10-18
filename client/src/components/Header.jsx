import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

export const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-slate-200 shadow-sm">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap ">
            <span className="text-black-800">Real</span>
            <span className="text-orange-800">State</span>
          </h1>
        </Link>

        <form className="bg-slate-100 rounded-lg p-3 flex items-center">
          <input
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            type="text"
            placeholder="Search..."
            name=""
            id=""
          />
          <FaSearch className="text-slate-600" />
        </form>

        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline hover:underline">Home</li>{" "}
          </Link>
          <Link to="/aboutus">
            <li className=" hidden sm:inline hover:underline">About Us</li>
          </Link>
          {currentUser ? (
           <Link to='/profile'> <img
              className="rounded-full h-7 w-7 object-cover"
              src={currentUser.avatar}
              alt=""
            />
            </Link>
          ) : (
            <Link to="/signin">
              <li className=" sm:inline hover:underline">Sign In</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};
