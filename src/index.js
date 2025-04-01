import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ApiUploader from "./components/fileupload";
import About from "./components/about";
import Contact from "./components/contact";
//import AnimatedBackground from "./components/background";
//import ThreeBackground from "./components/contact";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApiUploader />
    <About />
    <Contact/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
