import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import Home from './pages/AccountActions/Home'
import Login from './pages/AccountActions/Login'
import SignUp from './pages/AccountActions/SignUp'
import Profile from './pages/AccountActions/Profile'
import Settings from './pages/Settings'
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
                path: 'settings', element: <Settings />,
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
