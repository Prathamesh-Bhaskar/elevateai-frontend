import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { setProblem } from "../redux/slices/inputSlice";

const Questions1 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentAnswer, setCurrentAnswer] = React.useState("");

  const handleNext = () => {
    if (currentAnswer.trim()) {
      dispatch(setProblem(currentAnswer)); // Save answer in Redux
      navigate("/question2"); // Redirect to question 2
    }
  };

  return (
    <div className="flex-1 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-xl mb-2">
            Hey! 👋 Answer this question to let our AI help improve your
            business description
          </h2>
        </div>

        <div className="mb-8">
          <div className="text-[#9FE870] mb-4">Question 1 of 5</div>
          <h1 className="text-3xl font-bold mb-8">
            What specific services or products does the business offer?
          </h1>

          <textarea
            className="textarea-custom w-full p-4 border rounded-md"
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder="Type your answer here..."
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-[#9FE870] text-black rounded-full hover:bg-[#8AD95F] transition-colors flex items-center gap-2"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questions1;
