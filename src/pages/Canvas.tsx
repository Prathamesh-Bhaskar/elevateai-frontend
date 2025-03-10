import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart2, Download } from "lucide-react";

const Canvas = () => {
  const navigate = useNavigate();
  const canvasData = localStorage.getItem("canvasData");

  const [canvasDataP, setCanvasDataP] = useState<any>(null);

  const handleCanvasData = async () => {
    try {
      const response = await fetch("https://bmc-canvas-generator.onrender.com/canvas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startup_description: canvasData }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setCanvasDataP(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching canvas data:", error);
    }
  };

  useEffect(() => {
    handleCanvasData();
  }, []);

  // Helper function to render a list of items, if available
  const renderList = (items?: string[]) => {
    if (!items) return <p>Loading...</p>;
    return (
      <ol className="list-decimal pl-4 space-y-4">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
    );
  };

  // Extract the response object from our API response for easy access
  const responseData = canvasDataP?.response || {};

  return (
    <div className="flex-1 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl">Generated with AI</h2>
          <button
            onClick={() => navigate("/analytics")}
            className="flex items-center gap-2 px-6 py-2 bg-[#9FE870] text-black rounded-full hover:bg-[#8AD95F] transition-colors"
          >
            <BarChart2 className="w-5 h-5" />
            View Analytics
          </button>
        </div>
        <p className="text-[#9FE870] mb-12">👇 Click on any cell to edit</p>

        {/* First grid: Problem, Solution, Unique Value Propositions, Unfair Advantage */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {/* Problem */}
          <div className="bg-[#2A2A2A] p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Problem</h3>
            {renderList(responseData["Problem"])}
          </div>

          {/* Solution */}
          <div className="bg-[#2A2A2A] p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Solution</h3>
            {renderList(responseData["Solution"])}
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">Key Metrics</h4>
              {responseData["Key Metrics"] ? (
                <ol className="list-decimal pl-4 space-y-4">
                  {responseData["Key Metrics"].map(
                    (item: string, index: number) => (
                      <li key={index}>{item}</li>
                    )
                  )}
                </ol>
              ) : null}
            </div>
          </div>

          {/* Unique Value Propositions */}
          <div className="bg-[#2A2A2A] p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">
              Unique Value Propositions
            </h3>
            {renderList(responseData["Unique Value Propositions"])}
          </div>

          {/* Unfair Advantage */}
          <div className="bg-[#2A2A2A] p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Unfair Advantage</h3>
            {renderList(responseData["Unfair Advantage"])}
          </div>
        </div>

        {/* Second grid: Cost Structure, Technical Overview, Revenue Streams */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {/* Cost Structure */}
          <div className="bg-[#2A2A2A] p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Cost Structure</h3>
            {responseData["Cost Structure"] ? (
              <ol className="list-decimal pl-4 space-y-4">
                {responseData["Cost Structure"].map(
                  (item: string, index: number) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ol>
            ) : null}
          </div>

          {/* technical overview */}
          <div className="bg-[#2A2A2A] p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Technical Overview</h3>
            {responseData["Technical Overview"] ? (
              <ol className="list-decimal pl-4 space-y-4">
                {responseData["Technical Overview"].map(
                  (item: string, index: number) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ol>
            ) : null}
          </div>

          {/* Technical Overview - static as API doesn't return it */}
          {/* <div className="bg-[#2A2A2A] p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Technical Overview</h3>
            <ol className="list-decimal pl-4 space-y-2">
              <li>iGolf</li>
              <li>TopGolf</li>
              <li>Golf Pro</li>
              <li>Grant Golf Club</li>
              <li>GolfX Studio</li>
            </ol>
          </div> */}

          {/* Revenue Streams */}
          <div className="bg-[#2A2A2A] p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Revenue Streams</h3>
            {responseData["Revenue Streams"] ? (
              <ol className="list-decimal pl-4 space-y-4">
                {responseData["Revenue Streams"].map(
                  (item: string, index: number) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ol>
            ) : null}
          </div>
        </div>

        <div className="flex justify-center">
          <button className="bg-[#9FE870] text-black px-6 py-2 rounded-full hover:bg-[#8AD95F] transition-colors flex items-center gap-2">
            <Download className="w-5 h-5" />
            Download as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
