import { useState, useEffect } from 'react'
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react'
import { Link } from 'react-router-dom';

const History = () => {
    const { baseUrl } = useAuthContext()
    const [rides, setRides] = useState([])
    const [driverTrips, setDriverTrips] = useState([])
    const [accounts, setAccounts] = useState([])
    const [errorMessage, setErrorMessage] = useState('')

    const fetchRiderHistory = async () => {
        let url = `${baseUrl}/api/trips/mine`
        try {
            const response = await fetch(url, {credentials: 'include'})

        if (!response.ok) {
            throw new Error('Failed to fetch rider history')
        }

            const data = await response.json()
            setRides(data)
        } catch (error) {
            console.error('Error fetching rider history:', error)
            setErrorMessage('Failed to load rider history')
        }
    }

    const fetchDriverHistory = async () => {
        let url = `${baseUrl}/api/trips/mine-driver`
        try {
            const response = await fetch(url, {
                credentials: 'include',
            })

        if (!response.ok) {
            throw new Error('Failed to fetch driver history')
        }

            const data = await response.json()
            setDriverTrips(data)
        } catch (error) {
            console.error('Error fetching driver history:', error)
            setErrorMessage('Failed to load driver history')
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
    // used in potential time conditional for review button
    // const currentDateTimeUTC = new Date().toISOString()
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
                        const rideDateTime = ride.date_time+'.000Z'
                        // used in potential time conditional for review button
                        // const diffInMilliseconds = new Date(rideDateTime) - new Date(currentDateTimeUTC)
                        // const diffInHours = diffInMilliseconds / (1000 * 60 * 60)
                        return (
                        <div key={ride.id} className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">
                                    {`From ${ride.pick_up_location} to ${ride.drop_off_location} on
                                    ${new Date(rideDateTime).toLocaleDateString()} at
                                    ${new Date(rideDateTime).toLocaleTimeString()}
                                    ${driver ? `with ${driver.first_name} ${driver.last_name}` : '| Trip not yet accepted'}`}
                                </h5>
                                <h6>Driver Phone Number: {driver && driver.phone_number ? driver.phone_number : 'n/a'}</h6>
                                <h6 className="card-text">Special Instructions: {ride.instructions}</h6>
                                {/* time conditional: && diffInHours < 1 */}
                                {driver ? (
                                <>
                                    <Link className="btn btn-success" to={`/review/new/${ride.id}`}>Review Trip</Link>
                                </>
                                ) : null}
                                <div>
                                    <a href={ride.map_url} className='btn btn-primary'>Ride Map</a>
                                </div>
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
                        const tripDateTime = trip.date_time + '.000Z'
                        return (
                        <div key={trip.id} className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">
                                    {`From ${trip.pick_up_location} to ${trip.drop_off_location} on
                                    ${new Date(tripDateTime).toLocaleDateString()} at
                                    ${new Date(tripDateTime).toLocaleTimeString()}
                                    with ${rider ? `${rider.first_name} ${rider.last_name}` : ''}`}
                                </h5>
                                <h6>Rider Phone Number: {rider && rider.phone_number ? rider.phone_number : 'n/a'}</h6>
                                <h6 className="card-text">Special Instructions: {trip.instructions}</h6>
                                {trip.map_url && (
                                    <a
                                        href={trip.map_url}
                                        className="btn btn-primary"
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
