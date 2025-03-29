import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div>
      <div className=" flex items-center justify-center flex-col mx-56 gap-9 text-center mt-16">
        <h1 className="text-4xl text-red-600 font-bold ">
          Discover Your Next Adventure With AI: Personalized Trip Tacker at your
          finger tip{" "}
        </h1>
        <h3>your personal trip planner</h3>
        <Link to={"/create-trip"}>
          <button className="bg-black px-4 py-1 text-white rounded-md">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
