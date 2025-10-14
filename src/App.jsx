import { useState } from 'react'
import './App.css'
import { FaBars, FaHospital, FaUserAlt } from 'react-icons/fa'
import { BrowserRouter, Link, NavLink } from 'react-router-dom'
import Home from './pages/home'
import OffCanvasMenu from './pages/offcanvas'

function SplashScreen(){
  return(
    <div></div>
  )
}
function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <BrowserRouter>
      <div>
        <nav className="navbar fixed-top">
          <div className="container">
            <a href="" className="navbar-brand fw-bold"><FaHospital className='mb-2'/> Hospital</a>
            <div className="d-none d-lg-block">
              <NavLink to='/' className='nav-links'>Home</NavLink>
              <NavLink to='/' className='nav-links'>Doctors</NavLink>
              <NavLink to='/' className='nav-links'>About Us</NavLink>
              <NavLink to='/' className='nav-links'>Contact</NavLink>
              <Link to='' className='nav-links login'>Book an Appointment</Link>
            </div>
            <button className='btn d-lg-none mb-2 text-white' onClick={handleShow}><FaBars className='fs-3'/></button>
          </div>
        </nav>
        <OffCanvasMenu show={show} handleClose={handleClose}/><br />
        <Home/>
      </div>
    </BrowserRouter>
  )
}

export default App
