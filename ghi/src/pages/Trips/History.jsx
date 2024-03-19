import { useState, useEffect } from 'react'
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react'

const RiderHistory = () => {
    const { baseUrl } = useAuthContext()
    const [rides, setRides] = useState([])
    const [driverTrips, setDriverTrips] = useState([])
    const [errorMessage, setErrorMessage] = useState('')

    const fetchRiderHistory = async () => {
        let url = `${baseUrl}/api/trips/mine`
        try {
            const response = await fetch(url, {
                credentials: 'include',
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

    const fetchDriverHistory = async () => {
        let url = `${baseUrl}/api/trips/mine-driver`
        try {
            const response = await fetch(url, {
                credentials: 'include',
            })

        if (!response.ok) {
            throw new Error('Failed to fetch ride history')
        }

            const data = await response.json()
            setDriverTrips(data)
        } catch (error) {
            console.error('Error fetching ride history:', error)
            setErrorMessage('Failed to load ride history')
        }
    }

    useEffect(() => {
        fetchRiderHistory()
        fetchDriverHistory()
    }, [baseUrl])


    return (
        <div className="ride-history">
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
            <div className="ride-list">
                <h1>Rider History</h1>
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
                    <p>No ride history found for current user.</p>
                )}
            </div>
            <div className="driver-trip-list">
                <h1>Driver History</h1>
                {driverTrips.length > 0 ? (
                    driverTrips.map((trip) => (
                        <div key={trip.id} className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">
                                    trip to {trip.drop_off_location}
                                </h5>
                                <h6 className="card-subtitle mb-2 text-muted">
                                    From {trip.pick_up_location}
                                </h6>
                                <p className="card-text">
                                    Date:{' '}
                                    {new Date(
                                        trip.date_time
                                    ).toLocaleDateString()}{' '}
                                    Time:{' '}
                                    {new Date(
                                        trip.date_time
                                    ).toLocaleTimeString()}
                                </p>
                                <p className="card-text">{trip.instructions}</p>
                                {trip.map_url && (
                                    <a
                                        href={trip.map_url}
                                        className="card-link"
                                    >
                                        trip Map
                                    </a>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No ride history found for current user.</p>
                )}
            </div>
        </div>
    )
}

export default RiderHistory;
