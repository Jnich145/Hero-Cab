import { useState, useEffect } from 'react'
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react'
import { Link } from 'react-router-dom';

const History = () => {
    const { baseUrl } = useAuthContext()
    const [rides, setRides] = useState([])
    const [driverRides, setDriverRides] = useState([])
    const [accounts, setAccounts] = useState([])
    const [errorMessage, setErrorMessage] = useState('')

    const fetchRiderHistory = async () => {
        let url = `${baseUrl}/api/rides/mine`
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
        let url = `${baseUrl}/api/rides/mine/driver`
        try {
            const response = await fetch(url, {
                credentials: 'include',
            })

        if (!response.ok) {
            throw new Error('Failed to fetch driver history')
        }

            const data = await response.json()
            setDriverRides(data)
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
    }, [])

    const handleDeleteRide = async (ride_id) => {
        const url = `${baseUrl}/api/rides/${ride_id}`
        console.log("--------------------------------")
        console.log(ride_id)
        const response = await fetch(url, {
            method: 'DELETE',
            credentials: 'include'
        })
        if (response.ok) {
            fetchRiderHistory()
        } else {
            console.error('Failed to delete ride')
        }
    }

    const handleRejectRide = async (ride_id) => {
        const url = `${baseUrl}/api/rides/${ride_id}/reject`
        const response = await fetch(url, {
            method: 'PUT',
            credentials: 'include'
        })
        if (response.ok) {
            fetchDriverHistory()
        } else {
            console.error('Failed to reject ride')
        }
    }

    const currentDateTimeUTC = new Date().toISOString()
    return (
        <div className="ride-history">
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
            <div className="ride-list">
                <h2>Your Ride Requests</h2>
                {rides.length > 0 ? (
                    rides.map((ride) => {
                        const driver = accounts.filter(account => account.id == ride.driver_id)[0]
                        const rideDateTime = ride.date_time+'.000Z'
                        const diffInMilliseconds = new Date(rideDateTime) - new Date(currentDateTimeUTC)
                        const diffInMinutes = diffInMilliseconds / (1000 * 60)
                        const status = diffInMinutes < 0 ? 'Complete' : `Departs in ${Math.ceil(diffInMinutes)} minutes`
                        return (
                        <div key={ride.id} className="card mb-3">
                            <div className="card-body">
                                <h5 className='card-title'>
                                        {`From ${ride.pick_up_location} to ${ride.drop_off_location} on
                                    ${new Date(rideDateTime).toLocaleDateString()} at
                                    ${new Date(rideDateTime).toLocaleTimeString()}`}
                                </h5>
                                <h6 className={status == 'Complete' ? 'text-success' : 'text-danger'}>Status: {status}</h6>
                                <h6 className="card-text">Special Instructions: {ride.instructions}</h6>
                                {!driver ? <h6 className='text-danger'>Ride not yet accepted by driver</h6> : null}
                                {driver ? <h6>Driver: {driver.first_name} {driver.last_name}</h6> : null}
                                {driver && driver.phone_number ? <h6>Driver Phone Number: {driver.phone_number}</h6> : null}
                                {driver && status == 'Complete' ? (
                                    <>
                                        <Link className="btn btn-success" to={`/review/new/${ride.id}`}>Review Ride</Link>
                                    </>
                                ) : null}
                                <div>
                                    <a href={ride.map_url} className='btn btn-primary'>Ride Map</a>
                                </div>
                                <div className="btn-group float-end">
                                    <button onClick={() => handleDeleteRide(ride.id)} className="btn btn-danger">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}).reverse()
                ) : (
                    <p>No rider history found for current user.</p>
                )}
            </div>
            <div className="driver-ride-list">
                <h2>Your Driver History</h2>
                {driverRides.length > 0 ? (
                    driverRides.map((ride) => {
                        const rider = accounts.filter(account => account.id == ride.rider_id)[0]
                        const rideDateTime = ride.date_time + '.000Z'
                        const diffInMilliseconds = new Date(rideDateTime) - new Date(currentDateTimeUTC)
                        const diffInMinutes = diffInMilliseconds / (1000 * 60)
                        const status = diffInMinutes < 0 ? 'Complete' : `Departs in ${Math.ceil(diffInMinutes)} minutes`
                        return (
                        <div key={ride.id} className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">
                                    {`From ${ride.pick_up_location} to ${ride.drop_off_location} on
                                    ${new Date(rideDateTime).toLocaleDateString()} at
                                    ${new Date(rideDateTime).toLocaleTimeString()}`}
                                </h5>
                                <h6 className={status == 'Complete' ? 'text-success' : 'text-danger'}>Status: {status}</h6>
                                <h6>Rider Phone Number: {rider && rider.phone_number ? rider.phone_number : 'n/a'}</h6>
                                <h6 className="card-text">Special Instructions: {ride.instructions}</h6>
                                {rider ? <h6>Rider: {rider.first_name} {rider.last_name}</h6> : null}
                                {rider && rider.phone_number ? <h6>Rider Phone Number: {rider.phone_number}</h6> : null}
                                <div>
                                    <a href={ride.map_url} className='btn btn-primary'>Ride Map</a>
                                </div>
                                <div className="btn-group float-end">
                                    <button onClick={() => handleRejectRide(ride.id)} className="btn btn-danger">
                                        Reject
                                    </button>
                                </div>
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
