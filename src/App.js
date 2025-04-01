import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApiUploader from "./components/fileupload";
import About from "./components/about";
import Contact from "./components/contact";
import List from "./components/apiList";
import Display from "./components/apiDisplay";
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div><ApiUploader /><About /><Contact /></div>} />
        <Route path="/apiList" element={<List />} />
        <Route path="/apiDisplay" element={<Display />} />
      </Routes>
    </Router>
  );
}
