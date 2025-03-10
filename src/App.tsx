import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Input from "./pages/Input";
import Questions1 from "./pages/Questions1";
import Questions2 from "./pages/Questions2";
import Questions3 from "./pages/Questions3";
import Questions4 from "./pages/Questions4";
import Questions5 from "./pages/Questions5";
import Canvas from "./pages/Canvas";
import Analytics from "./pages/Analytics";
import Website from "./pages/Website";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#1E1E1E] text-white flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/input" element={<Input />} />
          <Route path="/questions1" element={<Questions1 />} />
          <Route path="/question2" element={<Questions2 />} />
          <Route path="/question3" element={<Questions3 />} />
          <Route path="/question4" element={<Questions4 />} />
          <Route path="/question5" element={<Questions5 />} />
          <Route path="/canvas" element={<Canvas />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/website" element={<Website />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
