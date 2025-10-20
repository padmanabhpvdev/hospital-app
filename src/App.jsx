import { useState } from 'react'
import './App.css'
import { FaBars, FaEnvelope, FaFacebook, FaHospital, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaTwitter} from 'react-icons/fa'
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom'
import Footer from './pages/footer'
import Home from './pages/home'
import Doctors from './pages/doctors'
import Contact from './pages/contact'
import About from './pages/about'
import Appointment from './pages/appointment'
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
        <nav className="navbar bg-light d-none d-lg-block">
          <div className="container">
            <div class="d-inline">
              <FaPhoneAlt className='mb-1'/> <strong className="text-uppercase"><small>Call Now : 91xxxxxxxxxx</small></strong>
            </div>
            <div class="d-inline">
              <FaEnvelope className='mb-1'/> <strong className="text-uppercase"><small>emergency@hospital.in</small></strong>
            </div>
            <div class="d-inline">
              <FaMapMarkerAlt className='mb-1'/> <strong className="text-uppercase"><small>Karyavattom, Trivandrum</small></strong>
            </div>
            <div className="d-inline p-2 fs-5">
              <a href="" className='p-2'><FaInstagram/></a>
              <a href="" className='p-2'><FaFacebook/></a>
              <a href="" className='p-2'><FaTwitter/></a>
              <a href="" className='p-2'><FaLinkedinIn/></a>
            </div>
          </div>
        </nav>
        <nav className="navbar sticky-top">
          <div className="container">
            <a href="/" className="navbar-brand fw-bold"><FaHospital className='mb-2'/> Hospital</a>
            <div className="d-none d-lg-block">
              <NavLink to='/' className={({ isActive }) => isActive ? 'nav-links active' : 'nav-links'}>Home</NavLink>
              <NavLink to='/doctors' className={({ isActive }) => isActive ? 'nav-links active' : 'nav-links'}>Doctors</NavLink>
              <NavLink to='/aboutus' className={({ isActive }) => isActive ? 'nav-links active' : 'nav-links'}>About Us</NavLink>
              <NavLink to='/contact' className={({ isActive }) => isActive ? 'nav-links active' : 'nav-links'}>Contact</NavLink>
              <NavLink to='/appointment' className={({ isActive }) => isActive ? 'nav-links login text-danger' : 'nav-links login'}>Book an Appointment</NavLink>
            </div>
            <button className='btn d-lg-none mb-2 text-white' onClick={handleShow}><FaBars className='fs-3'/></button>
          </div>
        </nav>
        <OffCanvasMenu show={show} handleClose={handleClose}/>
          <Routes>
           <Route path='/' element={ <Home/>} />
           <Route path='/doctors' element={ <Doctors/>} />
           <Route path='/aboutus' element={ <About/>} />
           <Route path='/contact' element={ <Contact/>} />
           <Route path='/appointment' element={ <Appointment/>} />
         </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
