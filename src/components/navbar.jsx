import { useEffect } from "react";

export default function AnimatedNavbar() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "finisher-header.es5.min.js";
    script.type = "text/javascript";
    script.onload = () => {
      if (window.FinisherHeader) {
        new window.FinisherHeader({
          count: 4,
          size: { min: 1200, max: 1500, pulse: 0.1 },
          speed: {
            x: { min: 0, max: 1.2 },
            y: { min: 0, max: 0.2 },
          },
          colors: {
            background: "#9138e5",
            particles: ["#ff4848","#000000","#2235e5","#000000","#ff0000"],
          },
          blending: "lighten",
          opacity: { center: 0.8, edge: 0.2 },
          skew: 0,
          shapes: ["c", "s","t"],
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <header className="finisher-header w-full h-[80px] flex items-center justify-between px-6 bg-transparent">
      <div className="text-white text-2xl font-bold">Code to UI</div>
      <nav>
        <ul className="flex gap-6 text-white text-lg">
          <li><a href="#">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}


