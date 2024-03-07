import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Logout from './pages/Logout'
import Settings from './pages/Settings'
import Create from './pages/Create'
import Error from './pages/Error'
import ReviewDetails from './pages/ReviewDetails'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                index: true, element: <Home />,
            },
            {
                path: 'login', element: <Login />,
            },
            {
                path: 'signup', element: <SignUp />,
            },
            {
                path: 'profile', element: <Profile />,
            },
            {
                path: 'logout', element: <Logout />,
            },
            {
                path: 'settings', element: <Settings />,
            },
            {
                path: 'create', element: <Create />,
            },
            {
                path: 'review/:reviewID', element: <ReviewDetails />,
            },
        ],
    },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
