import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import './t_home.css';
import { Card, CardContent, Typography, Button, Box, Divider, Grid } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';

const T_Home = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    const year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  const [appointments, setAppointments] = useState([]);
  const [username, setUsername] = useState(user?.username || '');
  const [name, setName] = useState(user?.name || '');
  const [country, setCountry] = useState(user?.country || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number || '');
  const [navOpen, setNavOpen] = useState(false); 

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const getTourist = async () => {
    try {
      const response = await axios.get(`https://ds-central.onrender.com/tourist/api/v1/tourist?username=${user.username}`);
      console.log(response.data);
      setName(response.data.name);
      setUsername(response.data.username);
      setCountry(response.data.country);
      setPhoneNumber(response.data.phone_number);
    } catch (error) {
      console.error("Error fetching tourist:", error);
    }
  };

  const getAppointment = async () => {
    try {
      const response = await axios.get(`https://ds-central.onrender.com/appointment/api/v1/appointment/my_appointments?username=${user.username}`);
      setAppointments(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      console.log("working")
      await axios.delete(`https://ds-central.onrender.com/appointment/api/v1/appointment?appointment_id=${appointmentId}`);
      // Remove canceled appointment from state
      setAppointments(appointments.filter(appt => appt.appointment_id !== appointmentId));
      console.log("Appointment canceled successfully.");
    } catch (error) {
      await axios.delete(`https://ds-central.onrender.com/appointment/api/v1/appointment/${appointmentId}`);
      console.error("Error canceling appointment:", error);
    }
  };

  useEffect(() => {
    if (user) {
      getTourist();
      getAppointment();
    }
  }, [user]);

  const isPastDate = (dateString) => {
    const today = new Date();
    const appointmentDate = new Date(dateString);
    return appointmentDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0);
  };

  return (
    <Box className="layout">
      {/* Sidebar */}
      <Box className={`sidebar ${navOpen ? 'open' : ''}`}>
        <Button className="close-btn" onClick={toggleNav}>×</Button>
        <nav>
          <ul>
            <li>
              <Link to="/t_update" className="nav-link">Update Profile</Link>
            </li>
            <li>
              <Link to="/search" className="nav-link">Search</Link>
            </li>
            <li>
              <Link to="/t_register" className="nav-link">Log out</Link>
            </li>
            <li>
              <Link to="/" className="nav-link">Back</Link>
            </li>
          </ul>
        </nav>
      </Box>

      <Box className="main-content">
      <div className="irregular-background"></div>
        <Button className="open-btn" onClick={toggleNav} backgroundColor={"white"}>☰</Button>
        <Box className="profile-box1" sx={{ p: 2, textAlign: 'center', mb: 2 }}>
          <Typography variant="h4" backgroundColor={"white"} className="title" sx={{ mt: -1 }}>{username}</Typography>
          
          <Card variant="outlined" sx={{ mt: 2, p: 1 }}>
            <Typography variant="subtitle1"><strong>Email:</strong> {name}</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle1"><strong>Country:</strong> {country}</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle1"><strong>Phone Number:</strong> {phoneNumber}</Typography>
          </Card>
        </Box>
        <Typography > .</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Button
            variant="contained"
            component={Link}
            to="/t_appointment"
          >
            Create Appointment
          </Button>
        </Box>
        
        <Grid container spacing={3}>
          {appointments.map((appointment) => (
            <Grid item key={appointment.appointment_id} xs={12} sm={6} md={4}>
              <Card variant="outlined" sx={{ p: 2, transition: '0.3s', '&:hover': { boxShadow: 6 }, backgroundColor: isPastDate(appointment.date) ? '#f5f5f5' : '#e3f2fd' }} className="card-hover">
                <CardContent>
                  <Box display="flex" alignItems="center" mt={1}>
                    <EventIcon />
                    <Typography className="black-font" variant="body2" sx={{ ml: 1 }}>Date: {formatDate(appointment.date)}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={1}>
                    <AccessTimeIcon />
                    <Typography className="black-font" variant="body2" sx={{ ml: 1 }}>Time: {appointment.time}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={1}>
                    <LocationOnIcon />
                    <Typography className="black-font" variant="body2" sx={{ ml: 1 }}>Medical Center: {appointment.medical_center}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={1}>
                    <PersonIcon />
                    <Typography className="black-font" variant="body2" sx={{ ml: 1 }}>Doctor: {appointment.doctor}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={1}>
                    <PersonIcon />
                    <Typography className="black-font" variant="body2" sx={{ ml: 1 }}>Patient: {appointment.patient}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={1}>
                    <DescriptionIcon />
                    <Typography className="black-font" variant="body2" sx={{ ml: 1 }}>Description: {appointment.description}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={1}>
                    <AccessTimeIcon />
                    <Typography className="black-font" variant="body2" sx={{ ml: 1 }}>ID: {appointment.appointment_id}</Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/t_appointments/${appointment.appointment_id}`, { state: { appointment } })}
                    disabled={isPastDate(appointment.date)}
                    sx={{ mt: 2 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => cancelAppointment(appointment.appointment_id)}
                    disabled={isPastDate(appointment.date)}
                    sx={{ mt: 2, ml: 2 }}
                  >
                    Cancel
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default T_Home;
