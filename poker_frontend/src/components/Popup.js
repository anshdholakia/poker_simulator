import { React, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import Snackbar from '@mui/material/Snackbar';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from './Alert';
import axios from "axios";


const PopupComponent = ({ isOpen, onClose, message, setLoggedIn }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [severity, setSeverity] = useState("success");

    const handleOpen = (message, severityType) => {
        setSnackbarMessage(message);
        setSeverity(severityType);
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        // check if keys in data contains username or not
        if (message === 'signup') {
            if (data.password !== data.confirmPassword) {
                handleOpen("Passwords do not match", "error");
                return; // Stop the form submission if passwords do not match
            }
            // use axios to send post request to the backend
            axios.post('http://localhost:8000/api/signup', data).then(res => {
                handleOpen("Success! Account created!", "success");
                setLoggedIn(data.username);
            }).catch(res => {
                handleOpen(`Error: ${res.response.status}! ${res.response.data.detail}`, "error");
            });
        } else {
            // use axios to send get request to the backend
            axios.post('http://localhost:8000/api/login', data).then(res => {
                handleOpen("Logged in!", "success");
                setLoggedIn(res.data.username);
            }).catch(res => {
                handleOpen(`Error: ${res.response.status}! ${res.response.data.detail}`, "error");
            });
        }

        onClose();
    };

    return (
        <>
            <Dialog open={isOpen} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" style={{ marginBottom: "20px", zIndex: 0 }}>{message === 'login' ? 'Login' : 'Signup'}</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {message === 'signup' && (
                            <TextField
                                fullWidth
                                type="text"
                                label="Username"
                                {...register("username", { required: "User Name is required." })}
                                helperText={errors.fullName?.message}
                                error={Boolean(errors.fullName)}
                                style={{ marginBottom: "20px" }}
                            />
                        )}
                        <TextField
                            fullWidth
                            type="email"
                            label="Email"
                            {...register("email", { required: "Email is required." })}
                            helperText={errors.email?.message}
                            error={Boolean(errors.email)}
                            style={{ marginBottom: "20px" }}
                        />
                        <TextField
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            label="Password"
                            {...register("password", { required: "Password is required." })}
                            helperText={errors.password?.message}
                            error={Boolean(errors.password)}
                            style={{ marginBottom: "20px" }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {message === 'signup' && (
                            <TextField
                                fullWidth
                                type={showConfirmPassword ? 'text' : 'password'}
                                label="Retype Password"
                                {...register("confirmPassword", {
                                    required: "Please retype your password.",
                                })}
                                helperText={errors.confirmPassword?.message}
                                error={Boolean(errors.confirmPassword)}
                                style={{ marginBottom: "20px" }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle confirm password visibility"
                                                onClick={handleClickShowConfirmPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                        <DialogActions>
                            <Button onClick={onClose} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
                                {message === 'login' ? 'Login' : 'Signup'}
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>

            </Dialog>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}

export default PopupComponent;
