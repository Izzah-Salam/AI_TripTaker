import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/Service/FirebaseConfig";
import { useState } from "react";
import InfoSection from "./ViewTripDetail/InfoSection";
import HotelRecommendation from "./ViewTripDetail/HotelRecommendation";

const ViewTrip = () => {
  const { tripId } = useParams();
  const [tripData, setTripData] = useState(null);
  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  const GetTripData = async () => {
    // Fetch data from Firestore
    const docRef = doc(db, "AItrips", tripId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setTripData(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      toast("No Trip Found", { type: "error" });
    }
  };
  return (
    <div className="p-10 md:px-8 lg:px-44 xl:px-56">
      {/* information section */}
      <InfoSection tripData={tripData} />
      <HotelRecommendation tripData={tripData} />
      {/* recommended hotel */}
      {/* Daily Plane */}
    </div>
  );
};

export default ViewTrip;
