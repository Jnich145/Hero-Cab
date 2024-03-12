import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import React, { useEffect, useState } from 'react';

function Profile() {
    const [profile, setProfile] = useState({})
    // const [formData, setFormData] = useState({
    //     email: '',
    //     first_name: '',
    //     last_name: '',
    //     special_needs: ''
    // })

    const fetchData = async () => {
        const url = `http://localhost:8000/token`
        try {
            const response = await fetch(url, {credentials: "include"})
            if (response.ok) {
                const data = await response.json()
                setProfile(data.account)
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

    // const handleFormChange = (event) => {
    //     const inputName = event.target.name
    //     const value = event.target.value
    //     setFormData({
    //         ...formData,
    //         [inputName]: value
    //     })
    // }

    // const handleSubmit = async (event) => {
    //     event.preventDefault()

    //     const url = 'http://localhost:8000/api/accounts/'
    //     const fetchConfig = {
    //         method: "put",
    //         body: JSON.stringify(formData),
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     }

    //     try {
    //         const response = await fetch(url, fetchConfig)
    //         if (response.ok) {
    //             setFormData({
    //                 email: '',
    //                 first_name: '',
    //                 last_name: '',
    //                 special_needs: '',
    //             })
    //         } else {
    //             console.error('Error:', response.status, response.statusText)
    //         }
    //     } catch (error) {
    //         console.error('Error:', error.message)
    //     }
    // }

    return (
        <div className="my-5 container">
            <div className="offset-3 col-6">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>email</th>
                            <th>first_name</th>
                            <th>last_name</th>
                            <th>special_needs</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{profile.email}</td>
                            <td>{profile.first_name}</td>
                            <td>{profile.last_name}</td>
                            <td>{profile.special_needs ? "true" : "false"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default Profile
