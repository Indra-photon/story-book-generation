import React, { useState } from 'react';
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles, Check } from 'lucide-react';
import pic1 from '../../public/hero1.jpeg';
import pic2 from '../../public/hero2.jpeg';
import pic3 from '../../public/hero3.jpg';

const Hero = () => {
  const [characterColor, setCharacterColor] = useState('#FFCB2B');
  const navigate = useNavigate()
  
  const handleColorChange = (color) => {
    setCharacterColor(color);
  };
  
  return (
    <section className="relative min-h-screen bg-gradient-primary overflow-hidden pt-16">
      {/* Floating shapes for background animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-60 h-60 rounded-full bg-white/10 bottom-[50%] right-[10%] animate-float">
          <img src={pic1} alt="Floating Shape" className="w-full h-full object-cover rounded-full" />
        </div>
        <div className="absolute w-48 h-48 rounded-full bg-white/10 top-[20%] right-[25%] animate-float animation-delay-1000">
          <img src={pic2} alt="Floating Shape" className="w-full h-full object-cover rounded-full" />
        </div>
        <div className="absolute w-64 h-64 rounded-full bg-white/10 bottom-[30%] right-[20%] animate-float animation-delay-2000">
         <img src={pic3} alt="Floating Shape" className="w-full h-full object-cover rounded-full" />
        </div>
        <div className="absolute w-16 h-16 rounded-full bg-white/10 bottom-[15%] right-[25%] animate-float animation-delay-3000"/>
      </div>
      
      {/* Hero content */}
      <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Text content */}
        <div className="w-full md:w-1/2 text-white mb-12 md:mb-0">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 text-black rounded-full text-lg font-bold mb-6 animate-pulse border-2 border-white/30">
            <Sparkles size={16} className="inline-block mr-2" />
            AI-Powered Character & Story Creation
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans leading-tight mb-6 text-white drop-shadow-[3px_3px_0px_rgba(61,29,140,1)]">
            Create Magical Stories For Your Kids in Seconds
          </h1>
          
          <p className="text-xl mb-8 text-white/90">
            Transform your photos into stunning cartoon characters and create personalized storybooks with AI. No design skills needed — just upload and let the magic happen!
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mt-1">
                <Check size={14} className="text-dark font-bold" />
              </div>
              <span className="text-white/90">Create personalized storybooks featuring your child</span>
              
            </div>
            
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mt-1">
                <Check size={14} className="text-dark font-bold" />
              </div>
              <span className="text-white/90">Create Greetings Cards to your kids' birthday</span>
            </div>
            
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mt-1">
                <Check size={14} className="text-dark font-bold" />
              </div>
              <span className="text-white/90">Portrait-to-cartoon transformation for your kids</span>
            </div>
            
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mt-1">
                <Check size={14} className="text-dark font-bold" />
              </div>
              <span className="text-white/90">Download as high-quality images and PDF storybooks</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <Link to="/signup" className="bg-accent px-8 py-4 rounded-full text-lg font-sans text-dark shadow-button hover:-translate-y-1 transform transition duration-200 flex items-center font-semibold">
              <span>Start Creating for Free</span>
              <ChevronRight size={20} className="ml-2" />
            </Link>
            
            <Link to="/demo" className="flex items-center gap-2 text-white border-2 border-white/30 px-6 py-4 rounded-full hover:bg-white/10 transition">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 7L0 14V0L12 7Z" fill="#3D1D8C"/>
                </svg>
              </div>
              <span>Watch Demo</span>
            </Link>
          </div>
          
          <div className="text-sm text-white/70">
            <span className="font-medium text-white">Trusted by 10,000+ creators</span> • No credit card required
          </div>
        </div>
        
      </div>
      
      {/* Trust indicators - new section */}
      <div className="container mx-auto px-4 pb-12">
        <div className="bg-white/10 backdrop-blur-sm border border-violet-100 rounded-xl p-4 flex flex-wrap justify-center gap-8 md:gap-16 items-center">
          <div className="text-white text-center">
            <div className="font-bold text-2xl text-violet-950">3K+</div>
            <div className="text-sm text-white/80">Characters Created</div>
          </div>
          <div className="text-white text-center ">
            <div className="font-bold text-2xl text-violet-950">1.5K+</div>
            <div className="text-sm text-white/80">Stories Generated</div>
          </div>
          <div className="text-white text-center">
            <div className="font-bold text-2xl text-violet-950">4.8</div>
            <div className="text-sm text-white/80">Average Rating</div>
          </div>
          <div className="text-white text-center">
            <div className="font-bold text-2xl text-violet-950">18K+</div>
            <div className="text-sm text-white/80">Happy Users</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;