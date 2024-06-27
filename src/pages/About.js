import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Box, Avatar } from '@mui/material';
import { styled } from '@mui/system';

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



const AvatarStyled = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginBottom: theme.spacing(2),
}));

const TeamMember = styled(Box)({
    textAlign: 'center',
    marginBottom: '16px',
});

const AboutUsPage = () => {
    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    About Us
                </Typography>
                
                <Typography variant="body1" component="p" gutterBottom align="center">
                    Our mission is to provide exceptional medical services and make healthcare accessible to everyone.
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom align="center" sx={{ marginTop: 4 }}>
                    Our Story
                </Typography>
                <Typography variant="body1" component="p" gutterBottom>
                    Founded in 2021, we have been committed to offering top-notch healthcare services to our community. Our goal is to bridge the gap between patients and medical facilities, ensuring that everyone receives the care they deserve.
                </Typography>
                
            </Box>
        </Container>
    );
};

export default AboutUsPage;
