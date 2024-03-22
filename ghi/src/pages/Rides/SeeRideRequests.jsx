import { useState, useEffect } from 'react'
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react'

const SeeRideRequests = () => {
    const { baseUrl } = useAuthContext()
    const [rideRequests, setRideRequests] = useState([])

    const fetchRideRequests = async () => {
        const url = `${baseUrl}/api/rides/others`
        const response = await fetch(url, {credentials: 'include'})

        if (response.ok) {
            const data = await response.json()
            setRideRequests(data)
        } else {
            console.error('Failed to fetch ride requests')
        }
    }

    useEffect(() => {
        fetchRideRequests()
    }, [])


    const handleAcceptRide = async (requestId) => {
        const url = `${baseUrl}/api/rides/${requestId}`
        const response = await fetch(url, {
            method: 'PUT',
            credentials: 'include'
        })

        if (response.ok) {
            fetchRideRequests()
        } else {
            console.error('Failed to respond to ride request')
        }
    }

    return (
        <div className="card text-bg-light mb-3">
            <h5 className="card-header">Pending Ride Requests</h5>
            <div className="card-body">
                <ul className="list-group list-group-flush">
                    {rideRequests.map((request) => {
                        const requestDateTime = request.date_time + '.000Z'
                        return (
                        <li key={request.id} className="list-group-item">
                            {`From ${request.pick_up_location} to ${request.drop_off_location} on
                            ${new Date(requestDateTime).toLocaleDateString()} at
                            ${new Date(requestDateTime).toLocaleTimeString()}`}
                            <div className="btn-group float-end">
                                <button
                                    onClick={() =>
                                        handleAcceptRide(
                                            request.id
                                        )
                                    }
                                    className="btn btn-success"
                                >
                                    Accept
                                </button>
                            </div>
                        </li>
                    )})}
                </ul>
            </div>
        </div>
    )
}

export default SeeRideRequests
