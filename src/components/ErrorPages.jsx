import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPages = () => {
  return (
    <div className="error-page min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white px-4">
      {/* Error Illustration */}
      <div className="text-center">
        <h1 className="text-8xl sm:text-9xl font-extrabold drop-shadow-lg">404</h1>
        <p className="text-xl sm:text-2xl font-semibold mt-4">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-sm sm:text-base mt-2">
          It seems you’ve hit a broken link or entered an incorrect URL.
        </p>
      </div>

      {/* Error Image */}
      <div className="mt-8 w-full max-w-md">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
          alt="Error Illustration"
          className="w-full object-cover"
        />
      </div>

      {/* Navigation Options */}
      <div className="mt-8">
        <Link
          to="/"
          className="bg-white text-red-500 px-6 py-2 text-lg font-semibold rounded shadow-lg hover:bg-gray-200 transition mb-10"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPages;
