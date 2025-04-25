// FeaturesShowcase.jsx
import React from 'react';

const FeaturesShowcase = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-chewy text-dark mb-4">Powerful Features</h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-600">
            Our advanced AI technologies work together to create stunning animated characters from your photos
          </p>
        </div>
        
        {/* Feature 1: Portrait Upload */}
        <div className="flex flex-col md:flex-row items-center mb-24">
          <div className="w-full md:w-1/2 md:pr-12 mb-10 md:mb-0">
            <div className="bg-light rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary-500/20 rounded-full"></div>
              <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-accent/10 rounded-full"></div>
              
              <div className="relative">
                <span className="inline-block bg-primary-500 text-white text-sm font-bold px-3 py-1 rounded-full mb-4">Step 1</span>
                <h3 className="text-3xl font-chewy text-dark mb-4">Smart Portrait Processing</h3>
                <p className="text-gray-600 mb-6">
                  Our system handles all types of portrait photos, optimizing them for the perfect cartoon transformation. Simply upload your picture and our AI will do the rest.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-dark text-xs font-bold">✓</span>
                    </div>
                    <span className="ml-2 text-gray-700">Works with selfies, professional photos, and more</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-dark text-xs font-bold">✓</span>
                    </div>
                    <span className="ml-2 text-gray-700">Automatic facial feature detection</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-dark text-xs font-bold">✓</span>
                    </div>
                    <span className="ml-2 text-gray-700">Privacy-focused processing with data encryption</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="relative">
              {/* Main image - a portrait upload interface */}
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="border-b border-gray-200 py-3 px-4 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <div className="mx-auto text-sm text-gray-500">Upload Portrait</div>
                </div>
                <div className="p-6 bg-gray-50">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-500 mb-4">Drag and drop your portrait here or</p>
                    <button className="px-4 py-2 bg-primary-500 text-white rounded-full text-sm font-semibold">Browse Files</button>
                  </div>
                  <div className="mt-6">
                    <p className="text-xs text-gray-500 mb-2">Portrait requirements:</p>
                    <ul className="text-xs text-gray-500 list-disc pl-5 space-y-1">
                      <li>Clear frontal face view</li>
                      <li>Good lighting conditions</li>
                      <li>Supported formats: JPG, PNG, HEIC</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent rounded-full opacity-20"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary-300 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
        
        {/* Feature 2: AI Transformation */}
        <div className="flex flex-col md:flex-row-reverse items-center mb-24">
          <div className="w-full md:w-1/2 md:pl-12 mb-10 md:mb-0">
            <div className="bg-light rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute -left-10 -top-10 w-32 h-32 bg-secondary-500/20 rounded-full"></div>
              <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-accent/10 rounded-full"></div>
              
              <div className="relative">
                <span className="inline-block bg-secondary-500 text-white text-sm font-bold px-3 py-1 rounded-full mb-4">Step 2</span>
                <h3 className="text-3xl font-chewy text-dark mb-4">Leonardo AI Transformation</h3>
                <p className="text-gray-600 mb-6">
                  Our state-of-the-art Leonardo AI transforms your portrait into a cartoon character while preserving your unique features and personality.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-dark text-xs font-bold">✓</span>
                    </div>
                    <span className="ml-2 text-gray-700">Multiple cartoon styles to choose from</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-dark text-xs font-bold">✓</span>
                    </div>
                    <span className="ml-2 text-gray-700">Preserves your unique facial characteristics</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-dark text-xs font-bold">✓</span>
                    </div>
                    <span className="ml-2 text-gray-700">Advanced color matching and enhancement</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="relative">
              {/* Main image - transformation comparison */}
              <div className="flex items-center justify-between bg-white rounded-lg shadow-xl p-6">
                <div className="w-5/12">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-200 mb-2">
                    {/* Placeholder for real photo */}
                    <div className="w-full h-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-center text-sm font-medium text-gray-700">Original Photo</div>
                </div>
                
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  <div className="text-xs text-primary-500 font-medium mt-1">Leonardo AI</div>
                </div>
                
                <div className="w-5/12">
                  <div className="aspect-square rounded-lg overflow-hidden bg-accent/20 mb-2">
                    {/* Placeholder for cartoon */}
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white flex flex-col items-center justify-center">
                          <div className="flex gap-2 mb-1">
                            <div className="w-2 h-2 rounded-full bg-dark"></div>
                            <div className="w-2 h-2 rounded-full bg-dark"></div>
                          </div>
                          <div className="w-5 h-2 bg-dark rounded-b-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center text-sm font-medium text-gray-700">Cartoon Version</div>
                </div>
              </div>
              
              {/* Style options below */}
              <div className="mt-4 bg-white rounded-lg shadow-lg p-4">
                <div className="text-center text-sm font-medium text-gray-700 mb-3">Available Styles</div>
                <div className="flex justify-between">
                  <div className="w-16">
                    <div className="w-12 h-12 mx-auto rounded-full bg-primary-500 mb-1 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-white"></div>
                    </div>
                    <div className="text-center text-xs text-gray-600">Cute</div>
                  </div>
                  <div className="w-16">
                    <div className="w-12 h-12 mx-auto rounded-full bg-secondary-500 mb-1 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-white"></div>
                    </div>
                    <div className="text-center text-xs text-gray-600">Anime</div>
                  </div>
                  <div className="w-16">
                    <div className="w-12 h-12 mx-auto rounded-full bg-accent mb-1 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-white"></div>
                    </div>
                    <div className="text-center text-xs text-gray-600">Comic</div>
                  </div>
                  <div className="w-16">
                    <div className="w-12 h-12 mx-auto rounded-full bg-accent2 mb-1 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-white"></div>
                    </div>
                    <div className="text-center text-xs text-gray-600">Pixel</div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-secondary-500 rounded-full opacity-20"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-accent rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
        
        {/* Feature 3: Animation */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 md:pr-12 mb-10 md:mb-0">
            <div className="bg-light rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-accent/20 rounded-full"></div>
              <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-primary-500/10 rounded-full"></div>
              
              <div className="relative">
                <span className="inline-block bg-accent text-dark text-sm font-bold px-3 py-1 rounded-full mb-4">Step 3</span>
                <h3 className="text-3xl font-chewy text-dark mb-4">Kling AI Animation</h3>
                <p className="text-gray-600 mb-6">
                  Bring your cartoon character to life with our Kling AI technology that adds natural, customizable animations.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-dark text-xs font-bold">✓</span>
                    </div>
                    <span className="ml-2 text-gray-700">Library of animations: waving, talking, dancing & more</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-dark text-xs font-bold">✓</span>
                    </div>
                    <span className="ml-2 text-gray-700">Smooth, natural movement patterns</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-dark text-xs font-bold">✓</span>
                    </div>
                    <span className="ml-2 text-gray-700">Export as GIF, MP4 or WebM for any platform</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="relative">
              {/* Main image - animation control panel */}
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="border-b border-gray-200 py-3 px-4 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <div className="mx-auto text-sm text-gray-500">Animation Panel</div>
                </div>
                
                <div className="p-6 bg-gray-50">
                  {/* Animation preview area */}
                  <div className="bg-gray-200 rounded-lg h-48 mb-4 flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full bg-accent animate-bounce">
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-white flex flex-col items-center justify-center">
                          <div className="flex gap-3 mb-2">
                            <div className="w-3 h-3 rounded-full bg-dark"></div>
                            <div className="w-3 h-3 rounded-full bg-dark"></div>
                          </div>
                          <div className="w-6 h-3 bg-dark rounded-b-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Animation controls */}
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">Animation Style</div>
                    <div className="flex space-x-2 mb-4">
                      <button className="px-3 py-1 bg-primary-500 text-white text-xs rounded-full">Wave</button>
                      <button className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">Jump</button>
                      <button className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">Dance</button>
                      <button className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">Talk</button>
                      <button className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">Wink</button>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                      <span>Animation Speed</span>
                      <span>1.0x</span>
                    </div>
                    <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                  </div>
                  
                  {/* Export options */}
                  <div className="flex justify-between">
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded text-sm font-medium">Preview</button>
                    <button className="px-4 py-2 bg-accent text-dark rounded text-sm font-medium">Export Animation</button>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent2 rounded-full opacity-20"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-accent rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl md:text-3xl font-chewy text-dark mb-6">Ready to Create Your Animated Character?</h3>
          <button className="px-8 py-4 bg-primary-500 text-white font-chewy text-xl rounded-full shadow-lg hover:-translate-y-1 transform transition duration-200">
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;