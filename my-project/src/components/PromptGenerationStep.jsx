// steps/PromptGenerationStep.jsx
import React, {useState } from 'react';
import { Camera, Wand2, ArrowRight } from 'lucide-react';
import axios from 'axios';

const PromptGenerationStep = ({
  portraitImage,
  setPortraitImage,
  portraitPreview,
  setPortraitPreview,
  userData,
  setUserData,
  generatedPrompt,
  setGeneratedPrompt,
  isGenerating,
  setIsGenerating,
  handleNextStep
}) => {
  // Form state
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [appearance, setAppearance] = useState('');
  const [personality, setPersonality] = useState('');
  const [expressions, setExpressions] = useState('');
  const [action, setAction] = useState(''); // New field for action
  const [speechBubble, setSpeechBubble] = useState(''); // New field for speech bubble

  const handlePortraitUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPortraitImage(file);  // This stores the actual file object
      const reader = new FileReader();
      reader.onloadend = () => {
        setPortraitPreview(reader.result);  // This stores the preview URL
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  // Generate prompt using AI
  const generatePrompt = async ({name, age, gender, appearance, personality, expressions, action, speechBubble}) => {
    // Validation
    if (!portraitImage) {
      alert("Please upload a portrait image");
      return;
    }
    
    if (!name || !age || !gender || !appearance || !personality || !expressions) {
      alert("Please fill in all required fields");
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Create FormData object to send the file and form data
      const formData = new FormData();
      formData.append('name', name);
      formData.append('age', age);
      formData.append('gender', gender);
      formData.append('appearance', appearance);
      formData.append('personality', personality);
      formData.append('expressions', expressions);
      formData.append('action', action); // Add new action field
      formData.append('speechBubble', speechBubble); // Add new speech bubble field
      formData.append('portrait', portraitImage);
      
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/character/generate-prompt`, 
        formData,
        {
          withCredentials: true // For JWT authentication
        }
      );
      
      // Update the generated prompt from the response
      setGeneratedPrompt(response.data.data.generatedPrompt);
      setIsGenerating(false);
    } catch (error) {
      console.error("Error generating prompt:", error);
      alert("Failed to generate prompt. Please try again.");
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col space-y-10">
      {/* First row - Upload Portrait & Details */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-chewy text-dark mb-6">Upload Portrait & Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Portrait upload section */}
          <div className="md:col-span-1">
            <label className="block text-gray-700 font-medium mb-2">Portrait Photo</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center h-4/5">
              {portraitPreview ? (
                <div className="relative">
                  <img 
                    src={portraitPreview} 
                    alt="Portrait preview" 
                    className="max-h-64 mx-auto rounded"
                  />
                  <button 
                    onClick={() => {
                      setPortraitImage(null);
                      setPortraitPreview('');
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <>
                  <Camera size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500 mb-2">Drag and drop your portrait here, or</p>
                  <label className="inline-block bg-primary-500 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-primary-600 transition">
                    Browse Files
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden"
                      onChange={handlePortraitUpload}
                    />
                  </label>
                </>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              For best results, use a clear front-facing portrait with good lighting.
            </p>
          </div>

          {/* Basic details section */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                <input 
                  id='name'
                  type="text"
                  name="name"
                  autoComplete='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Character name"
                />
              </div>
              
              <div>
                <label htmlFor='age' className="block text-gray-700 font-medium mb-2">Age</label>
                <input 
                  id='age'
                  type="number"
                  name="age"
                  autoComplete='age'
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Age"
                  min="1"
                  max="120"
                />
              </div>
              
              <div>
                <label htmlFor='gender' className="block text-gray-700 font-medium mb-2">Gender</label>
                <select 
                  id='gender'
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor='appearance' className="block text-gray-700 font-medium mb-2">Appearance</label>
                <textarea 
                  id='appearance'
                  name="appearance"
                  autoComplete='appearance'
                  value={appearance}
                  onChange={(e) => setAppearance(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Describe the character's appearance"
                  rows="2"
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">
                  Example: A small, white bunny with large ears, bright eyes, a fluffy tail, and a red scarf around his neck.
                </p>
              </div>

              <div>
                <label htmlFor='personality' className="block text-gray-700 font-medium mb-2">Personality</label>
                <textarea 
                  id='personality'
                  name="personality"
                  autoComplete='personality'
                  value={personality}
                  onChange={(e) => setPersonality(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Describe the character's personality traits"
                  rows="2"
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">
                  Example: Curious, kind, brave, and determined. Loves to help others.
                </p>
              </div>

              <div>
                <label htmlFor='expressions' className="block text-gray-700 font-medium mb-2">Expressions</label>
                <textarea 
                  id='expressions'
                  name="expressions"
                  autoComplete='expressions'
                  value={expressions}
                  onChange={(e) => setExpressions(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Describe the character's facial expressions"
                  rows="2"
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">
                  Example: Wide-eyed excitement, determination, concern, and joy.
                </p>
              </div>
              
              <div>
                <label htmlFor='action' className="block text-gray-700 font-medium mb-2">Action</label>
                <textarea 
                  id='action'
                  name="action"
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Describe what action the character is performing"
                  rows="2"
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">
                  Example: Sitting by his window, gazing up with excitement. His ears perk up when he sees the star fall. He looks determined when he decides to help.
                </p>
              </div>
              
              <div>
                <label htmlFor='speechBubble' className="block text-gray-700 font-medium mb-2">Speech Bubble</label>
                <textarea 
                  id='speechBubble'
                  name="speechBubble"
                  value={speechBubble}
                  onChange={(e) => setSpeechBubble(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="What is the character saying?"
                  rows="2"
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">
                  Example: "Oh no! A star just fell from the sky!" "I must find it and help it shine again!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second row - Character Prompt */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-chewy text-dark mb-6">Character Prompt</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex-grow mb-6">
            {generatedPrompt ? (
              <div className="bg-gray-50 p-4 rounded-lg h-full">
                <h3 className="text-lg font-bold text-dark mb-2">Generated Prompt:</h3>
                <p className="text-gray-700">{generatedPrompt}</p>
                
                <div className="mt-4 flex justify-end">
                  <button 
                    onClick={() => navigator.clipboard.writeText(generatedPrompt)}
                    className="text-primary-500 hover:text-primary-600 text-sm flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copy to clipboard
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 p-6 rounded-lg h-full flex flex-col items-center justify-center text-center">
                <Wand2 size={48} className="text-gray-400 mb-4" />
                <p className="text-gray-500 mb-2">
                  Fill in your details and upload a portrait to generate a customized prompt for your animated character.
                </p>
              </div>
            )}
          </div>
          
          <div className="flex flex-col justify-center">
            <button 
              onClick={() => generatePrompt({name, age, gender, appearance, personality, expressions, action, speechBubble})}
              disabled={isGenerating || !portraitImage || !name || !age || !gender || !appearance || !personality || !expressions}
              className={`w-full py-3 rounded-full font-bold flex items-center justify-center mb-4 ${
                (isGenerating || !portraitImage || !name || !age || !gender || !appearance || !personality || !expressions) 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-accent text-dark hover:bg-accent/90 transition'
              }`}
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Prompt...
                </>
              ) : generatedPrompt ? (
                'Regenerate Prompt'
              ) : (
                <>
                  <Wand2 size={18} className="mr-2" />
                  Generate Prompt
                </>
              )}
            </button>
            
            {generatedPrompt && (
              <button 
                onClick={handleNextStep}
                className="w-full py-3 rounded-full font-bold bg-primary-500 text-white hover:bg-primary-600 transition flex items-center justify-center"
              >
                Continue to Character Generation
                <ArrowRight size={18} className="ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptGenerationStep;