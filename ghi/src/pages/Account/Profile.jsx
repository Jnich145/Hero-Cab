import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

function Profile() {
    const { baseUrl } = useAuthContext()
    const [profile, setProfile] = useState({})
    const navigate = useNavigate()

    const fetchProfile = async () => {
        const url = `${baseUrl}/api/accounts/mine`
        try {
            const response = await fetch(url, { credentials: "include" })
            if (response.ok) {
                const data = await response.json()
                setProfile(data)

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

    return (
        <div className="my-5 container">
            <div className="offset-3 col-6">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>email</th>
                            <th>first_name</th>
                            <th>last_name</th>
                            <th>phone_number</th>
                            <th>address</th>
                            <th>special_needs</th>
                            <th>update</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{ profile.email }</td>
                            <td>{ profile.first_name }</td>
                            <td>{ profile.last_name }</td>
                            <td>{ profile.phone_number }</td>
                            <td>{ profile.address }</td>
                            <td>{ profile.special_needs ? "true" : "false"}</td>
                            <td>
                                <div>
                                    <input className="btn btn-primary" type="submit" value="update" onClick={() => navigate('/update-profile')} />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Profile
