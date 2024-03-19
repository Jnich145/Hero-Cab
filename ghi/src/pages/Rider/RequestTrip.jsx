import { useEffect, useState } from 'react'
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react'
import { useNavigate } from 'react-router-dom'

function RequestTripForm() {
    const { baseUrl } = useAuthContext()
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()
    const [pickUpLocation, setPickUpLocation] = useState('')
    const [dropOffLocation, setDropOffLocation] = useState('')
    const [mapUrl, setMapUrl] = useState('')
    const [instructions, setInstructions] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [status, setStatus] = useState('')
    const [showSuccess, setShowSuccess] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {
            pick_up_location: pickUpLocation,
            drop_off_location: dropOffLocation,
            map_url: mapUrl,
            instructions: instructions,
            date_time: `${date}T${time}:00.000Z`,
            status: "Pending",
        };
        const tripsUrl = `${baseUrl}/api/trips/`

        const fetchConfig = {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        console.log(data)
        const response = await fetch(tripsUrl, fetchConfig)
        if (response.ok) {
            setPickUpLocation('')
            setDropOffLocation('')
            setMapUrl('')
            setInstructions('')
            setDate('')
            setTime('')
            setStatus('')
            setShowSuccess(true)
            setTimeout(() => {
                setShowSuccess(false)
            }, 3000)
        } else {
            setErrorMessage('Failed to request ride')
        }
    }

    return (
        <div className="card text-bg-light mb-3">
            <h5 className="card-header">Request A Ride</h5>
            {showSuccess && (
                <div className="alert alert-success" role="alert">
                    Ride requested successfully!
                </div>
            )}
            <div className="mb-3">
                <label className="form-label">Pick-Up Location</label>
                <input
                    type="text"
                    className="form-control"
                    value={pickUpLocation}
                    onChange={(e) => setPickUpLocation(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Drop-Off Location</label>
                <input
                    type="text"
                    className="form-control"
                    value={dropOffLocation}
                    onChange={(e) => setDropOffLocation(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Map URL</label>
                <input
                    type="text"
                    className="form-control"
                    value={mapUrl}
                    onChange={(e) => setMapUrl(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Instructions</label>
                <textarea
                    className="form-control"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Date</label>
                <input
                    type="date"
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Time</label>
                <input
                    type="time"
                    className="form-control"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                />
            </div>
            <div>
                <button className="btn btn-primary" onClick={handleSubmit}>
                    Request Ride
                </button>
            </div>
        </div>
    )
}

export default RequestTripForm
