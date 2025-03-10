import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/image.png'; // Ensure the uploaded image is placed in the correct path

const Navbar = () => {
  return (
    <nav className="py-4 px-6 flex justify-between items-center bg-[#1B1432] text-[#E6D48E]">
      <Link to="/" className="flex items-center space-x-2">
        <img src={logo} alt="Elev8 AI Logo" className="h-20 w-auto" />
      </Link>
      
      <div className="flex items-center space-x-8">
        <Link to="/" className="hover:text-[#E6D48E]">Home</Link>
        <Link to="/services" className="hover:text-[#E6D48E]">Services</Link>
        <Link to="/contact" className="hover:text-[#E6D48E]">Contact</Link>
        <Link to="/plans" className="hover:text-[#E6D48E]">Choose Plan</Link>
        <Link 
          to="/contact"
          className="bg-[#E6D48E] text-black px-6 py-2 rounded-full hover:bg-[#C2B59B] transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;