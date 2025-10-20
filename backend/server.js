import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import cron from 'node-cron';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import { DoctorsList, Departments } from './data.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
let appointments = [];
let doctors = DoctorsList;

let adminUsers = [
  { id: 1, name: "Admin User", email: "admin@hospital.com" }
];

const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

const emailTemplates = {
  confirmation: (appointment) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2c5aa0;">Appointment Confirmed! 🎉</h2>
      <p>Dear <strong>${appointment.patientName}</strong>,</p>
      <p>Your appointment has been successfully booked with our hospital.</p>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #2c5aa0; margin-top: 0;">Appointment Details</h3>
        <p><strong>Appointment ID:</strong> ${appointment.id}</p>
        <p><strong>Doctor:</strong> ${appointment.doctorName}</p>
        <p><strong>Department:</strong> ${appointment.department}</p>
        <p><strong>Date:</strong> ${new Date(appointment.appointmentDate).toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${appointment.timeSlot}</p>
        <p><strong>Patient:</strong> ${appointment.patientName}</p>
        <p><strong>Contact:</strong> ${appointment.patientPhone}</p>
        ${appointment.message ? `<p><strong>Notes:</strong> ${appointment.message}</p>` : ''}
      </div>
      
      <p>📍 <strong>Location:</strong> Karyavattom, Trivandrum</p>
      <p>⏰ <strong>Please arrive 15 minutes early</strong> for registration</p>
      <p>📞 <strong>Contact us:</strong> +91xxxxxxxxxx</p>
      
      <div style="margin-top: 30px; padding: 15px; background: #e7f3ff; border-radius: 5px;">
        <p><strong>Need to reschedule?</strong> Call us at least 24 hours in advance.</p>
      </div>
      
      <p style="margin-top: 30px;">Best regards,<br><strong>Hospital Management Team</strong></p>
    </div>
  `,

  reminder: (appointment) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #ff6b35;">Appointment Reminder ⏰</h2>
      <p>Dear <strong>${appointment.patientName}</strong>,</p>
      <p>This is a friendly reminder about your upcoming appointment tomorrow.</p>
      
      <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #856404; margin-top: 0;">Appointment Details</h3>
        <p><strong>Doctor:</strong> ${appointment.doctorName}</p>
        <p><strong>Date:</strong> ${new Date(appointment.appointmentDate).toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${appointment.timeSlot}</p>
        <p><strong>Location:</strong> Main Hospital Building, Floor 3</p>
      </div>
      
      <p>📋 <strong>Please bring:</strong></p>
      <ul>
        <li>Government-issued ID</li>
        <li>Insurance card (if applicable)</li>
        <li>List of current medications</li>
        <li>Any relevant medical reports</li>
      </ul>
      
      <p>If you need to reschedule, please call us at <strong>+1 (555) 123-4567</strong>.</p>
      
      <p style="margin-top: 30px;">Best regards,<br><strong>Hospital Team</strong></p>
    </div>
  `,

  adminNotification: (appointment) => `
    <div style="font-family: Arial, sans-serif;">
      <h3 style="color: #2c5aa0;">📅 New Appointment Booking</h3>
      <div style="background: #f8f9fa; padding: 15px; border-radius: 5px;">
        <p><strong>Patient:</strong> ${appointment.patientName}</p>
        <p><strong>Email:</strong> ${appointment.patientEmail}</p>
        <p><strong>Phone:</strong> ${appointment.patientPhone}</p>
        <p><strong>Doctor:</strong> ${appointment.doctorName}</p>
        <p><strong>Department:</strong> ${appointment.department}</p>
        <p><strong>Date:</strong> ${new Date(appointment.appointmentDate).toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${appointment.timeSlot}</p>
        <p><strong>Appointment ID:</strong> ${appointment.id}</p>
        ${appointment.message ? `<p><strong>Patient Notes:</strong> ${appointment.message}</p>` : ''}
        <p><strong>Booked at:</strong> ${new Date(appointment.createdAt).toLocaleString()}</p>
      </div>
    </div>
  `
};

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"Hospital App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });
    console.log(`✅ Email sent to: ${to}`);
    return true;
  } catch (error) {
    console.error('❌ Email failed:', error);
    return false;
  }
};

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 17; hour++) {
    slots.push(`${hour}:00 - ${hour + 1}:00`);
  }
  return slots;
};

