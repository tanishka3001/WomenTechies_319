import { useLocation, useNavigate } from "react-router-dom";

export default function ApiList() {
  const location = useLocation();
  const navigate = useNavigate();
  const apiEndpoints = location.state?.apiEndpoints || [];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">API Endpoints</h2>
      {apiEndpoints.length > 0 ? (
        apiEndpoints.map((api, index) => (
          <button
            key={index}
            onClick={() => navigate("/apiDisplay", { state: { api ,apiEndpoints} })}
            className="block mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {api.method} - {api.path}
          </button>
        ))
      ) : (
        <p>No API endpoints found.</p>
      )}
    </div>
  );
}
