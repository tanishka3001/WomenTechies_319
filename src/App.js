import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApiUploader from "./components/fileupload";
import About from "./components/about";
import Contact from "./components/contact";
import List from "./components/apiList";
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div><ApiUploader /><About /><Contact /></div>} />
        <Route path="/apiList" element={<List />} />
      </Routes>
    </Router>
  );
}
