import { useState, useEffect } from 'react'
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react'
import { useNavigate } from 'react-router-dom'

const RiderHistory = () => {
    const { baseUrl } = useAuthContext()
    const [rides, setRides] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()
    const { token } = useAuthContext()

    const fetchRiderHistory = async () => {
        let url = `${baseUrl}/api/trips`
        try {
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                throw new Error('Failed to fetch ride history')
            }

            const data = await response.json()
            setRides(data)
        } catch (error) {
            console.error('Error fetching ride history:', error)
            setErrorMessage('Failed to load ride history')
        }
    }

    useEffect(() => {
        if (!token) {
        navigate("/login")
        } else {
            fetchRiderHistory()
        }
    }, [token, navigate])

    return (
        <div className="ride-history">
            <h2>Ride History</h2>
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
            <div className="ride-list">
                {rides.length > 0 ? (
                    rides.map((ride) => (
                        <div key={ride.id} className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">
                                    Ride to {ride.drop_off_location}
                                </h5>
                                <h6 className="card-subtitle mb-2 text-muted">
                                    From {ride.pick_up_location}
                                </h6>
                                <p className="card-text">
                                    Date:{' '}
                                    {new Date(
                                        ride.date_time
                                    ).toLocaleDateString()}{' '}
                                    Time:{' '}
                                    {new Date(
                                        ride.date_time
                                    ).toLocaleTimeString()}
                                </p>
                                <p className="card-text">{ride.instructions}</p>
                                {ride.map_url && (
                                    <a
                                        href={ride.map_url}
                                        className="card-link"
                                    >
                                        Ride Map
                                    </a>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No ride history found.</p>
                )}
            </div>
        </div>
    )
}

export default RiderHistory;
