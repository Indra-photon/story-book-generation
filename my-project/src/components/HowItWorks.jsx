// HowItWorks.jsx
import React from 'react';

const HowItWorks = () => {
  return (
    <section className="py-20 bg-light">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-sans text-dark mb-4">How It Works</h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-600">
            Transform your portrait into an animated cartoon character in just three simple steps
          </p>
        </div>
        
        {/* Process steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center text-3xl font-sans text-white">1</div>
              <div className="hidden md:block absolute top-1/2 left-full w-full h-4 bg-accent2 transform -translate-y-1/2 -z-10"></div>
            </div>
            <h3 className="text-2xl font-sans text-dark mb-3">Upload Your Portrait</h3>
            <p className="text-center text-gray-600 mb-6">
              Take a selfie or upload your favorite portrait photo through our easy-to-use interface.
            </p>
            <div className="relative w-full h-64 bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                {/* This would be replaced with an actual image in production */}
                <div className="w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-white py-2 px-3 shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Upload Portrait</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center text-3xl font-sans text-white">2</div>
              <div className="hidden md:block absolute top-1/2 left-full w-full h-4 bg-accent2 transform -translate-y-1/2 -z-10"></div>
            </div>
            <h3 className="text-2xl font-sans text-dark mb-3">AI Transformation</h3>
            <p className="text-center text-gray-600 mb-6">
              Our Leonardo AI technology analyzes your photo and transforms it into a cartoon character.
            </p>
            <div className="relative w-full h-64 bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                {/* Transformation visualization */}
                <div className="flex items-center">
                  <div className="w-24 h-24 rounded-full bg-gray-300 flex-shrink-0 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-gray-400 p-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  <div className="w-24 h-24 rounded-full bg-accent ml-4 flex items-center justify-center">
                    <div className="w-18 h-18 rounded-full bg-white flex flex-col items-center justify-center">
                      <div className="flex gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-dark"></div>
                        <div className="w-2 h-2 rounded-full bg-dark"></div>
                      </div>
                      <div className="w-4 h-2 bg-dark rounded-b-full"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-white py-2 px-3 shadow-md">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-primary-500 h-2.5 rounded-full w-3/4"></div>
                  </div>
                  <p className="text-xs text-center mt-1 text-gray-500">AI Processing...</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center text-3xl font-sans text-white">3</div>
            </div>
            <h3 className="text-2xl font-sans text-dark mb-3">Add Animation</h3>
            <p className="text-center text-gray-600 mb-6">
              Kling AI brings your character to life with customizable animations ready to share.
            </p>
            <div className="relative w-full h-64 bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                {/* Animation preview placeholder */}
                <div className="w-32 h-32 rounded-full bg-accent flex items-center justify-center animate-bounce">
                  <div className="w-24 h-24 rounded-full bg-white flex flex-col items-center justify-center">
                    <div className="flex gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full bg-dark"></div>
                      <div className="w-3 h-3 rounded-full bg-dark"></div>
                    </div>
                    <div className="w-6 h-3 bg-dark rounded-b-full"></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-white py-2 px-3 shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Download or Share</span>
                    <div className="flex space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="mt-16 text-center">
          <button className="px-8 py-4 bg-accent text-dark font-sans text-xl rounded-full shadow-button hover:-translate-y-1 transform transition duration-200">
            Try It Now - Free!
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;