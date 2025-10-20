import { useState } from "react";
import { DoctorsList } from "./datas";
import './main.css'

function Doctors(){
    const [activeFilter, setActiveFilter] = useState('all');
    const specializations = ['all', ...new Set(DoctorsList.map(doctor => doctor.specialization))];
    const filteredDoctors = activeFilter ==='all' ? DoctorsList:
                            DoctorsList.filter(doctor => doctor.specialization === activeFilter);
    const getDoctorsCount = (spec) => {
        if (spec === 'all') return DoctorsList.length;
        return DoctorsList.filter(doctor => doctor.specialization === spec).length;
    };
    return(
        <div className="container-fluid">
            <div className="contents text-center p-3">
                <h1>Our Doctors</h1>
                <h6 className="fw-bold"><span className="text-primary">Home</span><span style={{color:"grey"}}> / Doctors</span></h6>
            </div>
            <div className="container text-center scrollable">
                <div className="btn-group">
                {specializations.map((spec) => (
                    <button key={spec} className={`btn ${
                    activeFilter === spec ? 'btn-primary' : 'btn-outline-primary'} border-0 outline-none`}
                  onClick={() => setActiveFilter(spec)}
                    >{spec === 'all' ? 'All Doctors' : spec}</button>
              ))}</div>
            </div>
            <div className="container p-5">
                <div class="row row-cols-1 row-cols-md-3 g-4">
                    {filteredDoctors.map((doctor)=>(
                        <div key={doctor.id} className="col">
                            <div className="card h-100 shadow-sm border-0 hover-shadow">
                                <img src={doctor.image} alt={doctor.name} className="img-fluid" />
                                <div className="card-body text-center">
                                    <h5 className="card-title mb-1 fw-bold">{doctor.name}</h5>
                                    <p className="text-muted">{doctor.specialization}</p>
                                    <p>Experience : {doctor.experience}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Doctors;