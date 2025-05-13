
// import React from 'react';
// import { motion } from 'framer-motion';
// import { Sparkles, Palette, PenTool, Wand2, Edit, Download } from 'lucide-react';
// import pic1 from '../../public/showcase4.jpg';
// import { Link } from 'react-router-dom';

// const FeaturesShowcase = () => {
//   // Feature data - only title and description
//   const features = [
//     {
//       icon: <Sparkles className="w-8 h-8 text-primary-500" />,
//       title: "Personalized Stories",
//       description: "Include your child's name, appearance, and preferences to make them the hero of their own adventure.",
//       color: "primary"
//     },
//     {
//       icon: <Palette className="w-8 h-8 text-secondary-500" />,
//       title: "Vibrant Illustrations",
//       description: "Every page features stunning, colorful illustrations that bring the story to life and capture your child's imagination.",
//       color: "secondary"
//     },
//     {
//       icon: <PenTool className="w-8 h-8 text-accent" />,
//       title: "Simple Story Creation",
//       description: "Our intuitive interface makes crafting beautiful storybooks easy - no writing or design skills needed.",
//       color: "accent"
//     },
//     {
//       icon: <Wand2 className="w-8 h-8 text-accent2" />,
//       title: "Themed Storybooks",
//       description: "Choose from a variety of exciting themes like space adventures, underwater journeys, fairy tales, and more.",
//       color: "accent2"
//     },
//     {
//       icon: <Edit className="w-8 h-8 text-primary-500" />,
//       title: "Easy Editing & Saving",
//       description: "Make changes anytime, save multiple versions, and revisit your creations whenever you want.",
//       color: "primary"
//     },
//     {
//       icon: <Download className="w-8 h-8 text-secondary-500" />,
//       title: "Multiple Formats",
//       description: "Download your storybooks as digital PDFs or order professional printed copies delivered to your door.",
//       color: "secondary"
//     }
//   ];

//   // Animation variants for container
//   const containerVariants = {
//     hidden: {},
//     visible: {
//       transition: {
//         staggerChildren: 0.15, // Delay between each card
//       },
//     },
//   };

//   // Animation variants for cards
//   const cardVariants = {
//     hidden: {
//       opacity: 0,
//       scale: 0,
//       rotate: -180,
//     },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       rotate: 0,
//       transition: {
//         type: "spring",
//         stiffness: 200,
//         damping: 20,
//         duration: 0.6,
//       },
//     },
//     hover: {
//       scale: 1.05,
//       rotate: [0, -5, 5, 0],
//       transition: {
//         rotate: {
//           duration: 0.5,
//           ease: "easeInOut",
//         },
//         scale: {
//           duration: 0.2,
//         },
//       },
//     },
//   };

//   // Animation variants for icon pop
//   const iconVariants = {
//     hidden: {
//       scale: 0,
//     },
//     visible: {
//       scale: 1,
//       transition: {
//         type: "spring",
//         stiffness: 500,
//         damping: 15,
//         delay: 0.3,
//       },
//     },
//     bounce: {
//       scale: [1, 1.2, 0.9, 1.1, 1],
//       transition: {
//         duration: 0.6,
//         ease: "easeInOut",
//       },
//     },
//   };

//   return (
//     <section className="py-20 bg-gradient-primary overflow-hidden relative">
//       {/* Decorative background elements */}
//       <motion.div 
//         initial={{ opacity: 0, scale: 0 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 1 }}
//         className="absolute top-0 left-0 w-64 h-64 rounded-full bg-primary-300/20 -translate-x-1/2 -translate-y-1/2"
//       />
//       <motion.div 
//         initial={{ opacity: 0, scale: 0 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 1, delay: 0.2 }}
//         className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-secondary-300/20 translate-x-1/3 translate-y-1/3"
//       />
//       <motion.div 
//         initial={{ opacity: 0, scale: 0 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 1, delay: 0.4 }}
//         className="absolute top-1/2 right-20 w-20 h-20 rounded-full bg-accent/20"
//       />
//       <motion.div 
//         initial={{ opacity: 0, scale: 0 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 1, delay: 0.6 }}
//         className="absolute bottom-1/4 left-20 w-16 h-16 rounded-full bg-accent2/20"
//       />
      
