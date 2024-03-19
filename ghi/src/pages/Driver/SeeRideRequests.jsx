import { useState, useEffect } from 'react'
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react'
import { useNavigate } from 'react-router-dom'

const SeeRideRequests = () => {
    const { baseUrl } = useAuthContext()
    const [rideRequests, setRideRequests] = useState([])
    const navigate = useNavigate()
    const { token } = useAuthContext()

    const fetchRideRequests = async () => {
        const url = `${baseUrl}/api/trips`
        const response = await fetch(url, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.ok) {
            const data = await response.json()
            setRideRequests(data)
        } else {
            console.error('Failed to fetch ride requests')
        }
    }

    useEffect(() => {
        if (!token) {
        navigate("/login")
        } else {
            fetchRideRequests()
        }
    }, [token, navigate])


    const handleResponseToRequest = async (requestId, accept) => {
        const url = `${baseUrl}/api/trips/${requestId}`
        const response = await fetch(url, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ accept }),
        })

        if (response.ok) {
            setRideRequests(
                rideRequests.filter((request) => request.id !== requestId)
            )
        } else {
            console.error('Failed to respond to ride request')
        }
    }

    return (
        <div className="card text-bg-light mb-3">
            <h5 className="card-header">Pending Ride Requests</h5>
            <div className="card-body">
                <ul className="list-group list-group-flush">
                    {rideRequests.map((request) => (
                        <li key={request.id} className="list-group-item">
                            Pick-up: {request.pick_up_location}, Drop-off:{' '}
                            {request.drop_off_location}, Date/Time:{' '}
                            {new Date(request.date_time).toLocaleString()}
                            <div className="btn-group float-end">
                                <button
                                    onClick={() =>
                                        handleResponseToRequest(
                                            request.id,
                                            true
                                        )
                                    }
                                    className="btn btn-success"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() =>
                                        handleResponseToRequest(
                                            request.id,
                                            false
                                        )
                                    }
                                    className="btn btn-danger"
                                >
                                    Decline
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SeeRideRequests
