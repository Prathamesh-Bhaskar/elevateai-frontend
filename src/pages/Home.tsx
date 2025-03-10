import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wand2, Recycle } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 px-6 py-12">
      <div className="text-center mb-24">
        <div className="text-sm mb-4">AI Business Plan Generator</div>
        <h1 className="text-5xl font-bold mb-6">
          Get your Free professional<br />
          <span className="text-[#9FE870]">Business Plan</span> ready in Minutes
        </h1>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Your business plan is just a click away. Answer a few questions, and our free AI business plan generator
          will craft a detailed business plan tailored just for you in minutes.
        </p>
        <button
          onClick={() => navigate('/input')}
          className="bg-[#9FE870] text-black px-8 py-3 rounded-full hover:bg-[#8AD95F] transition-colors"
        >
          Generate your Plan
        </button>
      </div>

      <div className="text-center mb-24">
        <h2 className="text-2xl font-semibold mb-12">
          Join over 1000+ Entrepreneurs & business owners
        </h2>
        <div className="flex justify-center space-x-16 opacity-50">
          {/* Replace with actual company logos */}
          <div>Slack</div>
          <div>Prudential</div>
          <div>Microsoft</div>
          <div>Zoover</div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-12 text-center">
          Why <span className="text-[#9FE870]">Elevate AI</span> is the Best AI Business Plan Generator?
        </h2>
        
        <div className="grid grid-cols-3 gap-8">
          <div className="bg-[#2A2A2A] p-8 rounded-lg">
            <Wand2 className="w-12 h-12 text-[#9FE870] mb-4" />
            <h3 className="text-xl font-semibold mb-4">AI Assistance - A way to save time</h3>
            <p className="text-gray-400">
              Craft comprehensive business plans with our AI generator. Input your ideas,
              and let the AI handle the structuring and drafting, saving you time and effort.
            </p>
          </div>
          
          <div className="bg-[#2A2A2A] p-8 rounded-lg">
            <Wand2 className="w-12 h-12 text-[#9FE870] mb-4" />
            <h3 className="text-xl font-semibold mb-4">It works for any industry</h3>
            <p className="text-gray-400">
              Whether you are validating an idea or launching a startup, our AI generator
              provides industry-specific advice to streamline your planning process.
            </p>
          </div>
          
          <div className="bg-[#2A2A2A] p-8 rounded-lg">
            <Recycle className="w-12 h-12 text-[#9FE870] mb-4" />
            <h3 className="text-xl font-semibold mb-4">It's Free - Get 3 Trials Free</h3>
            <p className="text-gray-400">
              Access expert-level plans for free. Our business plan generator provides
              tailored advice and structured formats without financial commitment.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mt-24 bg-[#2A2A2A] py-16 rounded-lg">
        <h2 className="text-3xl font-semibold mb-8">
          Get an Investor-ready business plan for free
        </h2>
        <button
          onClick={() => navigate('/input')}
          className="bg-[#9FE870] text-black px-8 py-3 rounded-full hover:bg-[#8AD95F] transition-colors"
        >
          Generate your Plan
        </button>
      </div>
    </div>
  );
};

export default Home;