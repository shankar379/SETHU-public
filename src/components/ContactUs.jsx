import React from 'react';

const ContactUs = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex w-3/4 shadow-lg">
        {/* Left Section */}
        <div className="bg-black text-white p-8 rounded-l-lg w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-lg leading-relaxed mb-8">
              You need more information? Check what other persons are saying about our product. They are very happy with their purchase.
            </p>
          </div>
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 10.733V5.5a2.5 2.5 0 00-2.5-2.5h-7A2.5 2.5 0 004 5.5v13A2.5 2.5 0 006.5 21h7a2.5 2.5 0 002.5-2.5v-5.233"></path>
              </svg>
              <div>
                <p className="font-semibold">Find us at the office</p>
                <p>Bld Mihail Kogalniceanu, nr. 8, 7652 Bucharest, Romania</p>
              </div>
            </div>
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10v5c0 1.5 1.5 3 3 3h3a2 2 0 002-2v-1.586a1 1 0 011.707-.707L16 18l4.293-4.293a1 1 0 00.707-1.707V5a2 2 0 00-2-2h-5"></path>
              </svg>
              <div>
                <p className="font-semibold">Give us a ring</p>
                <p>Michael Jordan</p>
                <p>+40 762 321 762</p>
                <p>Mon - Fri, 8:00-22:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white p-8 rounded-r-lg w-1/2 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6">Contact us</h2>
          <form className="space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Message"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex items-start">
              <input
                type="checkbox"
                id="privacy-policy"
                className="h-4 w-4 mt-1"
              />
              <label htmlFor="privacy-policy" className="ml-2 text-sm">
                You agree to our <a href="#" className="text-blue-500">Privacy Policy</a>.
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
