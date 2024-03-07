import { Link, NavLink } from 'react-router-dom';

const Nav  = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Home</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li><NavLink to="/login" className="dropdown-item">Login</NavLink></li>
                <li><NavLink to="/signup" className="dropdown-item">Signup</NavLink></li>
                <li><NavLink to="/profile" className="dropdown-item">Profile</NavLink></li>
                <li><NavLink to="/logout" className="dropdown-item">Logout</NavLink></li>
                <li><NavLink to="/settings" className="dropdown-item">Settings</NavLink></li>
                <li><NavLink to="/create" className="dropdown-item">Create</NavLink></li>
              </ul>
            </li>
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
