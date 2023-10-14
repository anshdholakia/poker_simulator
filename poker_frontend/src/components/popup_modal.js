import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

const PopupComponent = ({ isOpen, onClose, message }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{message === 'login' ? 'Login' : 'Signup'}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {message === 'signup' && (
                        <TextField
                            fullWidth
                            label="Username"
                            {...register("userName", { required: "User Name is required." })}
                            helperText={errors.fullName?.message}
                            error={Boolean(errors.fullName)}
                        />
                    )}
                    <TextField
                        fullWidth
                        label="Email"
                        {...register("email", { required: "Email is required." })}
                        helperText={errors.email?.message}
                        error={Boolean(errors.email)}
                    />
                    <TextField
                        fullWidth
                        type="password"
                        label="Password"
                        {...register("password", { required: "Password is required." })}
                        helperText={errors.password?.message}
                        error={Boolean(errors.password)}
                    />
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
    );
}

export default PopupComponent;
