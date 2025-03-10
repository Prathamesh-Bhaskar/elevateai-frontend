import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Instagram } from 'lucide-react';
import logo from '../assets/image.png'; // Ensure the uploaded image is placed in the correct path

const Footer = () => {
  return (
    <footer className="mt-auto py-6 px-6 border-t border-gray-800 bg-[#1B1432] text-[#E6D48E]">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Elev8 AI Logo" className="h-20 w-auto" />
        </div>
        
        <div className="text-sm text-[#C2B59B]">
          © Copyright Pebisnis Ulung. All rights reserved.
        </div>
        
        <div className="flex items-center space-x-6">
          <Link to="/privacy" className="text-sm text-[#C2B59B] hover:text-[#E6D48E]">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-sm text-[#C2B59B] hover:text-[#E6D48E]">
            Terms
          </Link>
          <Link to="/contact" className="text-sm text-[#C2B59B] hover:text-[#E6D48E]">
            Get in Touch
          </Link>
          <div className="flex space-x-4">
            <a href="#" className="text-[#C2B59B] hover:text-[#E6D48E]">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-[#C2B59B] hover:text-[#E6D48E]">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-[#C2B59B] hover:text-[#E6D48E]">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
