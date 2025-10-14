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
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/doctors'>Doctors</NavLink></li>
                        <li><NavLink to='/about'>About Us</NavLink></li>
                        <li><NavLink to='/contact'>Contact</NavLink></li>
                        <li><a href="" className="button">Book an Appointment</a></li>
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}
export default OffCanvasMenu;