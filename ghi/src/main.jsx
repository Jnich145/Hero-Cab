import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import Home from './pages/Account/Home'
import Login from './pages/Account/Login'
import SignUp from './pages/Account/SignUp'
import Settings from './pages/Settings'
import Error from './pages/Error'
import ReviewDetails from './pages/ReviewDetails'
import UpdateProfile from './pages/Account/UpdateProfile'
import Profile from './pages/Account/Profile'
import RequestTrip from './pages/Rider/RequestTrip'
import RiderHistory from './pages/Rider/RiderHistory'
import SeeRideRequests from './pages/Driver/SeeRideRequests'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'signup',
                element: <SignUp />,
            },
            {
                path: 'trips/new',
                element: <RequestTrip />,
            },
            {
                path: 'trips',
                element: <RiderHistory />,
            },
            {
<<<<<<< HEAD
                path: 'trips/requests',
                element: <SeeRideRequests />,
=======
                path: 'update-profile', element: <UpdateProfile />,
            },
            {
                path: 'profile', element: <Profile />,
>>>>>>> 6839c85073dbf0e14db44a89b5e01d865d27fc0e
            },
            {
                path: 'settings',
                element: <Settings />,
            },
            {
                path: 'review/:reviewID',
                element: <ReviewDetails />,
            },
            {
                path: 'profile',
                element: <Profile />,
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
