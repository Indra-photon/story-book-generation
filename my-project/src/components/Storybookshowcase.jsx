import React, { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import  pic1 from "../../public/showcase1.jpg"
import  pic2 from "../../public/showcase2.jpg"
import  pic3 from "../../public/showcase3.jpg"
import  pic4 from "../../public/showcase4.jpg"
import  pic5 from "../../public/showcase5.jpg"
import  pic6 from "../../public/showcase6.jpg"
import  pic7 from "../../public/showcase7.jpg"
import { Link } from 'react-router-dom';

// Import sample storybook cover images
// You'll need to replace these with your actual storybook cover images
const storybookCovers = [
  { id: 1, title: "The Magic Forest Adventure", image: pic1 },
  { id: 2, title: "Space Explorer Journey", image: pic2 },
  { id: 3, title: "Underwater Kingdom", image: pic3 },
  { id: 4, title: "Dragon's Treasure Hunt", image: pic4 },
  { id: 5, title: "Fairy Tale Dreams", image: pic5 },
  { id: 6, title: "Superhero Mission", image: pic6 },
  { id: 7, title: "Dinosaur Adventures", image: pic7},
];

const StorybookShowcase = () => {
  const carouselRef = useRef(null);
  
  // Auto-scroll function
  useEffect(() => {
    const carousel = carouselRef.current;
    let scrollInterval;
    
    // Start auto-scrolling
    const startScroll = () => {
      scrollInterval = setInterval(() => {
        if (carousel) {
          carousel.scrollLeft += 2; // Slow scroll speed
          
          // Reset to beginning when end is reached
          if (carousel.scrollLeft >= (carousel.scrollWidth - carousel.clientWidth)) {
            carousel.scrollLeft = 0;
          }
        }
      }, 30);
    };
    
    // Pause auto-scrolling when user interacts
    const pauseScroll = () => {
      if (scrollInterval) {
        clearInterval(scrollInterval);
      }
    };
    
    // Resume auto-scrolling after interaction
    const resumeScroll = () => {
      pauseScroll();
      startScroll();
    };
    
    if (carousel) {
      startScroll();
      carousel.addEventListener('mouseenter', pauseScroll);
      carousel.addEventListener('mouseleave', resumeScroll);
      carousel.addEventListener('touchstart', pauseScroll, { passive: true });
      carousel.addEventListener('touchend', resumeScroll);
    }
    
    // Cleanup
    return () => {
      if (carousel) {
        pauseScroll();
        carousel.removeEventListener('mouseenter', pauseScroll);
        carousel.removeEventListener('mouseleave', resumeScroll);
        carousel.removeEventListener('touchstart', pauseScroll);
        carousel.removeEventListener('touchend', resumeScroll);
      }
    };
  }, []);
  
  // Scroll handlers for navigation buttons
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= 300;
    }
  };
  
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += 300;
    }
  };
  
  return (
    <section className="py-20 bg-gradient-primary overflow-hidden relative">
      {/* Decorative elements similar to hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute w-32 h-32 rounded-full bg-white/10 top-[30%] left-[10%] animate-float" />
        <div className="absolute w-24 h-24 rounded-full bg-white/10 bottom-[20%] left-[30%] animate-float animation-delay-1000" />
        <div className="absolute w-40 h-40 rounded-full bg-white/10 top-[60%] right-[15%] animate-float animation-delay-2000" />
      </div>
      
      {/* Section header */}
      <div className="container mx-auto px-4 mb-12 text-center">
        <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 text-black rounded-full text-lg font-bold mb-6 animate-pulse border-2 border-white/30">
          <Sparkles size={16} className="inline-block mr-2" />
          Magical Storybook Collection
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans leading-tight mb-6 text-white drop-shadow-[3px_3px_0px_rgba(61,29,140,1)]">
          Explore Our Enchanting Storybooks
        </h2>
        
        <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
          Each storybook is uniquely personalized with your child as the main character. 
          Browse through our magical collection of adventures!
        </p>
      </div>
      
      <div 
        ref={carouselRef}
        className="pb-8 overflow-x-scroll scroll-smooth"
        style={{ 
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',  /* Firefox */
            msOverflowStyle: 'none'   /* IE and Edge */
        }}
        >
        <style jsx>{`
            div::-webkit-scrollbar {
            display: none;
            }
        `}</style>
        <div className="flex gap-6 pl-8 pr-20 w-max">
            {storybookCovers.map((book) => (
            <div 
                key={book.id} 
                className="flex-shrink-0 w-60 md:w-72 transform hover:-translate-y-4 transition-transform duration-300 cursor-pointer"
            >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-300 border-4 border-white">
                <img 
                    src={book.image} 
                    alt={book.title} 
                    className="w-full h-80 md:h-96 object-cover"
                    // Fallback for missing images in development
                    onError={(e) => {
                    e.target.src = `https://via.placeholder.com/400x500/FF47DA/FFFFFF?text=${encodeURIComponent(book.title)}`;
                    }}
                />
                <div className="p-4 bg-gradient-to-r from-primary-400 to-secondary-400">
                    <h3 className="font-sans text-xl text-white drop-shadow-[1px_1px_0px_rgba(61,29,140,1)] text-center">
                    {book.title}
                    </h3>
                </div>
                </div>
            </div>
            ))}
        </div>
        </div>
      
      {/* CTA card */}
      <div className="container mx-auto px-4 mt-12">
        <div className="bg-white/10 backdrop-blur-sm border border-violet-100 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-white mb-6 md:mb-0 md:mr-8">
            <h3 className="text-2xl font-sans mb-2">Create Your Own Storybook Today!</h3>
            <p className="text-white/90">Transform your child's photo into a magical adventure in just a few clicks.</p>
          </div>
          
          <Link to='/signup'>
            <button className="bg-accent px-8 py-4 rounded-full text-lg font-sans text-dark shadow-button hover:-translate-y-1 transform transition duration-200 flex items-center whitespace-nowrap">
              <span>Get Started</span>
              <ChevronRight size={20} className="ml-2" />
            </button> 
          </Link>
        </div>
      </div>
      
      {/* Small decorative elements */}
      <div className="hidden md:block absolute bottom-12 left-8 w-24 h-24">
        <div className="absolute w-12 h-12 rounded-full bg-accent/50 animate-bounce" />
        <div className="absolute w-8 h-8 rounded-full bg-accent2/50 left-12 top-8 animate-bounce animation-delay-1000" />
      </div>
    </section>
  );
};

export default StorybookShowcase;