import React, { useState, useEffect } from "react";

const Website = () => {
  const [generatedHTML, setGeneratedHTML] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  

  const fetchGeneratedHTML = async () => {
    setLoading(true);
    setError("");
    try {
      const payload = {
        project_description: localStorage.getItem("project_description"),
      };

      const response = await fetch("http://127.0.0.1:5000/mermaid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch generated HTML code");
      }

      // Parse the response as text instead of JSON
      const htmlResponse = await response.text();
      setGeneratedHTML(htmlResponse);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGeneratedHTML();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">
          Generating Technical Overview
        </h1>
        {loading ? (
          <p className="text-center text-black">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <iframe
            title="Mermaid Diagram Preview"
            srcDoc={generatedHTML}
            className="w-full h-[500px] border border-gray-300 rounded-lg"
          />
        )}
      </div>
    </div>
  );
};

export default Website;
