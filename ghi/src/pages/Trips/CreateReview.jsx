import { useEffect, useState } from 'react'
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react'
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom"

function CreateReview() {
    const { tripId } = useParams( )
    const { baseUrl } = useAuthContext()
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const [trip, setTrip] = useState({})
    const [formData, setFormData] = useState({
        rating: 0,
        description: '',
        trip_id: tripId
    })

    const fetchTrip = async () => {
        let url = `${baseUrl}/api/trip/${tripId}`
        try {
            const response = await fetch(url, {
                credentials: 'include',
            })

        if (!response.ok) {
            throw new Error('Failed to find trip')
        }
            const data = await response.json()
            setTrip(data)
        } catch (error) {
            console.error('Error fetching trip:', error)
            setError('Failed to find trip')
        }
    }

    useEffect(() => {
        fetchTrip()
    }, [baseUrl])

    const handleFormChange = (event) => {
        const inputName = event.target.name
        const value = event.target.value
        setFormData({
            ...formData,
            [inputName]: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const url = `${baseUrl}/api/reviews/`
        const currentDateTimeUTC = new Date().toISOString()
        // potential time conditional for review
        // const tripDateTime = trip.date_time+'.000Z'
        // const diffInMilliseconds = new Date(tripDateTime) - new Date(currentDateTimeUTC)
        // if (diffInHours < 1) {
        //     setError('Requests must be made at least 12 hours in advance')
        //     return
        // }

        formData["date_time"] = currentDateTimeUTC


        const fetchConfig = {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(url, fetchConfig)
        if (response.ok) {
            navigate("/trips")
        } else {
            setError('Failed to create review')
        }
    }

    return (
        <div className="card text-bg-light mb-3">
            <h5 className="card-header">Create review for trip from {trip.pick_up_location} to {trip.drop_off_location}</h5>
            {error && (
                <div className="alert alert-danger" role="alert">
                {error}
            </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Rating</label>
                    <select
                        name="rating"
                        className="form-control"
                        value={formData.rating}
                        onChange={handleFormChange}
                         required
                    >
                    <option value="">Select Rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={formData.description}
                        onChange={handleFormChange}
                    />
                </div>
                <div>
                    <input className="btn btn-primary" type="submit" value="Submit" />
                </div>
            </form>
        </div>
    )
}

export default CreateReview
