import { useEffect, useState } from 'react'
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react'
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom"

function CreateReview() {
    const { rideId } = useParams( )
    const { baseUrl } = useAuthContext()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [ride, setRide] = useState({})
    const [formData, setFormData] = useState({
        rating: 0,
        description: '',
        ride_id: rideId
    })

    const fetchRide = async () => {
        const url = `${baseUrl}/api/ride/${rideId}`
        try {
            const response = await fetch(url, {
                credentials: 'include',
            })

        if (!response.ok) {
            throw new Error('Failed to find ride')
        }
            const data = await response.json()
            setRide(data)
        } catch (error) {
            console.error('Error fetching ride:', error)
            setError('Failed to find ride')
        }
    }

    useEffect(() => {
        fetchRide()
    }, [])

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
        // const rideDateTime = ride.date_time+'.000Z'
        // const diffInMilliseconds = new Date(rideDateTime) - new Date(currentDateTimeUTC)
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
            navigate("/rides")
        } else {
            setError('Failed to create review. Review for ride may already exists.')
        }
    }

    return (
        <div className="card text-bg-light mb-3">
            <h5 className="card-header">Create review for ride from {ride.pick_up_location} to {ride.drop_off_location}</h5>
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
