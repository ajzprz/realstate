import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [formdata, setFormdata] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/');
      console.log(data);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  console.log(formdata);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7"> Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border p-3 rounded-lg shadow-sm "
          id="email"
          type="email"
          placeholder="email"
          onChange={handleChange}
        />

        <input
          className="border p-3 rounded-lg shadow-sm"
          id="password"
          type="password"
          placeholder="password"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:placeholder-opacity-95 disabled:opacity-80"
        >
          {loading ? "...Loading " : "Signin"}
        </button>

        <div className="flex gap-2 mt-5">
          <p>Dont have an account?</p>
          <Link to="/signup">
            {" "}
            <span className="text-blue-700">Sign Up</span>
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5"> {error}</p>}
      </form>
    </div>
  );
};

export default Signin;
