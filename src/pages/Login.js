import React, { useState } from "react";
import { login, selectUser } from "../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    CircularProgress,
    Paper,
    Avatar,
    Grid,
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import './Login.css';  // Assuming you have some CSS for additional custom styling

const AUTH_URL = 'https://downsouth-auth.onrender.com' || 'http://localhost:4001/api/v1/auth/login';
const theme = createTheme();

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post(
                `https://ds-central.onrender.com/auth/api/v1/auth/login`,
                {
                    username: email,
                    password: password,
                }
            );

            dispatch(login(response.data));

            setEmail("");
            setPassword("");

            if (response.data.user_type === "m_center") {
                window.location = "/m_home";
            } else if (response.data.user_type === "tourist") {
                window.location = "/t_home";
            } else if (response.data.user_type === "admin") {
                window.location = "/a_home";
            }

            setLoading(false);
        } catch (error) {
            setError("Login failed. Please check your credentials and try again.");
            setLoading(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={6}>
                        <Paper elevation={6} sx={{ padding: 4, mt: 8, borderRadius: 2,ml:-40 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Login
                                </Typography>
                                {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
                                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Username"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        variant="outlined"
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        variant="outlined"
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        sx={{ mt: 3, mb: 2 }}
                                        disabled={loading}
                                    >
                                        {loading ? <CircularProgress size={24} /> : "Login"}
                                    </Button>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' , mt:20,width:500}}>
                            <img src="/images/login.svg" alt="Sample" style={{ maxWidth: '100%', height: 'auto' }} />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default Login;
