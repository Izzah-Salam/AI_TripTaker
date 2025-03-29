import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions, SelectTravelList } from "@/constants/option";
import { toast } from "sonner";
import { chatSession } from "@/Service/AIModel";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/Service/FirebaseConfig";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    location: "",
    travelDays: "",
    budget: "",
    traveller: "",
  });

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update formData when selectedPlace changes
  useEffect(() => {
    if (selectedPlace) {
      handleInputChange("location", selectedPlace.display_name);
    }
  }, [selectedPlace]);

  // when the form data change
  useEffect(() => {
    console.log("Form Data:", formData);
  }, [formData]);

  // Debounce function to prevent too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length > 2) {
        fetchPlaces();
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const fetchPlaces = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1&countrycodes=us&limit=5`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching places:", error);
    } finally {
      setLoading(false);
    }
  };

  // onGenerate Trip
  const OnGenerateTrip = async () => {
    if (
      (formData?.travelDays > 5 && !formData?.location) ||
      !formData?.budget ||
      !formData?.traveller
    ) {
      toast("Please fill all the fields.");
      return;
    }

    setLoading(true);
    const AI_Prompt = `[IMPORTANT: Response must be valid JSON only, no additional text or markdown]
    Generate Travel Plan for Location: ${formData.location} for ${formData.travelDays} days
    with ${formData.traveller} people and ${formData.budget} budget. Include:
    - Hotel list (name, address, price, rating, image URL, coordinates)
    - Ticket pricing
    - Daily itinerary with time allocations
    - Best times to visit each location
    Format as JSON.`;

    console.log("Sending prompt:", AI_Prompt);

    try {
      const result = await chatSession.sendMessage(AI_Prompt);
      const response = await result.response;
      const text = response.text();

      // saveTripData(text);
      console.log("Raw response:", text);

      try {
        const cleanText = text.replace(/```json|```/g, "").trim();
        const jsonData = JSON.parse(cleanText);
        console.log("Parsed JSON:", jsonData);
        setLoading(false);
        // Save the successful result
        saveTripData(jsonData); // Pass the parsed JSON directly
      } catch (e) {
        console.error("JSON parsing failed:", e);
        // Save the raw text if JSON parsing fails
        saveTripData({ rawText: text });
        toast.error("Received response but couldn't parse it");
      }
    } catch (error) {
      console.error("API request failed:", error);
      toast.error("Failed to generate trip plan");
      saveTripData(null); // Explicitly handle failure case
    }
  };

  // save the trip data to the database firebase

  const saveTripData = async (Tripdata) => {
    setLoading(true);
    const docId = Date.now().toString();
    await setDoc(doc(db, "AItrips", docId), {
      userSelection: formData,
      tripData: Tripdata,
      id: docId,
    });
    setLoading(false);
    navigate(`/view-trip/${docId}`);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      {/* ... other JSX remains the same ... */}

      <div>
        <div className="mt-20">
          <h2 className="text-xl my-3 font-medium">
            What is your destination choice?
          </h2>
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for places..."
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {loading && (
              <div className="absolute right-3 top-3">
                <svg
                  className="animate-spin h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            )}
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                {suggestions.map((place) => (
                  <li
                    key={place.place_id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setQuery(place.display_name);
                      setSelectedPlace(place);
                      setSuggestions([]);
                    }}
                  >
                    {place.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* .............input for travel days */}
      <div>
        <div className="mt-20">
          <h2 className="text-xl my-3 font-medium">What is your travel day?</h2>
          <Input
            type="number"
            placeholder="Ex.3"
            onChange={(e) => handleInputChange("travelDays", e.target.value)}
          />
        </div>
      </div>
      {/* .............input for Budget type */}
      <div>
        <div className="mt-10">
          <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
          <div className="flex gap-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                className={`p-4 border border-gray-300 rounded-md hover:shadow-lg cursor-pointer
                  ${formData?.budget === item.title && "border-blue-500"} 
                  `}
                onClick={() => handleInputChange("budget", item.title)}
              >
                <h2 className="text-3xl font-semibold mb-5">{item.title}</h2>
                <h2>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* .............input for Travel type */}
      <div>
        <div className="mt-10">
          <h2 className="text-xl my-3 font-medium">
            Whats your plan on travelling with on your adventure ?
          </h2>
          <div className="flex gap-5">
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                className={`p-4 border border-gray-300 rounded-md hover:shadow-lg cursor-pointer
                  ${formData?.traveller === item.people && "border-blue-500"} 
                  `}
                onClick={() => handleInputChange("traveller", item.people)}
              >
                <h2 className="text-3xl font-semibold mb-5">{item.title}</h2>
                <h2>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* .......button  */}
      <div className="my-10 flex justify-end">
        <button
          disabled={loading}
          onClick={OnGenerateTrip}
          className="relative bg-black px-4 py-2 text-white rounded-md" // Added 'relative' for spinner positioning
        >
          {loading ? (
            <div className="relative bg-black px-4 py-2 text-white rounded-md">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          ) : (
            "Generate Trip"
          )}
        </button>
      </div>
    </div>
  );
};

export default CreateTrip;
