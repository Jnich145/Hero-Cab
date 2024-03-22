import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

function UpdateProfile() {
    const { baseUrl } = useAuthContext()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        special_needs: false,
        phone_number: '',
        address: ''
    })
    const [passwordData, setPasswordData] = useState({
        password: '',
        password_confirmation: '',
    })

    const fetchProfile = async () => {
        const url = `${baseUrl}/api/accounts/mine`
        try {
            const response = await fetch(url, { credentials: "include" })
            if (response.ok) {
                const data = await response.json()
                setFormData({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    special_needs: data.special_needs,
                    phone_number: data.phone_number ? data.phone_number : '',
                    address: data.address ? data.address : ''
                })
            } else {
                console.error('Error:', response.status, response.statusText)
            }
        } catch (error) {
            console.error('Error', error.message)
        }
    }

    useEffect(() => {
        fetchProfile()
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
        const url = `${baseUrl}/api/accounts/update`
        const fetchConfig = {
            method: "put",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include"
        }
        try {
            const response = await fetch(url, fetchConfig,)
            if (response.ok) {
                setFormData(() => ({
                    first_name: '',
                    last_name: '',
                    special_needs: false,
                    phone_number: '',
                    address: ''
                }))
                navigate('/profile')
            } else {
                console.error('Error:', response.status, response.statusText)
            }
        } catch (error) {
            console.error('Error:', error.message)
        }
    }

    const handlePasswordSubmit = async (event) => {
        event.preventDefault()
        const url = `${baseUrl}/api/accounts/update-password`
        const fetchConfig = {
            method: "put",
            body: JSON.stringify({password: passwordData.password}),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include"
        }
        if (passwordData.password == passwordData.password_confirmation) {
            try {
                const response = await fetch(url, fetchConfig)
                if (response.ok) {
                    setPasswordData(() => ({
                        password: '',
                        password_confirmation: '',
                    }))
                    navigate('/profile')
                } else {
                    console.error('Error:', response.status, response.statusText)
                }
            } catch (error) {
                console.error('Error:', error.message)
            }
        } else {
            setError('Passwords do not match')
        }
    }

    return (
        <div className="my-5 container">
            {error && (
                <div className="alert alert-danger" role="alert">
                {error}
            </div>
            )}
            <div className="offset-3 col-6">
                <form onSubmit={handleDetailSubmit}>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>first_name (optional)</th>
                                <th>last_name (optional)</th>
                                <th>phone_number (optional)</th>
                                <th>address (optional)</th>
                                <th>special_needs</th>
                                <th>update</th>
                            </tr>
                        </thead>
                        <tbody>

                                <tr>
                                    <td>
                                        <input value={formData.first_name} onChange={handleFormChange} type="text" id="first_name" className="form-control"
                                            name="first_name" />
                                        <label htmlFor="first_name"></label>
                                    </td>
                                    <td>
                                        <input value={formData.last_name} onChange={handleFormChange} type="text" id="last_name" className="form-control"
                                            name="last_name" />
                                        <label htmlFor="last_name"></label>
                                    </td>
                                    <td>
                                        <input value={formData.phone_number} onChange={handleFormChange} type="text" id="phone_number" className="form-control"
                                            name="phone_number" />
                                        <label htmlFor="phone_number"></label>
                                    </td>
                                    <td>
                                        <input value={formData.address} onChange={handleFormChange} type="text" id="address" className="form-control"
                                            name="address" />
                                        <label htmlFor="address"></label>
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
                                <th>password confirmation</th>
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
                                    <input value={passwordData.password_confirmation} onChange={handlePasswordChange} placeholder="password_confirmation" required type="text" id="password_confirmation" className="form-control"
                                        name="password_confirmation" />
                                    <label htmlFor="password_confirmation"></label>
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

export default UpdateProfile
