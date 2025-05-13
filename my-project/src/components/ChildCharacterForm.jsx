// components/story/ChildCharacterForm.jsx
import React, { useState } from 'react';
import { ArrowRight, Wand2 } from 'lucide-react';

const ChildCharacterForm = ({ onSubmit }) => {
  const [characterData, setCharacterData] = useState({
    name: '',
    age: '',
    gender: '',
    appearance: '',
    personality: ''
  });
  
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacterData({
      ...characterData,
      [name]: value
    });
  };
  
  // Generate character description using AI
  const generateDescription = () => {
    // Validate required fields
    if (!characterData.name || !characterData.age || !characterData.gender) {
      alert('Please fill in name, age, and gender before generating a description.');
      return;
    }
    
    setIsGenerating(true);
    
    // For now, we'll simulate the AI generation
    // In a real implementation, this would call an API endpoint
    setTimeout(() => {
      const generatedText = `${characterData.name} is a ${characterData.age}-year-old ${characterData.gender.toLowerCase()} with a vibrant personality and distinctive appearance. They have an infectious smile and bright, curious eyes that light up with excitement. ${characterData.name} loves adventures and making new friends, showing kindness and courage in all situations.`;
      
      setGeneratedDescription(generatedText);
      
      // Also update the form data with the generated description
      setCharacterData({
        ...characterData,
        appearance: characterData.appearance || 'Bright eyes, infectious smile, and a playful demeanor',
        personality: characterData.personality || 'Curious, kind, brave, and full of wonder'
      });
      
      setIsGenerating(false);
    }, 1500);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!characterData.name || !characterData.age || !characterData.gender) {
      alert('Please fill in at least the name, age, and gender fields.');
      return;
    }
    
    onSubmit(characterData);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-sans text-dark mb-6">Create your child's description</h2>
      
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={characterData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Child's name"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Age</label>
            <input
              type="number"
              name="age"
              value={characterData.age}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Child's age"
              min="1"
              max="15"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Gender</label>
            <select
              name="gender"
              value={characterData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
            </select>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Appearance</label>
          <textarea
            name="appearance"
            value={characterData.appearance}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Describe your child's appearance (hair color, eye color, etc.)"
            rows="3"
          ></textarea>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Personality</label>
          <textarea
            name="personality"
            value={characterData.personality}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Describe your child's personality traits"
            rows="3"
          ></textarea>
        </div>
        
        <div className="flex justify-center mb-8">
          <button
            type="button"
            onClick={generateDescription}
            disabled={isGenerating}
            className="flex items-center px-4 py-2 bg-accent text-dark font-medium rounded-lg hover:bg-accent/90 transition"
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <Wand2 size={18} className="mr-2" />
                Generate Character Description
              </>
            )}
          </button>
        </div>
        
        {generatedDescription && (
          <div className="mb-8 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-dark mb-2">Generated Description:</h3>
            <p className="text-gray-700">{generatedDescription}</p>
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(generatedDescription)}
                className="text-primary-500 text-sm hover:text-primary-600"
              >
                Copy to clipboard
              </button>
            </div>
          </div>
        )}
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-primary-500 text-white font-bold rounded-full hover:bg-primary-600 transition flex items-center"
          >
            Continue
            <ArrowRight size={18} className="ml-2" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChildCharacterForm;