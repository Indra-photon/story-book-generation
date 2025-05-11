import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './components/Login'
import {Route, Routes, useNavigate, Outlet } from 'react-router-dom'
import Signup from './components/SignUp'
import {login, logout} from "./store/authSlice.js"
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios';
import Profile from './pages/Profile.jsx'
import Dashboard from './pages/Dashboard.jsx'
import PathwaySelection from './components/PathwaySelection.jsx'
import StoryCreation from './components/StoryCreation.jsx'
import CharacterCreation from './components/CharacterCreation.jsx'
import VerifyEmail from './pages/VerifyEmail.jsx'
import StoryEditor from './components/StoryEditor.jsx'
import { refreshTokens } from './utils/auth.js'
import TokenPurchase from './pages/TokenPurchase.jsx';
import PaymentSuccess from './pages/PaymentConfirmation.jsx';


// function App() {
//   const dispatch = useDispatch()
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//           const userResponse = await axios.get(`${import.meta.env.VITE_BACKEND_DOMAIN }/api/v1/users/me`,{}, {
//               withCredentials: true,
//           });
//           if (userResponse) {
//             dispatch(login(userResponse.data.data));
//           }
//       } catch (error) {
//         dispatch(logout());
//       }
//     };
  
//     fetchUser();

//     // Set up periodic token refresh (45 minutes)
//     const refreshInterval = setInterval(() => {
//       refreshTokens();
//     }, 45 * 60 * 1000);
    
//     // Cleanup interval on component unmount
//     return () => clearInterval(refreshInterval);
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <main>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path='/signup' element={<Signup />} />
//         <Route path='/profile' element={<Profile />} />
//         <Route path='/work-area' element={<Dashboard />} />
//         <Route path='/path-selection' element={<PathwaySelection />} />
//         <Route path='/story-creation' element={<StoryCreation />} />
//         <Route path='/character-creation' element={<CharacterCreation />} />
//         <Route path="/verify-email" element={<VerifyEmail />} />
//         <Route path="/edit-story/:storyId" element={<StoryEditor />} />
//         <Route path="/tokens" element={<TokenPurchase />} />
//         <Route path="/payment/success" element={<PaymentSuccess />} />
//       </Routes>
//      </main>
//     </>
//   )
// }

// export default App

// import Navbar from './components/Navbar'
// import Home from './pages/Home'
// import {Route, Routes, useNavigate} from 'react-router-dom'
// import {login, logout} from "./store/authSlice.js"
// import { useDispatch } from 'react-redux'
// import { useEffect, useState } from 'react'
// import axios from 'axios';

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [authChecking, setAuthChecking] = useState(true)

  // Function to check authentication status
  const checkAuthStatus = async () => {
    try {
      console.log("Checking auth status...");
      const userResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/users/me`, 
        { withCredentials: true }
      );
      
      if (userResponse.data && userResponse.data.data) {
        console.log("User authenticated:", userResponse.data.data);
        // User is authenticated
        dispatch(login(userResponse.data.data));
        return true;
      } else {
        console.log("Auth response without user data:", userResponse.data);
        // No valid user data
        dispatch(logout());
        return false;
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      // Handle authentication error - user is not logged in
      dispatch(logout());
      return false;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await checkAuthStatus();
      } catch (error) {
        console.error("Auth check completely failed:", error);
        // Make sure we set logout state
        dispatch(logout());
      } finally {
        // Always set authChecking to false to ensure UI renders
        setAuthChecking(false);
      }
    };
  
    fetchUser();
    
    // No refresh interval for now until we fix the basic authentication
  }, [dispatch]);

  // Show loading state only briefly while checking authentication
  if (authChecking) {
    // Set a timeout to stop showing loading after 2 seconds even if auth check is still pending
    setTimeout(() => {
      setAuthChecking(false);
    }, 2000);
    
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
    </div>
  }

  return (
    <>
      <Navbar />
      <main>
      <Outlet />
      </main>
    </>
  )
}

export default App