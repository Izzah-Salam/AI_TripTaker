import React from "react";
import { Button } from "@/components/ui/button";

const InfoSection = ({ tripData }) => {
  return (
    <div>
      <img
        className="h-[340px] w-full object-cover rounded-xl"
        src="https://images.unsplash.com/photo-1743031031851-bffbe65f338f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8"
        alt=""
      />
      {/* place infromation */}
      <div className=" flex justify-between items-center mt-5">
        <div className="my-5 flex flex-col gap-2">
          <h1 className="font-bold text-2xl">
            {tripData?.userSelection?.location}
          </h1>
          <div className="flex gap-5">
            <h2 className="bg-gray-200 rounded-md px-3 py-2 text-xs md:text-sm">
              {tripData?.userSelection?.budget} budget
            </h2>
            <h3 className="bg-gray-200 rounded-md px-3 py-2 text-xs md:text-sm">
              {tripData?.userSelection?.travelDays} Days{" "}
            </h3>
            <h4 className="bg-gray-200 rounded-md px-3 py-2 text-xs md:text-sm">
              {tripData?.userSelection?.traveller} people 👪
            </h4>
          </div>
        </div>
        <Button>
          <i class="ri-send-plane-fill"></i>
        </Button>
      </div>
    </div>
  );
};

export default InfoSection;
