import { useState } from 'react';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import { useNavigate } from 'react-router-dom';

const RequestTrip = () => {
    const { baseUrl } = useAuthContext();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        pick_up_location: '',
        drop_off_location: '',
        map_url: '',
        instructions: '',
        date: '',
        time: '',
    });


    const handleFormChange = (event) => {
        const inputName = event.target.name;
        const value = event.target.value;
        setFormData({
            ...formData,
            [inputName]: value,
        });
    };

    const handleRequestRide = async (e) => {
        e.preventDefault();
        let url = `${baseUrl}/api/trips/`;
        const combinedDateTime = new Date(`${formData.date}T${formData.time}`);
        formData["date_time"] = combinedDateTime.toISOString();
        console.log(formData);
        delete formData.date;
        delete formData.time;
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            setErrorMessage('Failed to request ride');
        } else {
            navigate('/trips');
        }
    }

    return (
        <div className="card text-bg-light mb-3">
            <h5 className="card-header">Request A Ride</h5>
            <div className="mb-3">
                <label className="form-label">Location</label>
                <input
                    name="pick_up_location"
                    type="text"
                    className="form-control"
                    value={formData.pick_up_location}
                    onChange={handleFormChange}
                    required
                />
            </div>
            <div className="card-body">
                <form onSubmit={handleRequestRide}>
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
                        <input className="btn btn-primary" type="submit" value="Create" />
                    </div>
                </form>
            </div>
        </div>
    )
};


export default RequestTrip;
