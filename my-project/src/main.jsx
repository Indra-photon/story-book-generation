import React,{ StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Home from './pages/Home.jsx'
import AuthLayout from './common/AuthLayout.jsx'
import Login from './components/Login.jsx'
import Signup from './components/SignUp.jsx'
import Profile from './pages/Profile.jsx'
import Dashboard from './pages/Dashboard.jsx'
import PathwaySelection from './components/PathwaySelection.jsx'
import CharacterCreation from './components/CharacterCreation.jsx'
import StoryCreation from './components/StoryCreation.jsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
          path: "/",
          element: <Home />,
      },
      {
        path: "/profile",
        element: (
          <AuthLayout authentication={true}>
              <Profile />
          </AuthLayout>
        ),
      },
      {
        path: "/path-selection",
        element: (
          <AuthLayout authentication={true}>
              <PathwaySelection />
          </AuthLayout>
        ),
      },
      {
        path: "/character-creation",
        element: (
          <AuthLayout authentication={true}>
              <CharacterCreation />
          </AuthLayout>
        ),
      },
      {
        path: "/story-creation",
        element: (
          <AuthLayout authentication={true}>
              <StoryCreation />
          </AuthLayout>
        ),
      },
      {
        path: "/work-area",
        element: (
          <AuthLayout authentication={true}>
              <Dashboard />
          </AuthLayout>
        ),
      },
      {
          path: "/login",
          element: (
              <AuthLayout authentication={false}>
                  <Login />
              </AuthLayout>
          ),
      },
      {
          path: "/signup",
          element: (
              <AuthLayout authentication={false}>
                  <Signup />
              </AuthLayout>
          ),
      },
  ],
},
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
