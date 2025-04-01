import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function ApiList() {
  const location = useLocation();
  const navigate = useNavigate();
  const apiEndpoints = location.state?.apiEndpoints || [];

  const methodColors = {
    GET: "bg-green-500",
    POST: "bg-blue-500",
    PUT: "bg-yellow-500",
    DELETE: "bg-red-500",
    PATCH: "bg-purple-500",
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">API Endpoints</h2>

      {apiEndpoints.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {apiEndpoints.map((api, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => navigate("/apiDisplay", { state: { api } })}
            >
              <div className="flex items-center space-x-4">
                <span className={`text-white text-sm font-bold px-3 py-1 rounded-md ${methodColors[api.method] || "bg-gray-500"}`}>
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
  );
}