//       <div className="container mx-auto px-4 relative z-10">
//         {/* Section header */}
//         <motion.div 
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <motion.div 
//             initial={{ scale: 0, rotate: -180 }}
//             animate={{ scale: 1, rotate: 0 }}
//             transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
//             className="inline-block bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full text-lg font-bold mb-6 border-2 border-primary-100"
//           >
//             <Sparkles size={16} className="inline-block mr-2 text-primary-500" />
//             Magical Storybook Features
//           </motion.div>
          
//           <motion.h2 
//             initial={{ opacity: 0, scale: 0.5 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.6, delay: 0.5 }}
//             className="text-4xl md:text-5xl font-sans text-dark mb-4 drop-shadow-[2px_2px_0px_rgba(61,29,140,0.3)]"
//           >
//             Create Enchanting Stories With Ease
//           </motion.h2>
          
//           <motion.p 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.7 }}
//             className="text-xl max-w-3xl mx-auto text-gray-600"
//           >
//             Our platform makes it simple to create personalized, vibrant storybooks that will delight your child and become treasured keepsakes.
//           </motion.p>
//         </motion.div>
        
//         {/* Features grid */}
//         <motion.div 
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
//         >
//           {features.map((feature, index) => (
//             <motion.div 
//               key={index}
//               variants={cardVariants}
//               whileHover="hover"
//               className="bg-white rounded-2xl shadow-lg p-6"
//             >
//               <motion.div 
//                 variants={iconVariants}
//                 initial="hidden"
//                 animate="visible"
//                 whileHover="bounce"
//                 className={`w-16 h-16 rounded-2xl bg-${feature.color}-100 flex items-center justify-center mb-6`}
//               >
//                 {feature.icon}
//               </motion.div>
              
//               <motion.h3 
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.4 + index * 0.1 }}
//                 className="text-2xl font-sans text-dark mb-3"
//               >
//                 {feature.title}
//               </motion.h3>
              
//               <motion.p 
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5 + index * 0.1 }}
//                 className="text-gray-600"
//               >
//                 {feature.description}
//               </motion.p>
//             </motion.div>
//           ))}
//         </motion.div>
        
       
        
//         {/* CTA */}
//         <motion.div 
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 2 }}
//           className="text-center"
//         >
//           <h3 className="text-2xl md:text-3xl font-sans text-dark mb-6">Ready to Create a Magical Storybook?</h3>
//           <Link to='/signup'>
//             <motion.button 
//               whileHover={{ scale: 1.05, rotate: [-1, 1, -1, 0] }}
//               whileTap={{ scale: 0.95 }}
//               className="px-8 py-4 bg-accent text-dark font-sans text-xl rounded-full shadow-button transform transition duration-200"
//             >
//               Start Creating Now
//             </motion.button>
//           </Link>
//           <p className="mt-4 text-white">No design skills needed — just bring your imagination!</p>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default FeaturesShowcase;

