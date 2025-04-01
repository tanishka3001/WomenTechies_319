import { useState } from "react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function ApiUploader() {
  const navigate= useNavigate();
  const backgroundRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [error, setError] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [apiEndpoints, setApiEndpoints] = useState([]);

  useEffect(() => {
    const threeScript = document.createElement("script");
    threeScript.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
    threeScript.async = true;
    document.body.appendChild(threeScript);

    const vantaScript = document.createElement("script");
    vantaScript.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js";
    vantaScript.async = true;
    document.body.appendChild(vantaScript);

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
          points: 12.0,
          maxDistance: 18.0,
          spacing: 15.0,
        });
      }
    };

    return () => {
      document.body.removeChild(threeScript);
      document.body.removeChild(vantaScript);
      if (window.VANTA && window.VANTA.NET) {
        window.VANTA.NET().destroy();
      }
    };
  }, []);

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
const uploadFile=async(uploadedFile)=>{
  const formData = new FormData();
  formData.append("file", uploadedFile); // Append the file to FormData

  try {
    const response = await axios.post("http://localhost:4000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if(response.status===200)
      console.log(response.data.apiData.endpoints);
    alert("File Uploaded Successfully");
    setApiEndpoints(response.data.apiData.endpoints);
    //console.log(apiEndpoints);
    
  }
    catch(err){
      console.log(err);
    }

};
  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      handleFileRead(uploadedFile);
      uploadFile(uploadedFile);
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
      {/* Navbar */}
      <nav className="bg-transparent p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-white text-2xl font-bold">
            <a href="/">Code to UI</a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <a href="#" className="text-white hover:text-gray-200">Home</a>
            <a href="#about" className="text-white hover:text-gray-200">About</a>
            <a href="#contact" className="text-white hover:text-gray-200">Contact</a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setShowMenu(!showMenu)}>
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {showMenu && (
          <div className="md:hidden bg-gray-800 p-4 mt-2">
            <a href="#" className="block text-white py-2">Home</a>
            <a href="#about" className="block text-white py-2">About</a>
            <a href="#contact" className="block text-white py-2">Contact</a>
          </div>
        )}
      </nav>

      {/* Upload Section */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray p-8">
        <div className="w-full max-w-2xl bg-white bg-opacity-80 shadow-md rounded-lg p-8 space-y-6">
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
            <label className="bg-[#287063] text-white px-6 py-3 mt-4 rounded-md hover:bg-[#1e594d] transition cursor-pointer inline-block">
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
          <button onClick={() => navigate("/apiList",{ state: { apiEndpoints }})} className="w-full bg-[#287063] text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
            Process JSON
          </button>
        </div>
      </div>
    </div>
  );
}
