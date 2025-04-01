import React from "react";

export default function About() {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* About Title & Description */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900">About Code to UI</h2>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Code to UI is a powerful tool designed to simplify frontend development by 
            automatically converting OpenAPI/Swagger specifications into fully functional React components.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-10 shadow-lg rounded-xl text-center">
            <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Our mission is to streamline the frontend development process by reducing 
              the time and effort needed to manually create UI components from API specs.
            </p>
          </div>

          <div className="bg-white p-10 shadow-lg rounded-xl text-center">
            <h3 className="text-2xl font-bold text-gray-900">How It Works</h3>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Simply upload an OpenAPI or Swagger JSON file or provide a URL to fetch it, 
              and the tool will generate the corresponding React components including 
              forms, buttons, and data displays.
            </p>
          </div>
        </div>

        {/* Final Call-to-Action Section */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-extrabold text-gray-900">Join Us in Making Development Easier</h3>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            We're continually working to enhance the tool, adding more features and improving its 
            usability to help developers save time and effort in building frontend applications.
          </p>
        </div>
      </div>
    </section>
  );
}