app.post('/api/appointments', async (req, res) => {
  try {
    const { patientName, email, phone, appointmentDate, department, doctorName, message } = req.body;

    // Generate appointment ID
    const appointmentId = `APT-${Date.now()}`;
    
    // Get available time slots
    const availableSlots = generateTimeSlots();
    const timeSlot = availableSlots[0];

    const appointment = {
      id: appointmentId,
      patientName,
      patientEmail: email,
      patientPhone: phone,
      appointmentDate: new Date(appointmentDate),
      department,
      doctorName,
      timeSlot,
      message,
      status: 'confirmed',
      createdAt: new Date(),
      reminderSent: false
    };

    appointments.push(appointment);

    await sendEmail(
      email,
      'Appointment Confirmation - Hospital',
      emailTemplates.confirmation(appointment)
    );

    for (const admin of adminUsers) {
      await sendEmail(
        admin.email,
        'New Appointment Booking',
        emailTemplates.adminNotification(appointment)
      );
    }

    const doctor = doctors.find(d => d.name === doctorName);
    if (doctor) {
      await sendEmail(
        doctor.email,
        'New Appointment Scheduled',
        emailTemplates.adminNotification(appointment)
      );
      
      if (!doctor.schedule) {
        doctor.schedule = [];
      }
      doctor.schedule.push({
        appointmentId,
        patientName,
        date: appointment.appointmentDate,
        time: timeSlot,
        status: 'scheduled'
      });
    }

    res.json({
      success: true,
      message: 'Appointment booked successfully! Confirmation email sent.',
      appointmentId,
      timeSlot
    });

  } catch (error) {
    console.error('Appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to book appointment'
    });
  }
});

// Get all appointments (Admin Dashboard)
app.get('/api/appointments', (req, res) => {
  res.json({
    success: true,
    data: appointments
  });
});

// Get doctor's appointments
app.get('/api/doctors/:doctorName/appointments', (req, res) => {
  const { doctorName } = req.params;
  const doctorAppointments = appointments.filter(apt => apt.doctorName === doctorName);
  res.json({
    success: true,
    data: doctorAppointments
  });
});

// Get all doctors
app.get('/api/doctors', (req, res) => {
  res.json({
    success: true,
    data: doctors
  });
});

// Update appointment status
app.put('/api/appointments/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const appointment = appointments.find(apt => apt.id === id);
  if (appointment) {
    appointment.status = status;
    res.json({ success: true, data: appointment });
  } else {
    res.status(404).json({ success: false, message: 'Appointment not found' });
  }
});

// Admin dashboard stats
app.get('/api/admin/stats', (req, res) => {
  const totalAppointments = appointments.length;
  const confirmedAppointments = appointments.filter(apt => apt.status === 'confirmed').length;
  const pendingAppointments = appointments.filter(apt => apt.status === 'pending').length;
  
  res.json({
    success: true,
    data: {
      totalAppointments,
      confirmedAppointments,
      pendingAppointments,
      totalDoctors: doctors.length,
      recentAppointments: appointments.slice(-5).reverse()
    }
  });
});

// Cron job for reminders (runs daily at 9 AM)
cron.schedule('0 9 * * *', async () => {
  console.log('🔔 Running appointment reminders...');
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toDateString();
  
  const tomorrowAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.appointmentDate).toDateString();
    return aptDate === tomorrowStr && !apt.reminderSent;
  });
  
  for (const appointment of tomorrowAppointments) {
    await sendEmail(
      appointment.patientEmail,
      'Appointment Reminder - Hospital',
      emailTemplates.reminder(appointment)
    );
    appointment.reminderSent = true;
  }
  
  console.log(`📧 Sent ${tomorrowAppointments.length} reminder emails`);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Hospital API is running!',
    endpoints: {
      'POST /api/appointments': 'Book new appointment',
      'GET /api/appointments': 'Get all appointments (Admin)',
      'GET /api/doctors': 'Get all doctors',
      'GET /api/admin/stats': 'Admin dashboard statistics'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🏥 Hospital Backend running on http://localhost:${PORT}`);
  console.log(`📧 Email notifications: ${process.env.EMAIL_USER ? 'Enabled' : 'Disabled'}`);
});