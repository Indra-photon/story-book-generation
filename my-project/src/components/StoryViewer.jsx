import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import StoryCanvas from '../components/StoryCanvas';
import { ArrowLeft } from 'lucide-react';

const StoryViewer = () => {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [story, setStory] = useState(null);
  const [scenes, setScenes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStoryData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/stories/get-story/${storyId}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        
        if (response.data.success) {
          const storyData = response.data.data;
          
          // Format story data to match StoryCanvas expectations
          const formattedStory = {
            _id: storyData._id,
            title: storyData.title,
            introduction: storyData.introduction,
            conclusion: storyData.conclusion,
            storyType: storyData.storyType,
            ageGroup: storyData.ageGroup,
            mainCharacter: storyData.characters?.[0] || null,
            coverPageImage: storyData.coverPage?.imageUrl,
            endPageImage: storyData.endPage?.imageUrl,
            coverPage: storyData.coverPage,
            endPage: storyData.endPage
          };
          
          setStory(formattedStory);
          
          // Format scenes to match StoryCanvas expectations
          if (storyData.scenes && Array.isArray(storyData.scenes)) {
            const sortedScenes = [...storyData.scenes].sort((a, b) => (a.order || 0) - (b.order || 0));
            const formattedScenes = sortedScenes.map(scene => ({
              id: scene._id,
              _id: scene._id,
              title: scene.title,
              text: scene.text,
              image: scene.imageUrl,
              visualDescription: scene.visualDescription,
              order: scene.order
            }));
            
            setScenes(formattedScenes);
          }
          
          setLoading(false);
        } else {
          throw new Error("Failed to fetch story data");
        }
      } catch (err) {
        console.error('Error fetching story:', err);
        setError('Failed to load story. Please try again.');
        setLoading(false);
      }
    };
    
    if (storyId) {
      fetchStoryData();
    }
  }, [storyId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-light py-20 px-4 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-light py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-50 text-red-600 p-6 rounded-lg">
            <p>{error}</p>
            <button 
              onClick={() => navigate('/profile')}
              className="mt-4 bg-primary-500 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <ArrowLeft className="mr-2" size={16} />
              Back to Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light pt-20">
      {story && scenes && (
        <StoryCanvas story={story} scenes={scenes} />
      )}
    </div>
  );
};

export default StoryViewer;