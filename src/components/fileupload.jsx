import { useState } from "react";
import { useEffect, useRef } from "react";

export default function ApiUploader() {
  const backgroundRef = useRef(null);

  useEffect(() => {
    const threeScript = document.createElement("script");
    threeScript.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
    threeScript.async = true;
    document.body.appendChild(threeScript);

    const vantaScript = document.createElement("script");
    vantaScript.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js";
    vantaScript.async = true;
    document.body.appendChild(vantaScript);

    const finisherScript = document.createElement("script");
    finisherScript.src = "finisher-header.es5.min.js";
    finisherScript.async = true;
    document.body.appendChild(finisherScript);

    vantaScript.onload = () => {
      if (window.VANTA && window.VANTA.NET && backgroundRef.current) {
        window.VANTA.NET({
          el: backgroundRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x16eae5,
          backgroundColor: 0x0,
          points: 9.0,
          maxDistance: 18.0,
          spacing: 17.0,
        });
      }
    };

    return () => {
      document.body.removeChild(threeScript);
      document.body.removeChild(vantaScript);
      document.body.removeChild(finisherScript);
      if (window.VANTA && window.VANTA.NET) {
        window.VANTA.NET().destroy();
      }
      if (window.FinisherHeader) {
        window.FinisherHeader.destroy();
      }
    };
  }, []);

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
    <div ref={backgroundRef} className="w-full h-screen">
      <div className="flex flex-row">
        <div className="mt-5 ml-5 text-white text-2xl font-bold">Code to UI</div>
        <nav>
          <ul className="flex mt-5 ml-[1140px] gap-6 text-white text-lg">
            <li><a href="#">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray p-8">
        <div className="w-full max-w-2xl bg-white bg-opacity-[0.8] shadow-md rounded-lg p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Upload OpenAPI/Swagger JSON
          </h2>
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
            <label className="bg-[#287063] text-white px-6 py-3 mt-4 rounded-md hover:bg-[#287063] transition cursor-pointer inline-block">
              Choose a File
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
          {file && (
            <p className="text-green-600 text-sm text-center">Selected file: {file.name}</p>
          )}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {jsonData && (
            <div className="bg-gray-100 p-4 rounded overflow-auto max-h-60 border">
              <pre className="text-xs">{JSON.stringify(jsonData, null, 2)}</pre>
            </div>
          )}
          {/* Added Button */}
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
            Process JSON
          </button>
        </div>
      </div>
    </div>
  );
}