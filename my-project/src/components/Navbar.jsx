// // Navbar.jsx with Auth Status Awareness
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { User, LogOut } from 'lucide-react';
// import Container from '../common/Container';
// import {logout} from "../store/authSlice.js"
// import axios from 'axios'
// import { useDispatch } from 'react-redux'

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   const authStatus = useSelector((state) => state.auth.status);
  
//   const dispatch = useDispatch();
  
  
//   // Track scroll position to change navbar style when scrolled
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 10) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navItems = [
    
//     {
//       name: 'Features',
//       slug: "/features",
//       active: true,
//     },
//     {
//       name: 'Pricing',
//       slug: "/pricing",
//       active: true,
//     },
//     {
//       name: 'Gallery',
//       slug: "/gallery",
//       active: true,
//     },
//     {
//       name: 'Profile',
//       slug: "/your-profile",
//       active: authStatus,
//     }
//   ];

//   const Logout = async () => {
//     try {
//       const userResponse = await axios.post(
//         `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/users/logout`, 
//         {},
//         {
//           withCredentials: true, // This should be a config option, not in the body
//         }
//       );
//       if (userResponse) {
//         dispatch(logout());
//         navigate("/")
//       }
//     } catch (error) {
//       console.log(error);
//     };
//   }

//   const handleLogout = () => {
//     Logout()
//   }

//   return (
//     <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
//       <Container>
//         <div className="py-4 flex justify-between items-center">
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2">
//             <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-black font-bold">
//               S
//             </div>
//             <span className="text-2xl font-chewy text-black">StoryMorph</span>
//           </Link>
          
//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center gap-8">
//             {navItems.map((item) => 
//               item.active ? (
//                 <Link 
//                   key={item.name}
//                   to={item.slug} 
//                   className="font-semibold text-dark hover:text-primary-500 transition-colors"
//                 >
//                   {item.name}
//                 </Link>
//               ) : null
//             )}
//           </nav>
          
//           {/* Auth Buttons */}
//           <div className="hidden md:flex items-center gap-4">
//             {!authStatus ? (
//               // Not logged in - show login and signup buttons
//               <>
//                 <button 
//                   className="px-4 py-2 rounded-full border-2 border-dark font-semibold text-dark hover:bg-dark hover:text-white transition-colors"
//                   onClick={() => navigate('/login')}
//                 >
//                   Log In
//                 </button>
//                 {/* <button 
//                   className="px-4 py-2 rounded-full border-2 border-dark font-semibold text-dark hover:bg-dark hover:text-white transition-colors"
//                   onClick={() => navigate('/work-area')}
//                 >
//                   Dashboard
//                 </button> */}
//                 <button 
//                   className="px-4 py-2 rounded-full bg-accent font-semibold text-dark shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
//                   onClick={() => navigate('/signup')}
//                 >
//                   Sign Up
//                 </button>
//               </>
//             ) : (
//               // Logged in - show user avatar and logout button
//               <>
//                 <button 
//                   className="p-2 rounded-full border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white transition-colors"
//                   onClick={() => navigate('/profile')}
//                 >
//                   <User size={20} />
//                 </button>
//                 <button 
//                   className="px-4 py-2 rounded-full border-2 border-dark font-semibold text-dark hover:bg-dark hover:text-white transition-colors"
//                   onClick={() => navigate('/work-area')}
//                 >
//                   Dashboard
//                 </button>
//                 <button 
//                   className="px-4 py-2 rounded-full border-2 border-dark font-semibold text-dark hover:bg-dark hover:text-white transition-colors inline-flex items-center gap-2"
//                   onClick={handleLogout}
//                 >
//                   <LogOut size={18} />
//                   <span>Logout</span>
//                 </button>
//               </>
//             )}
//           </div>
          
//           {/* Mobile Menu Button */}
//           <button 
//             className="md:hidden text-dark"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             {mobileMenuOpen ? (
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             ) : (
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             )}
//           </button>
//         </div>
        
//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <div className="md:hidden bg-white shadow-lg">
//             <div className="py-4">
//               <nav className="flex flex-col gap-4">
//                 {navItems.map((item) => 
//                   item.active ? (
//                     <Link 
//                       key={item.name}
//                       to={item.slug} 
//                       className="font-semibold text-dark py-2 border-b border-gray-100 px-4"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       {item.name}
//                     </Link>
//                   ) : null
//                 )}
                
//                 <div className="flex flex-col gap-2 mt-2 px-4">
//                   {!authStatus ? (
//                     // Not logged in - show login and signup buttons
//                     <>
//                       <button 
//                         className="w-full py-2 rounded-full border-2 border-dark font-semibold text-dark"
//                         onClick={() => {
//                           setMobileMenuOpen(false);
//                           navigate('/login');
//                         }}
//                       >
//                         Log In
//                       </button>
//                       <button 
//                         className="w-full py-2 rounded-full bg-accent font-semibold text-dark shadow-md"
//                         onClick={() => {
//                           setMobileMenuOpen(false);
//                           navigate('/signup');
//                         }}
//                       >
//                         Sign Up
//                       </button>
//                     </>
//                   ) : (
//                     // Logged in - show logout button
//                     <button 
//                       className="w-full py-2 rounded-full border-2 border-dark font-semibold text-dark flex items-center justify-center gap-2"
//                       onClick={() => {
//                         setMobileMenuOpen(false);
//                         handleLogout();
//                       }}
//                     >
//                       <LogOut size={18} />
//                       <span>Logout</span>
//                     </button>
//                   )}
//                 </div>
//               </nav>
//             </div>
//           </div>
//         )}
//       </Container>
//     </header>
//   );
// };

// export default Navbar;

// Navbar.jsx with Auth Status Awareness
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { User, LogOut } from 'lucide-react';
import Container from '../common/Container';
import { logout } from "../store/authSlice.js"
import axios from 'axios'
import { useDispatch } from 'react-redux'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  
  const dispatch = useDispatch();
  
  // Track scroll position to change navbar style when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      name: 'Features',
      slug: "/features",
      active: true,
    },
    {
      name: 'Pricing',
      slug: "/pricing",
      active: true,
    },
    {
      name: 'Gallery',
      slug: "/gallery",
      active: true,
    },
    {
      name: 'Profile',
      slug: "/your-profile",
      active: authStatus,
    }
  ];

  const Logout = async () => {
    try {
      const userResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/users/logout`, 
        {},
        {
          withCredentials: true,
        }
      );
      
      if (userResponse) {
        dispatch(logout());
        navigate("/")
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, dispatch logout to clear frontend state
      dispatch(logout());
      navigate("/");
    }
  }

  // Modify your handleLogout function in Navbar.jsx
  const handleLogout = async () => {
    try {
      const userResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/users/logout`, 
        {},
        { withCredentials: true }
      );
      
      if (userResponse) {
        dispatch(logout());
        // Force navigation to home page after logout
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // Even if the API call fails, log the user out locally
      dispatch(logout());
      navigate("/");
    }
  }

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <Container>
        <div className="py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-black font-bold">
              S
            </div>
            <span className="text-2xl font-chewy text-black">StoryMorph</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => 
              item.active ? (
                <Link 
                  key={item.name}
                  to={item.slug} 
                  className="font-semibold text-dark hover:text-primary-500 transition-colors"
                >
                  {item.name}
                </Link>
              ) : null
            )}
          </nav>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {!authStatus ? (
              // Not logged in - show login and signup buttons
              <>
                <button 
                  className="px-4 py-2 rounded-full border-2 border-dark font-semibold text-dark hover:bg-dark hover:text-white transition-colors"
                  onClick={() => navigate('/login')}
                >
                  Log In
                </button>
                <button 
                  className="px-4 py-2 rounded-full bg-accent font-semibold text-dark shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </button>
              </>
            ) : (
              // Logged in - show user avatar and logout button
              <>
                <button 
                  className="p-2 rounded-full border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white transition-colors"
                  onClick={() => navigate('/profile')}
                >
                  <User size={20} />
                </button>
                <button 
                  className="px-4 py-2 rounded-full border-2 border-dark font-semibold text-dark hover:bg-dark hover:text-white transition-colors"
                  onClick={() => navigate('/work-area')}
                >
                  Dashboard
                </button>
                <button 
                  className="px-4 py-2 rounded-full border-2 border-dark font-semibold text-dark hover:bg-dark hover:text-white transition-colors inline-flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-dark"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="py-4">
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => 
                  item.active ? (
                    <Link 
                      key={item.name}
                      to={item.slug} 
                      className="font-semibold text-dark py-2 border-b border-gray-100 px-4"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : null
                )}
                
                <div className="flex flex-col gap-2 mt-2 px-4">
                  {!authStatus ? (
                    // Not logged in - show login and signup buttons
                    <>
                      <button 
                        className="w-full py-2 rounded-full border-2 border-dark font-semibold text-dark"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          navigate('/login');
                        }}
                      >
                        Log In
                      </button>
                      <button 
                        className="w-full py-2 rounded-full bg-accent font-semibold text-dark shadow-md"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          navigate('/signup');
                        }}
                      >
                        Sign Up
                      </button>
                    </>
                  ) : (
                    // Logged in - show logout button
                    <button 
                      className="w-full py-2 rounded-full border-2 border-dark font-semibold text-dark flex items-center justify-center gap-2"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleLogout();
                      }}
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  )}
                </div>
              </nav>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Navbar;