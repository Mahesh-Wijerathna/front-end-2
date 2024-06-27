import React from 'react';
import { Container, Typography, Grid, Paper, Box } from '@mui/material';
import { styled } from '@mui/system';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ContactInfo = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
}));

const IconWrapper = styled(Box)(({ theme }) => ({
    marginRight: theme.spacing(2),
}));

const ContactUsPage = () => {
    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Contact Us
                </Typography>
                <Typography variant="body1" component="p" gutterBottom align="center">
                    We'd love to hear from you! Here are the ways you can reach us.
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <ContactInfo>
                                <IconWrapper>
                                    <EmailIcon color="primary" />
                                </IconWrapper>
                                <Typography variant="body1">
                                    <strong>Email:</strong> healthyrome@medicalservices.com
                                </Typography>
                            </ContactInfo>
                            <ContactInfo>
                                <IconWrapper>
                                    <PhoneIcon color="primary" />
                                </IconWrapper>
                                <Typography variant="body1">
                                    <strong>Phone:</strong> +94 71 995 8221
                                </Typography>
                            </ContactInfo>
                            <ContactInfo>
                                <IconWrapper>
                                    <LocationOnIcon color="primary" />
                                </IconWrapper>
                                <Typography variant="body1">
                                    <strong>Address:</strong> Wakkwella Road, Galle.
                                </Typography>
                            </ContactInfo>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={8}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Send Us a Message
                            </Typography>
                            <form>
                                <Box mb={2}>
                                    <Typography variant="body2" component="label" htmlFor="name" sx={{ display: 'block', marginBottom: 1 }}>
                                        Name
                                    </Typography>
                                    <input type="text" id="name" name="name" style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                                </Box>
                                <Box mb={2}>
                                    <Typography variant="body2" component="label" htmlFor="email" sx={{ display: 'block', marginBottom: 1 }}>
                                        Email
                                    </Typography>
                                    <input type="email" id="email" name="email" style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                                </Box>
                                <Box mb={2}>
                                    <Typography variant="body2" component="label" htmlFor="message" sx={{ display: 'block', marginBottom: 1 }}>
                                        Message
                                    </Typography>
                                    <textarea id="message" name="message" rows="4" style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}></textarea>
                                </Box>
                                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#1976d2', color: 'white', border: 'none', cursor: 'pointer' }}>
                                    Send
                                </button>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default ContactUsPage;
