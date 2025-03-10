import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ReactMarkdown from "react-markdown"; // Import react-markdown
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";


interface ApiResponse {
  original_data?: {
    key_resources: string;
    problem: string;
    revenue_streams: string;
    solution: string;
    target_customers: string;
    user_input: string;
  };
  response?: string;
  status?: string;
  [key: string]: unknown;
}

const Analytics = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("Last year");
  const [selectedWeek, setSelectedWeek] = useState("This week");

  // Retrieve all fields from Redux
  const {
    user_input,
    problem,
    target_customers,
    solution,
    key_resources,
    revenue_streams,
  } = useSelector((state: RootState) => state.input);

  // State for API response, loading, and errors
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // State for confirmation API response, loading, and errors
  const [confirmationResponse, setConfirmationResponse] = useState<string | null>(null);
  const [confirmationLoading, setConfirmationLoading] = useState<boolean>(false);
  const [confirmationError, setConfirmationError] = useState<string>("");
  // State to disable confirmation buttons after one click
  const [confirmationDisabled, setConfirmationDisabled] = useState<boolean>(false);
  // State to track which confirmation was chosen ("yes" or "no")
  const [confirmationChoice, setConfirmationChoice] = useState<"yes" | "no" | null>(null);

  // State for additional feedback input (shown only when "no" is selected)
  const [feedback, setFeedback] = useState<string>("");

  // New states for the clarification API call
  const [clarificationResponse, setClarificationResponse] = useState<string | null>(null);
  const [clarificationLoading, setClarificationLoading] = useState<boolean>(false);
  const [clarificationError, setClarificationError] = useState<string>("");

  // Call the validate API on component mount or when any input field changes
  useEffect(() => {
    const payload = {
      user_input,
      problem,
      target_customers,
      solution,
      key_resources,
      revenue_streams,
    };

    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("http://127.0.0.1:4000/validate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          throw new Error("API response was not ok");
        }
        const data: ApiResponse = await response.json();
        setApiResponse(data);
        localStorage.setItem("canvasData", JSON.stringify(data.response));
        localStorage.setItem("project_description", JSON.stringify(data.response));
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Something went wrong");
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    user_input,
    problem,
    target_customers,
    solution,
    key_resources,
    revenue_streams,
  ]);

  // Dummy data for Business Graph Analysis based on the selected period
  const businessChartData: Record<string, { label: string; value: number }[]> = {
    "Last year": [
      { label: "Jan", value: 50 },
      { label: "Feb", value: 60 },
      { label: "Mar", value: 55 },
      { label: "Apr", value: 65 },
      { label: "May", value: 70 },
      { label: "Jun", value: 75 },
      { label: "Jul", value: 80 },
      { label: "Aug", value: 85 },
      { label: "Sep", value: 60 },
      { label: "Oct", value: 70 },
      { label: "Nov", value: 90 },
      { label: "Dec", value: 100 },
    ],
    "Last 6 months": [
      { label: "Jul", value: 80 },
      { label: "Aug", value: 85 },
      { label: "Sep", value: 60 },
      { label: "Oct", value: 70 },
      { label: "Nov", value: 90 },
      { label: "Dec", value: 100 },
    ],
    "Last month": [
      { label: "Week 1", value: 75 },
      { label: "Week 2", value: 80 },
      { label: "Week 3", value: 85 },
      { label: "Week 4", value: 90 },
    ],
  };

  // Dummy data for Competitive Analysis based on the selected week range
  const competitiveChartData: Record<string, { label: string; value: number }[]> = {
    "This week": [
      { label: "Mon", value: 95 },
      { label: "Tue", value: 80 },
      { label: "Wed", value: 70 },
      { label: "Thu", value: 85 },
      { label: "Fri", value: 90 },
    ],
    "Last week": [
      { label: "Mon", value: 90 },
      { label: "Tue", value: 85 },
      { label: "Wed", value: 80 },
      { label: "Thu", value: 75 },
      { label: "Fri", value: 95 },
      { label: "Sat", value: 65 },
      { label: "Sun", value: 70 },
    ],
    "Last month": [
      { label: "Week 1", value: 80 },
      { label: "Week 2", value: 85 },
      { label: "Week 3", value: 90 },
      { label: "Week 4", value: 75 },
    ],
  };

  // Function to call the confirmation API and disable the buttons once clicked
  const handleConfirmation = async (confirmation: "yes" | "no") => {
    if (confirmationDisabled) return;
    setConfirmationChoice(confirmation);
    setConfirmationDisabled(true);
    setConfirmationLoading(true);
    setConfirmationError("");

    try {
      const response = await fetch("http://127.0.0.1:4000/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirmation }),
      });

      if (!response.ok) {
        throw new Error("Confirmation API response was not ok");
      }

      const data = await response.json();
      setConfirmationResponse(data.response || JSON.stringify(data));

      if (confirmation === "yes") {
        toast.success("Confirmation successful! Redirecting to canvas...");
        setTimeout(() => {
          navigate("/canvas");
        }, 2000);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setConfirmationError(err.message || "Something went wrong with confirmation");
      } else {
        setConfirmationError("Something went wrong with confirmation");
      }
    } finally {
      setConfirmationLoading(false);
    }
  };

  // Function to handle sending clarifications when "no" is selected
  const handleFeedbackSend = async () => {
    setClarificationLoading(true);
    setClarificationError("");
    try {
      const payload = {
        clarification_input: feedback,
        original_data: {
          user_input,
          problem,
          target_customers,
          solution,
          key_resources,
          revenue_streams,
        },
      };

      const response = await fetch("http://127.0.0.1:4000/clarify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Clarification API response was not ok");
      }

      const data = await response.json();
      setClarificationResponse(data.response || JSON.stringify(data));
      toast.success("Clarification submitted successfully!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setClarificationError(err.message || "Something went wrong with clarification");
      } else {
        setClarificationError("Something went wrong with clarification");
      }
    } finally {
      setClarificationLoading(false);
    }
  };

  return (
    <div className="flex-1 p-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Left Column: Display Redux Data and API Response */}
        <div className="bg-[#2A2A2A] p-6 rounded-lg max-h-[1000px] overflow-y-auto">
          <div className="mb-4">
            <h3 className="text-xl font-semibold">My Understanding</h3>
          </div>
          <div className="mt-4 space-y-4 text-gray-400">
            <div>
              <p>{user_input || "No data provided."}</p>
            </div>
          </div>

          {/* API Response rendered as formatted Markdown */}
          <div className="mt-6 p-4 bg-[#1E1E1E] rounded-lg text-gray-100">
            <h3 className="text-lg font-semibold mb-2">API Response:</h3>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="prose prose-invert text-sm">
                <ReactMarkdown>
                  {apiResponse && apiResponse.response
                    ? apiResponse.response
                    : "No response yet."}
                </ReactMarkdown>
              </div>
            )}
          </div>

          {/* Yes / No buttons are shown after a successful API response */}
          {!loading && !error && apiResponse && apiResponse.response && (
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleConfirmation("yes")}
                disabled={confirmationDisabled}
                className={`px-4 py-1 rounded-full text-sm transition-colors ${
                  confirmationDisabled
                    ? "bg-gray-400"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => handleConfirmation("no")}
                disabled={confirmationDisabled}
                className={`px-4 py-1 rounded-full text-sm transition-colors ${
                  confirmationDisabled
                    ? "bg-gray-400"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
              >
                No
              </button>
            </div>
          )}

          {/* Display the confirmation API response in formatted text below the buttons */}
          {confirmationLoading && (
            <p className="mt-2">Submitting confirmation...</p>
          )}
          {confirmationError && (
            <p className="mt-2 text-red-500">{confirmationError}</p>
          )}
          {confirmationResponse && (
            <div className="mt-2 p-4 bg-[#1E1E1E] rounded-lg text-gray-100">
              <h3 className="text-lg font-semibold mb-2">
                Confirmation Response:
              </h3>
              <div className="prose prose-invert text-sm">
                <ReactMarkdown>{confirmationResponse}</ReactMarkdown>
              </div>
            </div>
          )}

          {/* If "no" is selected, show the additional clarification input area */}
          {confirmationChoice === "no" && (
            <div className="mt-6">
              <div className="bg-[#2A2A2A] p-4 rounded-lg">
                <textarea
                  placeholder="Type your clarifications here ..."
                  className="w-full bg-transparent resize-none focus:outline-none text-gray-400"
                  rows={3}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-400">
                    Elevate AI can make mistakes.
                  </p>
                  <button
                    onClick={handleFeedbackSend}
                    disabled={clarificationLoading}
                    className="p-2 bg-blue-500 text-white rounded-full transition-colors hover:bg-blue-600"
                  >
                    Send
                  </button>
                </div>
                {clarificationLoading && (
                  <p className="mt-2">Submitting clarification...</p>
                )}
                {clarificationError && (
                  <p className="mt-2 text-red-500">{clarificationError}</p>
                )}
                {clarificationResponse && (
                  <div className="mt-2 p-4 bg-[#1E1E1E] rounded-lg text-gray-100">
                    <h3 className="text-lg font-semibold mb-2">
                      Clarification Response:
                    </h3>
                    <div className="prose prose-invert text-sm">
                      <ReactMarkdown>{clarificationResponse}</ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Business Graph Analysis and Competitive Analysis */}
        <div className="bg-[#2A2A2A] p-6 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Business Graph Analysis</h3>
            <div className="flex gap-2">
              <button
                onClick={() => navigate("/canvas")}
                className="px-4 py-1 bg-[#9FE870] text-black rounded-full text-sm hover:bg-[#8AD95F] transition-colors"
              >
                Business Canvas
              </button>
              <button
  onClick={() => window.location.href = "https://admirable-zabaione-208eb4.netlify.app/"}
  className="px-4 py-1 bg-[#9FE870] text-black rounded-full text-sm hover:bg-[#8AD95F] transition-colors"
>
  Analysis
</button>

<Link to="/website">
  <button className="px-4 py-1 bg-[#9FE870] text-black rounded-full text-sm hover:bg-[#8AD95F] transition-colors">
    Technical Overview
  </button>
</Link>
            </div>
          </div>

          {/* Select for Business Graph Analysis */}
          <div className="mb-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-[#1E1E1E] text-white px-4 py-2 rounded-lg"
            >
              <option>Last year</option>
              <option>Last 6 months</option>
              <option>Last month</option>
            </select>
          </div>

          {/* Business Graph Chart */}
          <div className="h-64 bg-[#1E1E1E] rounded-lg mb-8 p-4">
            <div
              className={`grid gap-4 ${
                businessChartData[selectedPeriod].length === 12
                  ? "grid-cols-12"
                  : businessChartData[selectedPeriod].length === 6
                  ? "grid-cols-6"
                  : "grid-cols-4"
              }`}
            >
              {businessChartData[selectedPeriod].map((data, index) => (
                <div key={index} className="flex flex-col justify-end items-center">
                  {/* The blue bar height is based on the dummy "value" */}
                  <div
                    className="bg-[#4A4AFF] rounded-t-sm w-full"
                    style={{ height: `${data.value}%` }}
                  />
                  {/* The green bar is just for contrast; here you could show additional info */}
                  <div
                    className="bg-[#9FE870] rounded-b-sm w-full"
                    style={{ height: `${100 - data.value}%` }}
                  />
                  <span className="text-xs mt-1">{data.label}</span>
                </div>
              ))}
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-4">Competitive Analysis</h3>
          {/* Select for Competitive Analysis */}
          <div className="mb-4">
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
              className="bg-[#1E1E1E] text-white px-4 py-2 rounded-lg"
            >
              <option>This week</option>
              <option>Last week</option>
              <option>Last month</option>
            </select>
          </div>

          {/* Competitive Analysis Chart */}
          <div className="space-y-4">
            {competitiveChartData[selectedWeek].map((data, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className="w-10">{data.label}</span>
                <div
                  className="flex-1 h-6 bg-[#4A4AFF] rounded-full"
                  style={{ width: `${data.value}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
