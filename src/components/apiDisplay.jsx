import { useLocation, useNavigate } from "react-router-dom";

export default function ApiDisplay() {
  const location = useLocation();
  const navigate = useNavigate();
  const api = location.state?.api;
  const apiEndpoints = location.state?.apiEndpoints;

  if (!api) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black">
        <h2 className="text-2xl font-bold text-red-500">No API data found!</h2>
        <button
          onClick={() => navigate("/apiList")}
          className="mt-4 p-2 bg-[#287063] text-white rounded-md hover:bg-gray-600"
        >
          Back to API List
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      {/* Heading at the top center */}
      <h2 className="text-[#8cf5e2] text-4xl font-bold mb-10">API Endpoint Details</h2>

      {/* Box containing API details */}
      <div className="p-12 border rounded-lg shadow-lg bg-gray-100 bg-opacity-80 w-[1250px] h-[250px] text-black text-center">
        <p className="text-xl">
          <strong>Path:</strong> {api.path}
        </p>
        <p className="text-xl">
          <strong>Method:</strong> <span className="uppercase text-blue-600">{api.method}</span>
        </p>
        <p className="text-xl">
          <strong>Summary:</strong> {api.summary || "No description provided"}
        </p>

        {api.parameters && api.parameters.length > 0 ? (
          <div className="mt-4">
            <h3 className="text-lg font-bold">Parameters:</h3>
              {api.parameters.map((param, index) => (
                <li key={index}>
                  <strong>{param.name}</strong> ({param.in}) - {param.required ? "Required" : "Optional"}
                </li>
              ))}
          </div>
        ) : (
          <p className="mt-4 text-gray-500">No parameters required.</p>
        )}
      </div>

      {/* Buttons centered below the box */}
      <div className="mt-8 flex space-x-8">
        <button
          onClick={() => navigate("/apiList", { state: { apiEndpoints } })}
          className="p-5 bg-[#287063] text-white rounded-md hover:bg-gray-600"
        >
          Back to API List
        </button>
        <button
          onClick={() => navigate("/apiList", { state: { apiEndpoints } })}
          className="p-5 bg-[#287063] text-white rounded-md hover:bg-gray-600"
        >
          Download
        </button>
      </div>
    </div>
  );
}
