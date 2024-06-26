import React, { useEffect, useState } from 'react';
import { Map, Marker, Overlay } from 'pigeon-maps';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice';

const Swal = require('sweetalert2')

const MapPage = () => {
    const user = useSelector(selectUser);
    const { destination } = useParams();
    const [markers, setMarkers] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);

    const handleMarkerClick = (marker) => {
       
        setSelectedMarker(marker);
    };

    const makeAppointment=()=>{
        if (user==null)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please Sign Up To Make Appointment!",
                footer: '<a href="/t_register">Sign Up</a>'
              });

else
window.location='/t_appointment';
    }
    

    const getMarkers = async () => {
        try {
            const response = await axios.get(`https://ds-m-center.onrender.com/api/v1/m_center/search_by_destination?destination=${destination}`);
            if (response.data.length > 0) {
                setMarkers(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getMarkers();
    }, [destination]);

    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Medical Centers Map
                </Typography>
                <Box component={Paper} elevation={3} p={2}>
                    <Map height={400} defaultCenter={[6, 81]} defaultZoom={7.5}>
                        {markers.map((marker) => (
                            <Marker
                                key={marker.id}
                                anchor={[marker.location.coordinates[1], marker.location.coordinates[0]]}
                                onClick={() => handleMarkerClick(marker)}
                            />
                        ))}

                        {selectedMarker && (
                            <Overlay anchor={[selectedMarker.location.coordinates[1], selectedMarker.location.coordinates[0]]} offset={[120, 79]}>
                                <Paper elevation={3} sx={{ padding: 2 }}>
                                    <Typography variant="h6">{selectedMarker.name}</Typography>
                                    <Typography variant="body2">{selectedMarker.owner_name}</Typography>
                                    <Typography variant="body2">{selectedMarker.phone_number}</Typography>
                                    <Typography variant="body2">{selectedMarker.destination}</Typography>
                                    <Typography variant="body2">{selectedMarker.description}</Typography>
                                    <Button variant="contained" color="primary" component={Link} onClick={(e) => {
                                e.preventDefault();
                                makeAppointment();
                                
                            }}>
                                        Appointment
                                    </Button>
                                </Paper>
                            </Overlay>
                        )}
                    </Map>
                </Box>
            </Box>
        </Container>
    );
};

export default MapPage;
