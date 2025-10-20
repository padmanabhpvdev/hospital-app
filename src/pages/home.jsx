import './main.css';
import Aos from 'aos';
import 'aos/dist/aos.css'
import { useEffect } from 'react';
import CountUp from 'react-countup';
import { FaAllergies, FaBaby, FaChild, FaHeadSideVirus, FaHeartbeat, FaLungs, FaWalking } from 'react-icons/fa';

function Home(){
    const slides = [
        {
            image: "https://cdn.pixabay.com/photo/2025/05/29/08/25/doctor-9628974_1280.jpg",
            title: "Advanced Medical Care",
            description: "State-of-the-art facilities for your health"
        },
        {
            image: "https://cdn.pixabay.com/photo/2017/10/04/09/56/laboratory-2815641_1280.jpg",
            title: "Modern Laboratory",
            description: "Accurate diagnostics for better treatment"
        },
        {
            image: "https://cdn.pixabay.com/photo/2016/11/08/05/29/surgery-1807541_1280.jpg",
            title: "Expert Surgeons",
            description: "Experienced medical professionals"
        }
    ];
    useEffect(function(){
        Aos.init({duration:1000});
    },[])
    return(
        <div>
            <div 
                className='section'
                style={{
                    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)),url(https://cdn.pixabay.com/photo/2025/05/29/08/25/doctor-9628974_1280.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: '90vh',
                    position:'relative',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center'
                }}
            > 
                <div className="hero-content text-center text-white">
                    <h1 className="hero-title fs-1 fw-bold" data-aos='fade-up'>Welcome to Our Hospital</h1>
                    <p className="hero-subtitle fs-5" data-aos='fade-up' data-aos-delay="200">Quality Healthcare for You and Your Family</p>
                    <a role='' className="btn clickbutton" data-aos='fade-up' data-aos-delay="300" href='/appointment'>Book an Appointment</a>
                </div>
            </div><br />
            <section className="container-fluid">
                <div className="row">
                    <div className="col-md-6" data-aos="fade-up">
                        <img src="https://img.freepik.com/premium-photo/strong-set-lungs-you-have-there-shot-young-doctor-examining-her-patient-with-stethoscope_590464-8282.jpg" alt="" className='img-fluid'/>
                    </div>
                    <div className="col-md-6 contents" data-aos="fade-up" data-aos-delay="200">
                        <h1 className='py-3'>About Us</h1>
                        <div className="line"></div>
                        <p className="py-4" style={{textAlign:"justify",fontSize:'1.09em'}}>Welcome to Hospital , where we combine advanced medical technology with compassionate care to provide you and your family with exceptional health services. Our team of dedicated specialists is committed to your well-being, offering personalized treatment in a state-of-the-art healing environment.</p>
                        <a href="/aboutus" className="btn btn-primary justify-content-center">Learn More</a>
                    </div>
                </div>
            </section>
            <section className="container py-5">
                <div class="row text-center contents">
                    <div class="col-md p-3" data-aos="fade-up">
                        <h1><CountUp duration={10} end={20} />+</h1>
                        <strong>YEARS OF EXPERIENCE</strong>
                    </div>
                    <div class="col-md p-3" data-aos="fade-up" data-aos-delay="200">
                        <h1><CountUp duration={10} end={1000} />+</h1>
                        <strong>HAPPY PATIENTS</strong>
                    </div>
                    <div class="col-md p-3" data-aos="fade-up" data-aos-delay="300">
                        <h1><CountUp duration={10} end={120} separator=''/>+</h1>
                        <strong>CERTIFICATES</strong>
                    </div>
                    <div class="col-md p-3" data-aos="fade-up" data-aos-delay="400">
                        <h1><CountUp duration={10} end={25} />+</h1>
                        <strong>EXPERTISED DOCTORS</strong>
                    </div>
                </div>
            </section>
            <div 
                className='section'
                style={{
                    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.49), rgba(0, 0, 0, 0.47)),url(https://www.shutterstock.com/image-photo/professional-medical-service-concept-caucasian-600nw-1550932454.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: '90vh',
                    position:'relative',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center'
                }}>
                <div className="container mt-5">
                    <h1 className="text-white fs-1 fw-bold" data-aos="fade-up">Our Services</h1>
                    <div className="line" data-aos="fade-up"></div>
                    <div className="row row-cols-3 text-white text-center py-4 contents-icons">
                        <div className="col-md-4 p-4" data-aos="fade-up">
                            <h1><FaWalking/></h1>
                            <strong className="text-white">Orthology</strong>
                        </div>
                        <div className="col-md-4 p-4" data-aos="fade-up" data-aos-delay="200">
                            <h1><FaHeartbeat/></h1>
                            <strong className="text-white">Cardiology</strong>
                        </div>
                        <div className="col-md-4 p-4" data-aos="fade-up" data-aos-delay="300">
                            <h1><FaHeadSideVirus/></h1>
                            <strong className="text-white">Neurology</strong>
                        </div>
                        <div className="col-md-4 p-4" data-aos="fade-up">
                            <h1><FaChild/></h1>
                            <strong className="text-white">Pediatrics</strong>
                        </div>
                        <div className="col-md-4 p-4" data-aos="fade-up" data-aos-delay="200">
                            <h1><FaAllergies/></h1>
                            <strong className="text-white">Dermatology</strong>
                        </div>
                        <div className="col-md-4 p-4" data-aos="fade-up" data-aos-delay="300">
                            <h1><FaLungs/></h1>
                            <strong className="text-white">Pulmonology</strong>
                        </div>
                    </div>
                    <div className="py-5 text-center">
                        <a href="/doctors" className="btn btn-primary text-uppercase fw-bold" data-aos="fade-up">Explore our Doctors</a>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="text-center contents">
                    <h1 className='py-3'>Testimonials</h1>
                    <div className="line mb-5"></div>
                    <p className="fw-bold">Look what our Patients were saying...</p>
                </div>
            </div>
        </div>
    )
}

export default Home;