import { useState } from 'react'
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react'
import { useNavigate } from 'react-router-dom'

function RequestTripForm() {
    const { baseUrl } = useAuthContext()
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        pick_up_location: '',
        drop_off_location: '',
        map_url: '',
        instructions: '',
        date: '',
        time: ''
    })

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

        const currentDateTimeUTC = new Date().toISOString()
        const selectedDateTime = new Date(`${formData.date}T${formData.time}:00.000Z`)
        const selectedDateTimeUTC = new Date(selectedDateTime.getTime() + selectedDateTime.getTimezoneOffset() * 60000).toISOString()
        const diffInMilliseconds = new Date(selectedDateTimeUTC) - new Date(currentDateTimeUTC)
        const diffInHours = diffInMilliseconds / (1000 * 60 * 60)
        if (diffInHours < .9) {
            setError('Requests must be made at least 1 hour in advance')
            return
        }
        const tripsUrl = `${baseUrl}/api/trips/`
        formData["date_time"] = selectedDateTimeUTC
        delete formData.date
        delete formData.time

        const fetchConfig = {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(tripsUrl, fetchConfig)
        if (response.ok) {
            navigate("/trips")
        } else {
            setError('Failed to request ride')
        }
    }

    return (
        <div className="card text-bg-light mb-3">
            <h5 className="card-header">Request A Ride</h5>
            {error && (
                <div className="alert alert-danger" role="alert">
                {error}
            </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Pick-Up Location</label>
                    <input
                        name="pick_up_location"
                        type="text"
                        className="form-control"
                        value={formData.pick_up_location}
                        onChange={handleFormChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Drop-Off Location</label>
                    <input
                        name="drop_off_location"
                        type="text"
                        className="form-control"
                        value={formData.drop_off_location}
                        onChange={handleFormChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Map URL</label>
                    <input
                        name="map_url"
                        type="text"
                        className="form-control"
                        value={formData.map_url}
                        onChange={handleFormChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Instructions</label>
                    <textarea
                        name="instructions"
                        className="form-control"
                        value={formData.instructions}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input
                        name="date"
                        type="date"
                        className="form-control"
                        value={formData.date}
                        onChange={handleFormChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Time</label>
                    <input
                        name="time"
                        type="time"
                        className="form-control"
                        value={formData.time}
                        onChange={handleFormChange}
                        required
                    />
                </div>
                <div>
                    <input className="btn btn-primary" type="submit" value="Request Trip" />
                </div>
            </form>
        </div>
    )
}

export default RequestTripForm
