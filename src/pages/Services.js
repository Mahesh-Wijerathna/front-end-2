import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const services = [
    {
        title: 'Search Medical Centers',
        description: 'Easily find and explore medical centers near your destination.',
        image: '/images/hospitalsearch.png',
        link: '/service-one'
    },
    {
        title: 'Make Appointments',
        description: 'Schedule appointments with medical professionals conveniently.',
        image: '/images/appointment.png',
        link: '/service-two'
    },
    {
        title: 'Explore Destinations',
        description: 'Discover top destinations and their medical facilities.',
        image: '/images/destination.png',
        link: '/service-three'
    }
];

const ServicesPage = () => {
    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Our Services
                </Typography>
               
                <Grid container spacing={4}>
                    {services.map((service, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    alt={service.title}
                                    height="340"
                                    image={service.image}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {service.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {service.description}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        component={Link}
                                        to={service.link}
                                        sx={{ marginTop: 2 }}
                                    >
                                        Learn More
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default ServicesPage;
