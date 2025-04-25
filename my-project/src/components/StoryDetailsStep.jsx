// // components/StoryDetailsStep.jsx
// import React, { useState } from 'react';
// import { BookOpen, ArrowRight, Lightbulb } from 'lucide-react';

// const StoryDetailsStep = ({ handleNextStep }) => {
//   const [storyDetails, setStoryDetails] = useState({
//     title: '',
//     ageGroup: '3-6',
//     theme: '',
//     storyType: 'adventure',
//     length: 'short',
//     description: '',
//   });

//   const [isGenerating, setIsGenerating] = useState(false);

//   // Story themes
//   const themes = [
//     'Adventure', 'Friendship', 'Learning', 'Nature', 
//     'Family', 'Animals', 'Magic', 'Space', 'Ocean'
//   ];

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setStoryDetails({
//       ...storyDetails,
//       [name]: value
//     });
//   };

//   // Generate story ideas - this would connect to an AI service in production
//   const generateStoryIdea = () => {
//     setIsGenerating(true);
    
//     // Simulate AI generation
//     setTimeout(() => {
//       const generatedIdeas = [
//         "A friendly dolphin who helps lost sea creatures find their way home",
//         "A shy star that learns to shine brightly with the help of friends",
//         "Two siblings discover a magical treehouse that takes them on adventures",
//         "A little robot who learns about human emotions"
//       ];
      
//       const idea = generatedIdeas[Math.floor(Math.random() * generatedIdeas.length)];
      
//       setStoryDetails({
//         ...storyDetails,
//         description: idea
//       });
      
//       setIsGenerating(false);
//     }, 1500);
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-6">
//       <h2 className="text-2xl font-chewy text-dark mb-6">Tell Us About Your Story</h2>
      
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//         <div>
//           <div className="space-y-4 mb-6">
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Story Title</label>
//               <input 
//                 type="text"
//                 name="title"
//                 value={storyDetails.title}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
//                 placeholder="Enter a title for your story"
//               />
//             </div>
            
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Target Age Group</label>
//               <select 
//                 name="ageGroup"
//                 value={storyDetails.ageGroup}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
//               >
//                 <option value="0-3">Toddlers (0-3 years)</option>
//                 <option value="3-6">Preschoolers (3-6 years)</option>
//                 <option value="6-9">Early Elementary (6-9 years)</option>
//                 <option value="9-12">Late Elementary (9-12 years)</option>
//               </select>
//             </div>
            
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Story Theme</label>
//               <div className="grid grid-cols-3 gap-2 mb-2">
//                 {themes.map((theme) => (
//                   <button
//                     key={theme}
//                     type="button"
//                     className={`p-2 text-center text-sm rounded-lg transition ${
//                       storyDetails.theme === theme
//                         ? 'bg-primary-500 text-white'
//                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                     }`}
//                     onClick={() => setStoryDetails({...storyDetails, theme})}
//                   >
//                     {theme}
//                   </button>
//                 ))}
//               </div>
//               <input 
//                 type="text"
//                 name="theme"
//                 value={storyDetails.theme}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
//                 placeholder="Or enter custom theme"
//               />
//             </div>
            
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Story Type</label>
//               <select 
//                 name="storyType"
//                 value={storyDetails.storyType}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
//               >
//                 <option value="adventure">Adventure Story</option>
//                 <option value="educational">Educational Story</option>
//                 <option value="bedtime">Bedtime Story</option>
//                 <option value="fable">Fable with Moral</option>
//                 <option value="fantasy">Fantasy Story</option>
//               </select>
//             </div>
            
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Story Length</label>
//               <select 
//                 name="length"
//                 value={storyDetails.length}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
//               >
//                 <option value="short">Short (3-5 minutes)</option>
//                 <option value="medium">Medium (5-10 minutes)</option>
//                 <option value="long">Long (10-15 minutes)</option>
//               </select>
//             </div>
//           </div>
//         </div>
        
//         <div>
//           <div className="bg-light rounded-lg p-6 mb-6">
//             <div className="flex items-start mb-4">
//               <BookOpen size={24} className="text-primary-500 mr-3 mt-1 flex-shrink-0" />
//               <div>
//                 <h3 className="font-bold text-dark mb-1">Story Description</h3>
//                 <p className="text-gray-600 text-sm mb-4">
//                   Describe what your story is about. This will help our AI generate characters and scenes that fit your narrative.
//                 </p>
//               </div>
//             </div>
            
//             <textarea
//               name="description"
//               value={storyDetails.description}
//               onChange={handleInputChange}
//               rows={6}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
//               placeholder="Once upon a time..."
//             ></textarea>
            
//             <div className="flex justify-end mt-2">
//               <button
//                 onClick={generateStoryIdea}
//                 disabled={isGenerating}
//                 className="flex items-center text-primary-500 hover:text-primary-600 text-sm font-medium"
//               >
//                 {isGenerating ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Generating idea...
//                   </>
//                 ) : (
//                   <>
//                     <Lightbulb size={16} className="mr-1" />
//                     Generate story idea
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
          
//           <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 mb-6">
//             <h4 className="flex items-center text-primary-700 font-bold mb-2">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               Tips for Great Stories
//             </h4>
//             <ul className="text-sm text-primary-700 space-y-1">
//               <li>• Include relatable characters that children can identify with</li>
//               <li>• Create a clear beginning, middle, and end</li>
//               <li>• Include a positive message or lesson</li>
//               <li>• Use simple language appropriate for your target age group</li>
//             </ul>
//           </div>
          
//           <div className="mt-6">
//             <button
//               onClick={handleNextStep}
//               className="w-full py-3 rounded-full font-bold bg-primary-500 text-white hover:bg-primary-600 transition flex items-center justify-center"
//             >
//               Continue to Character Selection
//               <ArrowRight size={18} className="ml-2" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StoryDetailsStep;
// components/StoryDetailsStep.jsx
import React, { useState } from 'react';
import { BookOpen, ArrowRight, Lightbulb } from 'lucide-react';

const StoryDetailsStep = ({ storyDetails, setStoryDetails, handleNextStep }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  // Story themes
  const themes = [
    'Adventure', 'Friendship', 'Learning', 'Nature', 
    'Family', 'Animals', 'Magic', 'Space', 'Ocean'
  ];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStoryDetails({
      ...storyDetails,
      [name]: value
    });
  };

  // Generate story ideas - this would connect to an AI service in production
  const generateStoryIdea = () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const generatedIdeas = [
        "A friendly dolphin who helps lost sea creatures find their way home",
        "A shy star that learns to shine brightly with the help of friends",
        "Two siblings discover a magical treehouse that takes them on adventures",
        "A little robot who learns about human emotions"
      ];
      
      const idea = generatedIdeas[Math.floor(Math.random() * generatedIdeas.length)];
      
      setStoryDetails({
        ...storyDetails,
        description: idea
      });
      
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-chewy text-dark mb-6">Tell Us About Your Story</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Story Title</label>
              <input 
                type="text"
                name="title"
                value={storyDetails.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter a title for your story"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Target Age Group</label>
              <select 
                name="ageGroup"
                value={storyDetails.ageGroup}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="0-3">Toddlers (0-3 years)</option>
                <option value="3-6">Preschoolers (3-6 years)</option>
                <option value="6-9">Early Elementary (6-9 years)</option>
                <option value="9-12">Late Elementary (9-12 years)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Story Theme</label>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {themes.map((theme) => (
                  <button
                    key={theme}
                    type="button"
                    className={`p-2 text-center text-sm rounded-lg transition ${
                      storyDetails.theme === theme
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setStoryDetails({...storyDetails, theme})}
                  >
                    {theme}
                  </button>
                ))}
              </div>
              <input 
                type="text"
                name="theme"
                value={storyDetails.theme}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Or enter custom theme"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Story Type</label>
              <select 
                name="storyType"
                value={storyDetails.storyType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="adventure">Adventure Story</option>
                <option value="educational">Educational Story</option>
                <option value="bedtime">Bedtime Story</option>
                <option value="fable">Fable with Moral</option>
                <option value="fantasy">Fantasy Story</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Story Length</label>
              <select 
                name="length"
                value={storyDetails.length}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="short">Short (3-5 minutes)</option>
                <option value="medium">Medium (5-10 minutes)</option>
                <option value="long">Long (10-15 minutes)</option>
              </select>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-light rounded-lg p-6 mb-6">
            <div className="flex items-start mb-4">
              <BookOpen size={24} className="text-primary-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-dark mb-1">Story Description</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Describe what your story is about. This will help our AI generate characters and scenes that fit your narrative.
                </p>
              </div>
            </div>
            
            <textarea
              name="description"
              value={storyDetails.description}
              onChange={handleInputChange}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              placeholder="Once upon a time..."
            ></textarea>
            
            <div className="flex justify-end mt-2">
              <button
                onClick={generateStoryIdea}
                disabled={isGenerating}
                className="flex items-center text-primary-500 hover:text-primary-600 text-sm font-medium"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating idea...
                  </>
                ) : (
                  <>
                    <Lightbulb size={16} className="mr-1" />
                    Generate story idea
                  </>
                )}
              </button>
            </div>
          </div>
          
          <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 mb-6">
            <h4 className="flex items-center text-primary-700 font-bold mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Tips for Great Stories
            </h4>
            <ul className="text-sm text-primary-700 space-y-1">
              <li>• Include relatable characters that children can identify with</li>
              <li>• Create a clear beginning, middle, and end</li>
              <li>• Include a positive message or lesson</li>
              <li>• Use simple language appropriate for your target age group</li>
            </ul>
          </div>
          
          <div className="mt-6">
            <button
              onClick={handleNextStep}
              className="w-full py-3 rounded-full font-bold bg-primary-500 text-white hover:bg-primary-600 transition flex items-center justify-center"
              disabled={!storyDetails.title || !storyDetails.description}
            >
              Continue to Character Selection
              <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetailsStep;