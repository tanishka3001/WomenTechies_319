import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useEffect,useState } from "react";

export default function ApiList() {
  const location = useLocation();
  const navigate = useNavigate();

  const methodColors = {
    GET: "bg-[#287063]",
    POST: "bg-[#287063]",
    PUT: "bg-[#287063]",
    DELETE: "bg-[#287063]",
    PATCH: "bg-[#287063]",
  };
  const [apiEndpoints, setApiEndpoints] = useState(null);

  useEffect(() => {
    if (location.state?.apiEndpoints) {
      setApiEndpoints(location.state.apiEndpoints);
      localStorage.getItem("endpoint",apiEndpoints);
    }
  }, [location.state]);

  if (apiEndpoints === null) {
    return <div className="text-white flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="p-8 min-h-screen bg-black flex flex-col justify-start items-center">
      <h2 className="text-5xl font-bold text-[#8cf5e2] mt-10 text-center">
        API Endpoints
      </h2>
      <div className="flex-grow flex items-center justify-center w-full">
        {apiEndpoints.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
            {apiEndpoints.map((api, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-12 w-80 bg-opacity-80 bg-white shadow-md rounded-lg transition-transform transform hover:scale-105 cursor-pointer"
                onClick={() =>
                  navigate("/apiDisplay", { state: { api, apiEndpoints } })
                }
              >
                <div className="flex items-center space-x-4">
                  <span
                    className={`text-white text-sm font-bold px-3 py-1 rounded-md ${
                      methodColors[api.method] || "bg-gray-500"
                    }`}
                  >
                    {api.method}
                  </span>
                  <span className="text-gray-700 font-medium">{api.path}</span>
                </div>
                <FaArrowRight className="text-gray-600" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No API endpoints found.</p>
        )}
      </div>
    </div>
  );
}
