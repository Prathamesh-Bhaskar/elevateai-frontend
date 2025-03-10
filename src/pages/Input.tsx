import { useNavigate } from "react-router-dom";
import { ArrowRight, Mic } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setInputText } from "../redux/slices/inputSlice"; // adjust the import path as needed
import { RootState } from "../redux/store"; // update this import to point to your store file

const Input = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Use the typed RootState instead of any
  const inputText = useSelector((state: RootState) => state.input.user_input);

  const handleNext = () => {
    if (inputText.trim()) {
      navigate("/questions1");
    }
  };

  return (
    <div className="flex-1 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">what do you want to build?</h1>
        <p className="text-gray-400 mb-12">
          Answer a few quick questions, and your business plan will be ready in
          minutes.
        </p>

        <div className="mb-8">
          <textarea
            className="textarea-custom"
            placeholder="How can help you today ?"
            value={inputText}
            onChange={(e) => dispatch(setInputText(e.target.value))}
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <button
              onClick={handleNext}
              className="bg-[#9FE870] text-black px-6 py-2 rounded-full hover:bg-[#8AD95F] transition-colors flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-4">
            <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
              <Mic className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
          <button className="p-4 bg-[#2A2A2A] rounded-lg text-left hover:bg-[#353535] transition-colors">
            Start a blog with Astro
          </button>
          <button className="p-4 bg-[#2A2A2A] rounded-lg text-left hover:bg-[#353535] transition-colors">
            Build a mobile app with NativeScript
          </button>
          <button className="p-4 bg-[#2A2A2A] rounded-lg text-left hover:bg-[#353535] transition-colors">
            Start YouTube Channel
          </button>
          <button className="p-4 bg-[#2A2A2A] rounded-lg text-left hover:bg-[#353535] transition-colors">
            Code a video with Remontion
          </button>
          <button className="p-4 bg-[#2A2A2A] rounded-lg text-left hover:bg-[#353535] transition-colors">
            SaaS business idea for Future
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
