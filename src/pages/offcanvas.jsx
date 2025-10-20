import { Offcanvas } from "react-bootstrap";
import { FaHome, FaHospital } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import './main.css';

function OffCanvasMenu({ show, handleClose}){
    return(
        <div>
            <Offcanvas show={show} onHide={handleClose} placement="end" responsive="lg" className=" bg-primary text-white">
                <Offcanvas.Header closeButton className="btn-close-white">
                    <Offcanvas.Title>&nbsp;</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="d-lg-none d-block d-md-block">
                    <ul className="links">
                        <li><NavLink to='/' className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
                        <li><NavLink to='/doctors' className={({ isActive }) => isActive ? 'active' : ''}>Doctors</NavLink></li>
                        <li><NavLink to='/aboutus' className={({ isActive }) => isActive ? 'active' : ''}>About Us</NavLink></li>
                        <li><NavLink to='/contact' className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink></li>
                        <li><NavLink to="/appointment"  className={({ isActive }) => isActive ? 'button active' : 'button'}>Book an Appointment</NavLink></li>
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}
export default OffCanvasMenu;