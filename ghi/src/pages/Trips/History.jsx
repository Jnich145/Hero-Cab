import { useState, useEffect } from 'react'
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react'

const History = () => {
    const { baseUrl } = useAuthContext()
    const [rides, setRides] = useState([])
    const [driverTrips, setDriverTrips] = useState([])
    const [accounts, setAccounts] = useState([])
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

    const fetchAccounts = async () => {
        let url = `${baseUrl}/api/accounts`
        try {
            const response = await fetch(url, {
                credentials: 'include',
            })

        if (!response.ok) {
            throw new Error('Failed to fetch ride history')
        }
            const data = await response.json()
            setAccounts(data)

        } catch (error) {
            console.error('Error fetching ride history:', error)
            setErrorMessage('Failed to load ride history')
        }
    }

    useEffect(() => {
        fetchRiderHistory()
        fetchDriverHistory()
        fetchAccounts()
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
                    rides.map((ride) => {
                        const driver = accounts.filter(account => account.id == ride.driver_id)[0]
                        return (
                        <div key={ride.id} className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">
                                    From {ride.pick_up_location} to {ride.drop_off_location}
                                </h5>
                                    {driver ? (
                                    <>
                                        <p>Driver Name: {driver.first_name} {driver.last_name}</p>
                                        <p>Driver Phone Number: {driver.phone_number ? driver.phone_number : 'n/a'}</p>
                                    </>
                                ) : <p>Trip not yet accepted</p>}
                                <p className="card-text">
                                    Date:{' '}
                                    {new Date(ride.date_time).toLocaleDateString()}{' '}
                                    Time:{' '}
                                    {new Date(ride.date_time).toLocaleTimeString()}
                                </p>
                                <p className="card-text">Special Instructions: {ride.instructions}</p>
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
                    )})
                ) : (
                    <p>No rider history found for current user.</p>
                )}
            </div>
            <div className="driver-trip-list">
                <h1>Driver History</h1>
                {driverTrips.length > 0 ? (
                    driverTrips.map((trip) => {
                        const rider = accounts.filter(account => account.id == trip.rider_id)[0]
                        return (
                        <div key={trip.id} className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">
                                    From {trip.pick_up_location} to {trip.drop_off_location}
                                </h5>
                                    <p>Rider Name: {rider ? `${rider.first_name} ${rider.last_name}` : ''}</p>
                                <p>Rider Phone Number: {rider && rider.phone_number ? rider.phone_number : 'n/a'}</p>
                                <p className="card-text">
                                    Date:{' '}
                                    {new Date(trip.date_time).toLocaleDateString()}{' '}
                                    Time:{' '}
                                    {new Date(trip.date_time).toLocaleTimeString()}
                                </p>
                                <p className="card-text">Special Instructions: {trip.instructions}</p>
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
                    )})
                ) : (
                    <p>No driver history found for current user.</p>
                )}
            </div>
        </div>
    )
}

export default History;
