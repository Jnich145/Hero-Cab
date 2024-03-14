import { Link, NavLink } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const Nav = () => {
  const { token } = useAuthContext();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Home</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
                <LogoutButton />
                <li className="nav-item"><NavLink to="/profile" className="nav-link">Profile</NavLink></li>
                <li className="nav-item"><NavLink to="/trips"
                  className="nav-link">Ride Request</NavLink></li>
              </>) : (
              <>
                <li className="nav-item"><NavLink to="/login" className="nav-link">Login</NavLink></li>
                <li className="nav-item"><NavLink to="/signup" className="nav-link">Signup</NavLink></li>
              </>
            )}
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
