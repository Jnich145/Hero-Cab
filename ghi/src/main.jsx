import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import Home from './pages/Account/Home'
import Login from './pages/Account/Login'
import SignUp from './pages/Account/SignUp'
import Error from './pages/Error'
import ReviewDetails from './pages/ReviewDetails'
import UpdateProfile from './pages/Account/UpdateProfile'
import Profile from './pages/Account/Profile'
import RiderHistory from './pages/Trips/History'
import SeeRideRequests from './pages/Trips/SeeRideRequests'
import RequestTrip from './pages/Trips/RequestTrip'

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
                path: 'trips/requests',
                element: <SeeRideRequests />,
            },
            {
                path: 'update-profile', element: <UpdateProfile />,
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
