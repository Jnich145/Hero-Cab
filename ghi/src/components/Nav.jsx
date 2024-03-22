import { NavLink } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useEffect, useState } from 'react';

const Nav = () => {
    const { baseUrl } = useAuthContext()
    const { token } = useAuthContext()
    const [name, setName] = useState('')

    const fetchName = async () => {
        const url = `${baseUrl}/api/accounts/mine`
        try {
            const response = await fetch(url, { credentials: "include" })
            if (response.ok) {
                const data = await response.json()
                setName(data.first_name ? data.first_name : data)

            } else {
                console.error('Error:', response.status, response.statusText)
            }
        } catch (error) {
            console.error('Error', error.message)
        }
    }

    useEffect(() => {
        if (token) {
            fetchName()
        }
    }, [token])

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    Home
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li><NavLink to="/login" className="dropdown-item">Login</NavLink></li>
                <li><NavLink to="/signup" className="dropdown-item">Signup</NavLink></li>
              </ul>
            </li> */}
                        {token ? (
                            <>
                                <li>
                                    <NavLink
                                        to="/rides/new"
                                        className="nav-link"
                                    >
                                        Request Ride
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/rides" className="nav-link">
                                        Ride History
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/rides/requests"
                                        className="nav-link"
                                    >
                                        Ride Requests
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/reviews/driver/mine"
                                        className="nav-link"
                                    >
                                        Reviews As Driver
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/profile" className="nav-link">
                                        Profile
                                    </NavLink>
                                </li>
                                <LogoutButton />
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink to="/login" className="nav-link">
                                        Login
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/signup" className="nav-link">
                                        Signup
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                    <span className="navbar-text ms-auto">{token ? `Welcome, ${ name }` : 'Welcome'}</span>
                </div>
            </div>
        </nav>
    )
}

export default Nav