// FeaturesShowcase.jsx - Modified with advanced Framer Motion animations
import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Sparkles, Palette, PenTool, Wand2, Edit, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturesShowcase = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Feature data - only title and description
  const features = [
    {
      icon: <Sparkles className="w-8 h-8 text-primary-500" />,
      title: "Personalized Stories",
      description: "Include your child's name, appearance, and preferences to make them the hero of their own adventure.",
      color: "primary"
    },
    {
      icon: <Palette className="w-8 h-8 text-secondary-500" />,
      title: "Vibrant Illustrations",
      description: "Every page features stunning, colorful illustrations that bring the story to life and capture your child's imagination.",
      color: "secondary"
    },
    {
      icon: <PenTool className="w-8 h-8 text-accent" />,
      title: "Simple Story Creation",
      description: "Our intuitive interface makes crafting beautiful storybooks easy - no writing or design skills needed.",
      color: "accent"
    },
    {
      icon: <Wand2 className="w-8 h-8 text-accent2" />,
      title: "Themed Storybooks",
      description: "Choose from a variety of exciting themes like space adventures, underwater journeys, fairy tales, and more.",
      color: "accent2"
    },
    {
      icon: <Edit className="w-8 h-8 text-primary-500" />,
      title: "Easy Editing & Saving",
      description: "Make changes anytime, save multiple versions, and revisit your creations whenever you want.",
      color: "primary"
    },
    {
      icon: <Download className="w-8 h-8 text-secondary-500" />,
      title: "Multiple Formats",
      description: "Download your storybooks as digital PDFs or order professional printed copies delivered to your door.",
      color: "secondary"
    }
  ];

  // Calculate positions for cards coming from center
  const getCardPosition = (index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    
    // Calculate distance from center (viewport center)
    const centerX = 0;
    const centerY = 0;
    
    // Card positions relative to center
    const xPositions = [-1, 0, 1]; // left, center, right
    const yPositions = [-1, 1]; // top, bottom
    
    const targetX = xPositions[col] * 400; // 400px spacing
    const targetY = yPositions[row] * 300; // 300px spacing
    
    return {
      x: centerX - targetX,
      y: centerY - targetY,
    };
  };

  // Enhanced animation variants for container
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Enhanced animation variants for cards with center origin
  const cardVariants = (index) => ({
    hidden: {
      opacity: 0,
      scale: 0,
      x: getCardPosition(index).x,
      y: getCardPosition(index).y,
      rotate: Math.random() * 360 - 180,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8,
        delay: index * 0.1,
      },
    },
    hover: {
      scale: 1.05,
      rotate: [0, -5, 5, 0],
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: {
        rotate: {
          duration: 0.5,
          ease: "easeInOut",
        },
        scale: {
          duration: 0.2,
        },
      },
    },
  });

  // Enhanced icon animation
  const iconVariants = {
    hidden: {
      scale: 0,
      rotate: -180,
    },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
        delay: 0.5,
      },
    },
    bounce: {
      scale: [1, 1.3, 0.8, 1.1, 1],
      rotate: [0, 10, -10, 5, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  // Particle effect for background
  const particleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i) => ({
      opacity: [0, 1, 1, 0],
      scale: [0, 1, 1, 0],
      transition: {
        duration: 2,
        delay: i * 0.2,
        repeat: Infinity,
        repeatDelay: 3,
      },
    }),
  };

  return (
    <section className="py-20 bg-gradient-primary overflow-hidden relative" ref={ref}>
      {/* Animated particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={particleVariants}
          initial="hidden"
          animate="visible"
          className={`absolute w-4 h-4 rounded-full ${
            i % 2 === 0 ? 'bg-primary-300' : 'bg-secondary-300'
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Decorative background elements */}
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-64 h-64 rounded-full bg-primary-300/20 -translate-x-1/2 -translate-y-1/2"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-secondary-300/20 translate-x-1/3 translate-y-1/3"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="absolute top-1/2 right-20 w-20 h-20 rounded-full bg-accent/20"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-1/4 left-20 w-16 h-16 rounded-full bg-accent2/20"
      />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
            className="inline-block bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full text-lg font-bold mb-6 border-2 border-primary-100"
          >
            <Sparkles size={16} className="inline-block mr-2 text-primary-500" />
            Magical Storybook Features
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-4xl md:text-5xl font-sans leading-tight text-white drop-shadow-[3px_3px_0px_rgba(61,29,140,1)] mb-4"
          >
            Create Enchanting Stories With Ease
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-xl max-w-3xl mx-auto text-white/90"
          >
            Our platform makes it simple to create personalized, vibrant storybooks that will delight your child and become treasured keepsakes.
          </motion.p>
        </motion.div>
        
        {/* Features grid with center animation */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              custom={index}
              variants={cardVariants(index)}
              whileHover="hover"
              className="bg-white rounded-2xl shadow-lg p-6 relative"
            >
              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-400/20 to-secondary-400/20 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              <motion.div 
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                whileHover="bounce"
                className={`w-16 h-16 rounded-2xl bg-${feature.color}-100 flex items-center justify-center mb-6 relative z-10`}
              >
                {feature.icon}
              </motion.div>
              
              <motion.h3 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="text-2xl font-sans text-dark mb-3 relative z-10"
              >
                {feature.title}
              </motion.h3>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="text-gray-600 relative z-10"
              >
                {feature.description}
              </motion.p>
              
              {/* Animated corner decoration */}
              <motion.div
                className="absolute top-0 right-0 w-8 h-8"
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <div className={`w-full h-full bg-${feature.color}-200 rounded-sm`} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2 }}
          className="text-center"
        >
          <h3 className="text-2xl md:text-3xl font-sans text-dark mb-6">Ready to Create a Magical Storybook?</h3>
          <Link to='/signup'>
            <motion.button 
              whileHover={{ scale: 1.05, rotate: [-1, 1, -1, 0] }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-accent text-dark font-sans text-xl rounded-full shadow-button transform transition duration-200"
            >
              Start Creating Now
            </motion.button>
          </Link>
          <p className="mt-4 text-white">No design skills needed — just bring your imagination!</p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;