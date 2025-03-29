import React from "react";
import { Link } from "react-router-dom";

const HotelRecommendation = ({ tripData }) => {
  return (
    <div className="mt-5">
      <h1 className="text-xl font-bold">Hotel Recommendation</h1>
      <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tripData?.tripData?.hotelOptions?.map((hotel, index) => (
          <Link
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              hotel?.hotelAddress
            )}`}
            target="_blank" // Opens in new tab
            rel="noopener noreferrer" // Security best practice
          >
            <div
              key={index}
              className="p-4 border border-gray-300 rounded-md hover:scale-105 transition-all cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1743031031851-bffbe65f338f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8"
                alt=""
                className="rounded-xl h-[200px] w-full object-cover"
              />
              <div className="mt-3 flex flex-col gap-2">
                <h2 className="text-2xl font-semibold ">{hotel?.hotelName}</h2>
                <h2 className="text-sm text-gray-400">
                  {" "}
                  📍 {hotel?.hotelAddress}
                </h2>

                <h2 className="text-sm ">
                  💰 {hotel?.pricePerNight} per Night
                </h2>
                <h2 className="text-sm ">
                  🌟 {hotel?.rating} ({hotel?.totalRating} Reviews)
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HotelRecommendation;
