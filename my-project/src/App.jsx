
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './components/Login'
import {Route, Routes} from 'react-router-dom'
import Signup from './components/SignUp'
import {login, logout} from "./store/authSlice.js"
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios';
import Profile from './pages/Profile.jsx'
import Dashboard from './pages/Dashboard.jsx'
import PathwaySelection from './components/PathwaySelection.jsx'
import StoryCreation from './components/StoryCreation.jsx'
import CharacterCreation from './components/CharacterCreation.jsx'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchUser = async () => {
      try {
          const userResponse = await axios.get(`${import.meta.env.VITE_BACKEND_DOMAIN }/api/v1/users/me`,{}, {
              withCredentials: true,
          });
          if (userResponse) {
            dispatch(login(userResponse.data.data));
          }
      } catch (error) {
        dispatch(logout());
      }
    };
  
    fetchUser();
  }, []);

  return (
    <>
      <Navbar />
      <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/work-area' element={<Dashboard />} />
        <Route path='/path-selection' element={<PathwaySelection />} />
        <Route path='/story-creation' element={<StoryCreation />} />
        <Route path='/character-creation' element={<CharacterCreation />} />

      </Routes>
     </main>
    </>
  )
}

export default App
