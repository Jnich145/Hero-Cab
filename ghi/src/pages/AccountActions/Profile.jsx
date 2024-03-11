import React, { useEffect, useState } from 'react';

function Profile() {

    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        special_needs: ''
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

        const url = 'http://localhost:8000/api/profiles/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        try {
            const response = await fetch(url, fetchConfig)
            if (response.ok) {
                setFormData({
                    email: '',
                    first_name: '',
                    last_name: '',
                    special_needs: '',
                })
            } else {
                console.error('Error:', response.status, response.statusText)
            }
        } catch (error) {
            console.error('Error:', error.message)
        }
    }

    return (
        <div className="my-5 container">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create Profile</h1>
                    <form onSubmit={handleSubmit} id="create-profile-form">
                        <div className="form-floating mb-3">
                            <input value={formData.email} onChange={handleFormChange} placeholder="Email" required type="text" id="email" className="form-control"
                                name="email" />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.first_name} onChange={handleFormChange} placeholder="First_name" required type="text" id="first_name" className="form-control"
                                name="first_name" />
                            <label htmlFor="first_name">First_name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.last_name} onChange={handleFormChange} placeholder="Last_name" required type="last_name" id="last_name" className="form-control"
                                name="last_name" />
                            <label htmlFor="last_name">Last_name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.special_needs} onChange={handleFormChange} placeholder="Special_needs" required type="special_needs" id="special_needs" className="form-control"
                                name="special_needs" />
                            <label htmlFor="special_needs">Special_needs</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile
