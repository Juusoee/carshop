import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function EditCar(props) {

    const [open, setOpen] = useState(false);
    const [car, setCar] = useState(
        {
            brand: '',
            model: '',
            color: '',
            fuel: '',
            year: '',
            price: ''
        })

    const handleClickOpen = () => {
        setCar({ 
            brand: props.car.brand,
            model: props.car.model,
            color: props.car.color, 
            fuel: props.car.fuel, 
            year: props.car.year, 
            price: props.car.price
         })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setCar({ ...car, [event.target.name]: event.target.value })
    }

    const updateCar = () => {
        props.updateCar(car, props.car._links.car.href)
        handleClose();
    }
    return (
        <Container fluid>
            <Button variant="secondary" size="sm" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit car</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="brand"
                        value={car.brand}
                        label="Brand"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={e => handleInputChange(e)}
                    />
                    <TextField
                        margin="dense"
                        name="model"
                        value={car.model}
                        label="model"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={e => handleInputChange(e)}
                    />
                    <TextField
                        margin="dense"
                        name="color"
                        value={car.color}
                        label="Color"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={e => handleInputChange(e)}
                    />
                    <TextField
                        margin="dense"
                        name="fuel"
                        value={car.fuel}
                        label="Fuel"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={e => handleInputChange(e)}
                    />
                    <TextField
                        margin="dense"
                        name="year"
                        value={car.year}
                        label="Year"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={e => handleInputChange(e)}
                    />
                    <TextField
                        margin="dense"
                        name="price"
                        value={car.price}
                        label="Price"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={e => handleInputChange(e)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="primary" size="sm" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" size="sm" onClick={updateCar}>Update</Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}