import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation, useHistory } from 'react-router-dom';

const Navbar = () => {
  let history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push("/login");
  }
  let location = useLocation();// useLocation() hook returns the location object that represents the current URL.
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">News-fetcher</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item"><Link className="nav-link" to="/About" >About</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/Business" >Business</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/Entertainment" >Entertainment</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/General" >General</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/Health" >Health</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/Science" >Science</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/Sports" >Sports</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/Technology" >Technology</Link></li>

            </ul>
            {!localStorage.getItem('token') ? <form className="d-flex">
              <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
              <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
            </form> : <button onClick={handleLogout} className="btn btn-primary">Logout</button>}
          </div>
        </div>
      </nav>
    </div>
  )
}
export default Navbar
