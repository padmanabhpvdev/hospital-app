import { useEffect } from "react";
import Aos from 'aos';
import 'aos/dist/aos.css'
import { FaExclamationTriangle } from "react-icons/fa";

function About(){
    useEffect(function(){
            Aos.init({duration:1000});
        },[]);
    return(
        <div className="container-fluid">
            <div className="contents text-center p-3">
                <h1>About Us</h1>
                <h6 className="fw-bold"><span className="text-primary">Home</span><span style={{color:"grey"}}> / About Us</span></h6>
            </div>
            <div className="row">
                <div className="col-md-6" data-aos="fade-up">
                    <img src="https://i.pinimg.com/736x/2f/63/5c/2f635cf35219c2607cd7a084da8999a7.jpg" alt="Hospital" className="img-fluid"/>
                </div>
                <div className="col-md-6" data-aos="fade-up" data-aos-delay="200">
                    <p style={{textAlign:"justify",fontSize:'1em'}}>At Hospital, our name reflects our core belief: that exceptional healthcare should be clear, accessible, and fundamentally about you. We are more than just a facility; we are a dedicated team of caregivers, innovators, and support staff united by a single mission—to provide compassionate, comprehensive care for every person who walks through our doors. We believe in treating the whole person, not just the condition, which is why we integrate the latest medical technology with a deeply human touch.</p>
                    <p style={{textAlign:"justify",fontSize:'1em'}}>Our team is the heart of everything we do. From our renowned physicians and specialists to our empathetic nurses and technicians, every staff member is carefully selected for their expertise and their commitment to our values. We foster a culture of continuous learning and collaboration, ensuring our patients benefit from a multidisciplinary approach to health and wellness. This means you receive coordinated, thoughtful care tailored to your unique needs and journey.</p>
                    <p style={{textAlign:"justify",fontSize:'1em'}}>We are proud to offer a full spectrum of services, from routine preventive care and advanced diagnostics to complex surgical procedures and specialized rehabilitation. Our state-of-the-art facilities are designed with patient comfort and safety in mind, creating a healing environment that promotes both physical and emotional well-being. We are committed to staying at the forefront of medical advancements, investing in the latest technologies and treatment protocols to deliver the best possible outcomes.</p>
                    <p className="text-danger"><FaExclamationTriangle className="mb-1"/> Info : AI generated paragraph</p>
                </div>
            </div>
        </div>
    )
}
export default About;