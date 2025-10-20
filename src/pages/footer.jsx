import { FaEnvelope, FaFacebook, FaHospital, FaInstagram, FaLinkedin, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaPhoneAlt, FaTwitter, FaTwitterSquare } from "react-icons/fa";

function Footer(){
    return(
        <div className="container-fluid bg-primary text-white">
            <div className="row row-cols-1 row-cols-md-3 p-3 p-md-5">
                <div className="col">
                    <h3 className="fw-bold"><FaHospital className="mb-2"/> Hospital</h3>
                    <p>Made by Padmanabh &copy; 2025</p>
                </div>
                <div className="col text-uppercase justify-content-start border-start border-end">
                    <h5 className="fw-bold">Quick Links</h5>
                    <ul className="nav flex-column fw-bold">
                        <li className="nav-item mb-2"><a href="/" className="nav-link p-0 text-white">Home</a></li>
                        <li className="nav-item mb-2"><a href="/doctors" className="nav-link p-0 text-white">Doctors</a></li>
                        <li className="nav-item mb-2"><a href="/aboutus" className="nav-link p-0 text-white">About Us</a></li>
                        <li className="nav-item mb-2"><a href="/contact" className="nav-link p-0 text-white">Contact</a></li>
                        <li className="nav-item mb-2"><a href="/appointment" className="nav-link p-0 text-white">Book an Appointment</a></li>
                    </ul>
                </div>
                <div class="col mt-4 mt-md-0">
                    <h5 class="fw-bold">Contact Info</h5>
                    <p><FaMapMarkerAlt/> Karyavattom, Trivandrum</p>
                    <p><FaPhoneAlt/> +91xxxxxxxxxx</p>
                    <p><FaEnvelope/> emergency@hospital.in</p>
                    <div class="mt-3 fs-5">
                        <a href="#" class="text-white me-3"><FaInstagram/></a>
                        <a href="#" class="text-white me-3"><FaFacebook/></a>
                        <a href="#" class="text-white me-3"><FaLinkedinIn/></a>
                        <a href="#" class="text-white"><FaTwitter/></a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer;