import { useLocation, useNavigate } from "react-router-dom";

export default function ApiDisplay() {
  const location = useLocation();
  const navigate = useNavigate();
  const api = location.state?.api;

  if (!api) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold text-red-500">No API data found!</h2>
        <button 
          onClick={() => navigate("/apiList")} 
          className="mt-4 p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Back to API List
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">API Endpoint Details</h2>
      <div className="mt-4 p-4 border rounded-lg shadow-lg bg-gray-100">
        <p className="text-lg">
          <strong>Path:</strong> {api.path}
        </p>
        <p className="text-lg">
          <strong>Method:</strong> <span className="uppercase text-blue-600">{api.method}</span>
        </p>
        <p className="text-lg">
          <strong>Summary:</strong> {api.summary || "No description provided"}
        </p>
        
        {api.parameters && api.parameters.length > 0 ? (
          <div className="mt-4">
            <h3 className="text-lg font-bold">Parameters:</h3>
            <ul className="list-disc ml-6">
              {api.parameters.map((param, index) => (
                <li key={index}>
                  <strong>{param.name}</strong> ({param.in}) - {param.required ? "Required" : "Optional"}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="mt-4 text-gray-500">No parameters required.</p>
        )}
      </div>

      <button 
        onClick={() => navigate("/apiList")} 
        className="mt-6 p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
      >
        Back to API List
      </button>
    </div>
  );
}
