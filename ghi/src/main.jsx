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
import History from './pages/Trips/History'
import SeeRideRequests from './pages/Trips/SeeRideRequests'
import RequestTrip from './pages/Trips/RequestTrip'
import CreateReview from './pages/Trips/CreateReview'
import DriverReviews from './pages/Trips/DriverReviews'

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
                element: <History />,
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
            {
                path: 'review/new/:tripId',
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
