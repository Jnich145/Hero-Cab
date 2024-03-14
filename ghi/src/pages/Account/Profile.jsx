import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import React, { useEffect, useState } from 'react';

function Profile() {
    const [profile, setProfile] = useState({})
    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        special_needs: false,
    })
    const [passwordData, setPasswordData] = useState({
        email: '',
        password: '',
    })

    const fetchData = async () => {
        const url = `http://localhost:8000/token`
        try {
            const response = await fetch(url, {credentials: "include"})
            if (response.ok) {
                const data = await response.json()
                setProfile(data.account)
                setFormData((prevData) => ({
                    ...prevData,
                    email: data.account.email,
                    special_needs: data.account.special_needs
                }))
                setPasswordData((prevData) => ({
                    ...prevData,
                    email: data.account.email,
                }))
            } else {
                console.error('Error:', response.status, response.statusText)
            }
        } catch (error) {
            console.error('Error', error.message)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleFormChange = (event) => {
        const inputName = event.target.name
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        setFormData({
            ...formData,
            [inputName]: value
        })
    }

    const handlePasswordChange = (event) => {
        const inputName = event.target.name
        const value = event.target.value
        setPasswordData({
            ...passwordData,
            [inputName]: value
        })
    }

    const handleDetailSubmit = async (event) => {
        event.preventDefault()
        const url = `http://localhost:8000/api/accounts/update`
        const fetchConfig = {
            method: "put",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                'email': profile.email
            },
        }
        try {
            const response = await fetch(url, fetchConfig)
            if (response.ok) {
                setFormData((prevData) => ({
                    ...prevData,
                    first_name: '',
                    last_name: '',
                    special_needs: false,
                }))
            } else {
                console.error('Error:', response.status, response.statusText)
            }
        } catch (error) {
            console.error('Error:', error.message)
        }
        fetchData()
    }

    const handlePasswordSubmit = async (event) => {
        event.preventDefault()
        const url = `http://localhost:8000/api/accounts/update-password`
        const fetchConfig = {
            method: "put",
            body: JSON.stringify(passwordData),
            headers: {
                'Content-Type': 'application/json',
                'email': profile.email
            },
        }
        try {
            const response = await fetch(url, fetchConfig)
            if (response.ok) {
                setPasswordData((prevData) => ({
                    ...prevData,
                    password: '',
                }))
            } else {
                console.error('Error:', response.status, response.statusText)
            }
        } catch (error) {
            console.error('Error:', error.message)
        }
        fetchData()
    }

    return (
        <div className="my-5 container">
            <div className="offset-3 col-6">
                <form onSubmit={handleDetailSubmit}>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>email</th>
                                <th>first_name</th>
                                <th>last_name</th>
                                <th>special_needs</th>
                                <th>update</th>
                            </tr>
                        </thead>
                        <tbody>

                                <tr>
                                    <td>{ profile.email }</td>
                                    <td>
                                        <input value={formData.first_name} onChange={handleFormChange} placeholder={profile.first_name} required type="text" id="first_name" className="form-control"
                                            name="first_name" />
                                        <label htmlFor="first_name"></label>
                                    </td>
                                    <td>
                                        <input value={formData.last_name} onChange={handleFormChange} placeholder={profile.last_name} required type="text" id="last_name" className="form-control"
                                            name="last_name" />
                                        <label htmlFor="last_name"></label>
                                    </td>
                                    <td>
                                        <input
                                        name="special_needs"
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={formData.special_needs}
                                        onChange={handleFormChange}
                                        />
                                    </td>
                                    <td>
                                        <div>
                                            <input className="btn btn-primary" type="submit" value="update" />
                                        </div>
                                    </td>
                                </tr>
                        </tbody>
                    </table>
                </form>
                <form onSubmit={handlePasswordSubmit}>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>password</th>
                                <th>update</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input value={passwordData.password} onChange={handlePasswordChange} placeholder="password" required type="text" id="password" className="form-control"
                                        name="password" />
                                    <label htmlFor="password"></label>
                                </td>
                                <td>
                                    <div>
                                        <input className="btn btn-primary" type="submit" value="update" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    )
};

export default Profile
