import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import './main.css'

function Contact() {
    return(
        <div className="container-fluid">
            <div className="contents text-center p-3">
                <h1>Contact Us</h1>
                <h6 className="fw-bold"><span className="text-primary">Home</span><span style={{color:"grey"}}> / Contact</span></h6>
            </div>
            <div className="container p-5">
                <div className="row">
                    <div className="col-md-4">
                        <div className="d-flex g-2">
                            <FaMapMarkerAlt className="text-primary fs-2 m-2"/>
                            <div>
                                <h5 className="fw-bold">Karyavattom, Trivandrum</h5>
                                <p>Available</p>
                            </div>
                        </div>
                        <div className="d-flex g-2">
                            <FaPhoneAlt className="text-primary fs-2 m-2"/>
                            <div>
                                <h5 className="fw-bold">+91xxxxxxxxxx</h5>
                                <p>Official Contact Number</p>
                            </div>
                        </div>
                        <div className="d-flex g-2">
                            <FaEnvelope className="text-primary fs-2 m-2"/>
                            <div>
                                <h5 className="fw-bold">info@hospital.in</h5>
                                <p>Send us your query anytime!</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="row g-3">
                            <div className="col-md-6 d-block">
                                <div className="d-flex flex-column gap-4">
                                    <input type="text" name="" className="form p-2" id="" placeholder="Enter Full Name"/>
                                    <input type="email" name="" className="form p-2" id="" placeholder="Enter email"/>
                                    <input type="text" name="" className="form p-2" id="" placeholder="Enter Subject"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <textarea name="" id="" className="w-100 h-100" placeholder="Enter message"></textarea>
                            </div>
                            <div className="container text-end p-2">
                                <a href="#" className="btn btn-primary rounded-0">Subscribe Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container p-3">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d760.5652851735696!2d76.88640591675971!3d8.564794208308179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bee2f4878db5%3A0x44f9cf2f3f7bcd8f!2sDepartment%20of%20Computer%20Science%2C%20University%20of%20Kerala!5e0!3m2!1sen!2sin!4v1760873171780!5m2!1sen!2sin"
                style={{width:"100%",height:"70vh"}}></iframe>
            </div>
        </div>
    )
}
export default Contact;