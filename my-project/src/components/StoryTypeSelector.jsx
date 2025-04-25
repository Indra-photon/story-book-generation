// components/story/StoryTypeSelector.jsx
import React, { useState } from 'react';
import { ArrowRight, Rocket, Book, Star, Moon, Lightbulb } from 'lucide-react';

const StoryTypeSelector = ({ onSelect }) => {
  const [selectedType, setSelectedType] = useState('');
  const [customType, setCustomType] = useState('');

  // Story type options with icons
  const storyTypes = [
    { id: 'adventure', label: 'Adventure', icon: <Rocket size={24} /> },
    { id: 'educational', label: 'Educational', icon: <Lightbulb size={24} /> },
    { id: 'fantasy', label: 'Fantasy', icon: <Star size={24} /> },
    { id: 'bedtime', label: 'Bedtime', icon: <Moon size={24} /> },
    { id: 'fable', label: 'Fable/Moral', icon: <Book size={24} /> }
  ];

  // Handle selection of a story type
  const handleTypeSelect = (typeId) => {
    setSelectedType(typeId);
    setCustomType('');
  };

  // Handle custom type input
  const handleCustomTypeChange = (e) => {
    setCustomType(e.target.value);
    setSelectedType('custom');
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const finalType = selectedType === 'custom' ? customType : selectedType;
    
    if (!finalType) {
      alert('Please select a story type or enter a custom one.');
      return;
    }
    
    onSelect(finalType);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-chewy text-dark mb-6">Type of your story</h2>
      
      <p className="text-gray-600 max-w-3xl mx-auto mb-8">
        Choose the type of story you want to create. This will help our AI craft the perfect narrative structure 
        and themes for your story.
      </p>
      
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {storyTypes.map((type) => (
            <div
              key={type.id}
              className={`p-4 rounded-xl border-2 cursor-pointer transition ${
                selectedType === type.id 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleTypeSelect(type.id)}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                  selectedType === type.id 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {type.icon}
                </div>
                <h3 className="font-bold text-dark">{type.label}</h3>
              </div>
            </div>
          ))}
          
          <div
            className={`p-4 rounded-xl border-2 cursor-pointer transition ${
              selectedType === 'custom' 
                ? 'border-primary-500 bg-primary-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedType('custom')}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                selectedType === 'custom' 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-gray-100 text-gray-500'
              }`}>
                <span className="text-xl font-bold">+</span>
              </div>
              <h3 className="font-bold text-dark">Custom</h3>
            </div>
          </div>
        </div>
        
        {selectedType === 'custom' && (
          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-2">Enter Custom Story Type</label>
            <input
              type="text"
              value={customType}
              onChange={handleCustomTypeChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g., Mystery, Superhero, Historical"
            />
          </div>
        )}
        
        <div className="bg-gray-50 rounded-lg p-4 mb-8">
          <h3 className="font-bold text-dark mb-2">What to expect:</h3>
          <ul className="text-gray-600 space-y-2">
            <li>• Your story will have 7-10 scenes</li>
            <li>• Each scene will include custom illustrations</li>
            <li>• The story will be generated based on your selections</li>
            <li>• You'll be able to edit and customize the final result</li>
          </ul>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-primary-500 text-white font-bold rounded-full hover:bg-primary-600 transition flex items-center"
            disabled={!selectedType}
          >
            Generate Your Story
            <ArrowRight size={18} className="ml-2" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default StoryTypeSelector;