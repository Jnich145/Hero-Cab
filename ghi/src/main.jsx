import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import Home from './pages/Account/Home'
import Login from './pages/Account/Login'
import SignUp from './pages/Account/SignUp'
import Error from './pages/Error'
import UpdateProfile from './pages/Account/UpdateProfile'
import Profile from './pages/Account/Profile'
import History from './pages/Rides/History'
import SeeRideRequests from './pages/Rides/SeeRideRequests'
import RequestRide from './pages/Rides/RequestRide'
import CreateReview from './pages/Rides/CreateReview'
import DriverReviews from './pages/Rides/DriverReviews'

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
                path: 'rides/new',
                element: <RequestRide />,
            },
            {
                path: 'rides',
                element: <History />,
            },
            {
                path: 'rides/requests',
                element: <SeeRideRequests />,
            },
            {
                path: 'update-profile', element: <UpdateProfile />,
            },
            {
                path: 'profile',
                element: <Profile />,
            },
            {
                path: 'review/new/:rideId',
                element: <CreateReview />,
            },
            {
                path: 'reviews/driver/mine',
                element: <DriverReviews />,
            }
        ],
    },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
