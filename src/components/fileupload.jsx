import { useState } from "react";

export default function ApiUploader() {
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [error, setError] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleFileRead = (uploadedFile) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        setJsonData(json);
        setError(null);
      } catch (err) {
        setError("Invalid JSON file");
        setJsonData(null);
      }
    };
    reader.readAsText(uploadedFile);
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      handleFileRead(uploadedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length > 0) {
      const uploadedFile = e.dataTransfer.files[0];
      setFile(uploadedFile);
      handleFileRead(uploadedFile);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Upload OpenAPI/Swagger JSON
        </h2>

        {/* Drag & Drop Area */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
            dragging ? "bg-gray-200" : "bg-gray-100"
          }`}
        >
          <p className="text-gray-600">
            {dragging ? "Drop the file here..." : "Drag & Drop your file here or"}
          </p>
          <label className="bg-[#0A2540] text-white px-6 py-3 mt-4 rounded-md hover:bg-[#081D34] transition cursor-pointer inline-block">
            Choose a File
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Show Selected File Name */}
        {file && (
          <p className="text-green-600 text-sm text-center">Selected file: {file.name}</p>
        )}

        {/* Error Message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* JSON Preview */}
        {jsonData && (
          <div className="bg-gray-100 p-4 rounded overflow-auto max-h-60 border">
            <pre className="text-xs">{JSON.stringify(jsonData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
