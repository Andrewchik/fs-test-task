import React from 'react';

export default function AuthModal() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-900 opacity-75"></div>
      <div className="w-full max-w-md p-4 mx-auto bg-white rounded-lg z-50 shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Log In</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="login"
              className="block text-sm font-medium text-gray-600"
            >
              Login
            </label>
            <input
              type="text"
              id="login"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-600"
              onClick={() => {
                handleLogIn();
                setShowLoginModal(false);
              }}
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
