import React, { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
    Divider,
    IconButton,
    InputAdornment,
    Link,
    Grid
} from "@mui/material";
import { Visibility, VisibilityOff, PermIdentity, LockOutlined, Facebook, Apple, Google } from "@mui/icons-material";
import { useLogin } from "../hooks/useLogin";
import axios from "axios";

const Login: React.FC = () => {
    const {
        login,
        loading: isLoggingIn,
        isSuccess
    } = useLogin();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: "USER",
        rememberMe: false
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        await login(formData);
        if (!isSuccess) {
            // reset();
        }
    };

    const socialLoginHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const { name } = e.currentTarget;

        try {
            const resp = await axios.get(`http://localhost:8080/auth/oauth/${name}/login`);
            console.log(resp.data);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Grid container sx={{ minHeight: "100vh" }}>
            {/* Left Hero Section */}
            <Grid
                size={{ lg: 6 }}
                sx={{
                    display: { xs: "none", lg: "flex" },
                    backgroundImage: `linear-gradient(135deg, rgba(35,48,68,0.9), rgba(35,48,68,0.7)), url("images/login bg.png")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "white",
                    flexDirection: "column",
                    justifyContent: "center",
                    px: 8
                }}
            >
                <Box maxWidth={400}>
                    <Typography variant="h3" fontWeight="bold" gutterBottom>
                        Welcome Back to ShopNest
                    </Typography>
                    <Typography variant="h6" color="whiteAlpha.80" gutterBottom>
                        Access your account to continue shopping our curated collection of premium products.
                    </Typography>
                    <Box mt={4}>
                        <Box display="flex" alignItems="center" mb={1}>
                            <Box width={8} height={8} bgcolor="secondary.main" borderRadius="50%" mr={2} />
                            <Typography>Exclusive member benefits</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mb={1}>
                            <Box width={8} height={8} bgcolor="secondary.main" borderRadius="50%" mr={2} />
                            <Typography>Early access to new arrivals</Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Box width={8} height={8} bgcolor="secondary.main" borderRadius="50%" mr={2} />
                            <Typography>Personalized recommendations</Typography>
                        </Box>
                    </Box>
                </Box>
            </Grid>

            {/* Right Login Form Section */}
            <Grid
                size={{ xs: 12, lg: 6 }}
                container
                justifyContent="center"
                alignItems="center"
                sx={{ my: 3, backgroundColor: "background.paper", px: 4 }}
            >
                <Box maxWidth={450} width="100%">
                    <Card sx={{ boxShadow: 6 }}>
                        <CardContent>
                            <Box textAlign="center" mb={3}>
                                <Typography variant="h5" fontWeight="bold">Sign In</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Enter your credentials to access your account
                                </Typography>
                            </Box>

                            {/* Social Login */}
                            <Grid container spacing={2} mb={3}>
                                <Grid size={{ xs: 4 }}>
                                    <Button 
                                      onClick={socialLoginHandler} 
                                      name="google" 
                                      fullWidth 
                                      variant="outlined" 
                                      startIcon={<Google />} 
                                      sx={{ height: 40 }}
                                    >
                                        Google
                                    </Button>
                                </Grid>
                                <Grid size={{ xs: 4 }}>
                                    <Button 
                                      onClick={socialLoginHandler} 
                                      name="facebook" 
                                      fullWidth 
                                      variant="outlined" 
                                      startIcon={<Facebook />} 
                                      sx={{ height: 40 }}
                                    >
                                        Facebook
                                    </Button>
                                </Grid>
                                <Grid size={{ xs: 4 }}>
                                    <Button 
                                      onClick={socialLoginHandler} 
                                      name="github" 
                                      fullWidth 
                                      variant="outlined" 
                                      startIcon={<Apple />} 
                                      sx={{ height: 40 }}
                                    >
                                        Github
                                    </Button>
                                </Grid>
                            </Grid>

                            <Divider sx={{ mb: 3 }}>or continue with email</Divider>

                            {/* Login Form */}
                            <form>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Username"
                                    name="username"
                                    type="text"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    margin="normal"
                                    variant="outlined"
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PermIdentity />
                                            </InputAdornment>
                                        )
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    margin="normal"
                                    variant="outlined"
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOutlined />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />

                                <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={formData.rememberMe}
                                                onChange={(e) =>
                                                    setFormData(prev => ({ ...prev, rememberMe: e.target.checked }))
                                                }
                                            />
                                        }
                                        label="Remember me"
                                    />
                                    <Link href="/forgot-password" underline="hover" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Box>

                                <Button onClick={handleSubmit} variant="contained" loading={isLoggingIn} color="primary" fullWidth sx={{ mt: 2, height: 33 }}>
                                    {isLoggingIn ? 'Signing in...' : 'Sign In'}
                                </Button>
                                <Button onClick={() => {
                                    setFormData({ password: "tharun123", rememberMe: true, role: "USER", username: "tharun" })
                                }} variant="contained" color="primary" fullWidth sx={{ mt: 2, height: 33 }}>
                                    Use Guest Credentials
                                </Button>
                            </form>

                            <Box textAlign="center" mt={3}>
                                <Typography variant="body2" color="text.secondary">
                                    Don't have an account?{" "}
                                    <Link href="/register" underline="hover">
                                        Create one here
                                    </Link>
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Login;