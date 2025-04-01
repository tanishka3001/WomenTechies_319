import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const backgroundRef = useRef(null); // Reference for background

  useEffect(() => {
    // Load three.js
    const threeScript = document.createElement("script");
    threeScript.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
    threeScript.async = true;
    document.body.appendChild(threeScript);

    // Load Vanta.js Waves
    const vantaScript = document.createElement("script");
    vantaScript.src = "https://cdn.jsdelivr.net/gh/tengbao/vanta/dist/vanta.waves.min.js";
    vantaScript.async = true;
    document.body.appendChild(vantaScript);

    // Load Finisher Header script
    const finisherScript = document.createElement("script");
    finisherScript.src = "finisher-header.es5.min.js"; // Path to your script
    finisherScript.async = true;
    document.body.appendChild(finisherScript);

    // Initialize Vanta and Finisher Header after scripts load
    vantaScript.onload = () => {
      if (window.VANTA && window.VANTA.WAVES && backgroundRef.current) {
        window.VANTA.WAVES({
          el: backgroundRef.current, // Targeting the React element
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x1a1a19,
        });
      }
    };

    finisherScript.onload = () => {
      if (window.FinisherHeader && backgroundRef.current) {
        new window.FinisherHeader({
          count: 10,
          size: {
            min: 2,
            max: 40,
            pulse: 0,
          },
          speed: {
            x: { min: 0, max: 0.8 },
            y: { min: 0, max: 0.2 },
          },
          colors: {
            background: "#15182e",
            particles: ["#ff926b", "#87ddfe", "#acaaff", "#1bffc2", "#f9a5fe"],
          },
          blending: "screen",
          opacity: { center: 1, edge: 1 },
          skew: -1,
          shapes: ["c", "s", "t"],
          el: backgroundRef.current, // Make sure to target the ref here
        });
      }
    };

    // Cleanup when component unmounts
    return () => {
      document.body.removeChild(threeScript);
      document.body.removeChild(vantaScript);
      document.body.removeChild(finisherScript);
      if (window.VANTA && window.VANTA.WAVES) {
        window.VANTA.WAVES().destroy();
      }
      if (window.FinisherHeader) {
        window.FinisherHeader.destroy();
      }
    };
  }, []);

  return (
    <div ref={backgroundRef} className="w-full h-screen">
    </div>
  );
}
