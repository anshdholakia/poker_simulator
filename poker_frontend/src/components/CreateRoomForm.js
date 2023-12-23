import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Box } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import PokerVariations from './PokerVariations';
import Alert from './Alert';
import axios from "axios";


const pokerVariations = [
    { name: 'Texas Holdem', logo: process.env.PUBLIC_URL + '/texas_holdem.jpg' },
    { name: 'More to come', logo: process.env.PUBLIC_URL + '/more_to_come.png' },
    // ...add other variations as needed
];

const CreateRoomForm = ({ onClose }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [currentIndex, setCurrentIndex] = useState(0);

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

    const formItem = { display: 'flex', flexDirection: 'column', marginBottom: '10px' }

    const onSubmit = data => {
        // calling the backend
        axios.post('http://localhost:8000/api/create_room', data).then(res => {
            handleOpen("Room Created!", "success");
        }).catch(res => {
            handleOpen(`Error: ${res.response.status}! ${res.response.data.detail}`, "error");
        });
    };

    return (
        <>
            <Box flexGrow={1} display="flex" justifyContent="center"
                alignItems="center" flexDirection="row" width="100%" height="100%">
                <PokerVariations pokerVariations={pokerVariations} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
                <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', margin: '20px', color: 'white', width: '50%' }}>
                    {currentIndex === 0 ?
                        <>
                            <h2>Create Room</h2>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div style={formItem}>
                                    <label>Room Name</label>
                                    <input {...register("room_name", { required: true })} />
                                    {errors.roomName && <p style={{ color: 'red' }}>Room name is required.</p>}
                                </div>

                                <div style={formItem}>
                                    <label>Lower Blind</label>
                                    <input type="number" defaultValue={1} {...register("lower_blind", { required: true, min: 1 })} />
                                    {errors.lowerBlind && <p style={{ color: 'red' }}>Lower blind is required and must be greater than 0.</p>}
                                </div>

                                <div style={formItem}>
                                    <label>Upper Blind</label>
                                    <input type="number" defaultValue={2} {...register("upper_blind", { required: true, min: 1 })} />
                                    {errors.upperBlind && <p style={{ color: 'red' }}>Upper blind is required and must be greater than 0.</p>}
                                </div>

                                <div style={formItem}>
                                    <label>Initial Money</label>
                                    <input type="number" defaultValue={200} {...register("initial_bid", { required: true, min: 1 })} />
                                    {errors.initialMoney && <p style={{ color: 'red' }}>Initial money is required and must be greater than 0.</p>}
                                </div>

                                <Button type="submit" variant="contained" color="primary" style={{ marginRight: '10px' }}>
                                    Create
                                </Button>
                                <Button onClick={onClose} variant="contained" color="error">
                                    Cancel
                                </Button>
                            </form>
                        </>
                        :
                        <h2>More to come...</h2>
                    }
                </div>
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default CreateRoomForm;
