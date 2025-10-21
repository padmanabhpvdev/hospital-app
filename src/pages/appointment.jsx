import { useState, useEffect } from "react";
import { Departments, DoctorsList } from "./datas";
import './main.css'
import { ToastBar } from "./utilities";

function Appointment(){
    const [formData, setFormData]=useState({
        fullName:"",
        email:"",
        phone:"",
        appointmentDate:"",
        department:"",
        doctor:"",
        message:""
    });
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [backendConnected, setBackendConnected] = useState(false);

    useEffect(() => {
        checkBackendConnection();
    }, []);

    const checkBackendConnection = async () => {
        try {
            const response = await fetch('/api/health');
            if (response.ok) {
                setBackendConnected(true);
                console.log('✅ Backend connected successfully');
            }
        } catch (error) {
            console.log('❌ Backend not connected, using fallback data');
            setBackendConnected(false);
        }
    };
    const handleDepartmentChange = (e) => {
        const selectedDept = e.target.value;
        setFormData({
            ...formData,department:selectedDept,doctor:''
        });
        if(selectedDept){
            const doctorsInDept = DoctorsList.filter(doctor =>
                doctor.specialization===selectedDept
            );
            setFilteredDoctors(doctorsInDept);
        }else{
            setFilteredDoctors([]);
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,[name]: value
        });
    };
    const showNotification = (message, type = "success") => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000);
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            // await new Promise(resolve => setTimeout(resolve, 1000));
            const response = await fetch('http://localhost:5000/api/appointments/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    patientName: formData.fullName,
                    email: formData.email,
                    phone: formData.phone,
                    appointmentDate: formData.appointmentDate,
                    department: formData.department,
                    doctorName: formData.doctor,
                    message: formData.message
                })
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Backend error:', errorText);
                throw new Error(`Server error: ${response.status}`);
            }
            const result = await response.json(); 
            console.log(response.text)
            if(response.ok){
                showNotification("Appointment booked successfully! Confirmation email sent.");
                setFormData({
                    fullName: "",
                    email: "",
                    phone: "",
                    appointmentDate: "",
                    department: "",
                    doctor: "",
                    message: ""
                });
                setFilteredDoctors([]);
             }else{
                 if(result.errors && Array.isArray(result.errors)){
                    const errorMessages=result.errors.join(', ');
                    showNotification(`Please fix the following: ${errorMessages}`, "error");
                 }else{showNotification(result.message || "Failed to book appointment. Please try again.", "error");}
             }   
        }catch(error){
            console.error("Error submitting form:", error);
            showNotification(error.message || "Failed to book appointment. Please try again.", "error");
        }
        finally{setLoading(false);}
    }
    return(
        <div className="container-fluid">
            <ToastBar showToast={showToast} setShowToast={setShowToast} toastType={toastType} toastMessage={toastMessage}/>
            <div className="contents text-center p-3">
                <h1>Book an Appointment</h1>
                <h6 className="fw-bold"><span className="text-primary">Home</span><span style={{color:"grey"}}> / Book an Appointment</span></h6>
            </div>
            <div className="container p-3">
                <form onSubmit={handleSubmit}>
                <h4 className="text-center fw-bold">Request an Appointment</h4>
                <div className="container p-3">
                    <div className="row mb-3 gy-3 custominput">
                        <div className="col-md-6">
                            <input type="text" name="fullName" id="" value={formData.fullName} onChange={handleInputChange} placeholder="Enter Full Name" required/>
                        </div>
                        <div className="col-md-6">
                            <input type="email" name="email" id="" value={formData.email} onChange={handleInputChange} placeholder="Enter Email" required/>
                        </div>
                        <div className="col-md-6">
                            <input type="text" name="phone" id="" value={formData.phone} onChange={handleInputChange} placeholder="Enter Phone Number" required/>
                        </div>
                        <div className="col-md-6">
                            <input type="date" name="appointmentDate" id="" value={formData.appointmentDate} onChange={handleInputChange} placeholder="Choose Appointment Date" required/>
                        </div>
                        <div className="col-md-6">
                            <select className="selectbar" name="department" id="" value={formData.department} onChange={handleDepartmentChange}>
                                <option value="">Select Department</option>
                                {Departments.map(dept=>(
                                    <option key={dept.value} value={dept.value}>{dept.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <select className="selectbar" name="doctor" value={formData.doctor} id="" onChange={handleInputChange} disabled={!formData.department}>
                                <option value="">Select Doctor</option>
                                {filteredDoctors.map(doctor=>(
                                    <option value={doctor.name} key={doctor.id}>{doctor.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-12">
                            <textarea name="" id="" className="w-100" style={{height:"30vh"}}></textarea>
                        </div>
                        <div className="col text-center p-4">
                            <input type="reset" value="Reset" className="btn btn-danger rounded-0 m-2" />
                            <input type="submit" value="Submit" className="btn btn-success rounded-0" />
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </div>
    )
}
export default Appointment;
