import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import { SiAmericanexpress, SiMastercard, SiPaypal } from 'react-icons/si';
import { FaGooglePlay, FaAppStore } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 dark:text-gray-300 pt-12 pb-6 px-4 mt-16">
      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Store Info */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center mb-4">
              <i className="fa-solid fa-cart-shopping text-green-600 text-2xl mr-2"></i>
              <h2 className="text-2xl font-bold">FreshCart</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-center md:text-left mb-4">
              Your one-stop shop for fresh groceries and daily essentials
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-green-600">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-green-600">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-green-600">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-green-600">
                <FaYoutube size={20} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-green-600">
                <FaTiktok size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4 border-b border-green-600 pb-2">Quick Links</h3>
            <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-green-600 mb-2">Home</Link>
            <Link to="/products" className="text-gray-600 dark:text-gray-400 hover:text-green-600 mb-2">Products</Link>
            <Link to="/categories" className="text-gray-600 dark:text-gray-400 hover:text-green-600 mb-2">Categories</Link>
            <Link to="/brands" className="text-gray-600 dark:text-gray-400 hover:text-green-600 mb-2">Brands</Link>
            <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-green-600">About Us</Link>
          </div>

          {/* Customer Service */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4 border-b border-green-600 pb-2">Customer Service</h3>
            <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-green-600 mb-2">Contact Us</Link>
            <Link to="/faq" className="text-gray-600 dark:text-gray-400 hover:text-green-600 mb-2">FAQs</Link>
            <Link to="/shipping" className="text-gray-600 dark:text-gray-400 hover:text-green-600 mb-2">Shipping Policy</Link>
            <Link to="/returns" className="text-gray-600 dark:text-gray-400 hover:text-green-600 mb-2">Return Policy</Link>
            <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-green-600">Privacy Policy</Link>
          </div>

          {/* Newsletter & App */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4 border-b border-green-600 pb-2">Get the App</h3>
            <div className="flex flex-col space-y-3 mb-4">
              <a href="#" className="flex items-center bg-black text-white px-4 py-2 rounded">
                <FaAppStore className="mr-2" size={20} />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-lg font-semibold">App Store</div>
                </div>
              </a>
              <a href="#" className="flex items-center bg-black text-white px-4 py-2 rounded">
                <FaGooglePlay className="mr-2" size={20} />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-lg font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Payment & Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          {/* Payment Methods */}
          <div className="flex flex-col items-center mb-6">
            <h4 className="text-sm font-semibold mb-3">We Accept</h4>
            <div className="flex flex-wrap justify-center gap-4">
              <SiAmericanexpress size={32} className="text-gray-700 dark:text-gray-300" />
              <SiMastercard size={32} className="text-gray-700 dark:text-gray-300" />
              <SiPaypal size={32} className="text-gray-700 dark:text-gray-300" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">Cash on Delivery</span>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>&copy; {currentYear} FreshCart. All rights reserved.</p>
            <p className="mt-1">Designed with ❤️ for fresh shopping experience</p>
          </div>
        </div>
      </div>
    </footer>
  );
}