import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Addcar from './Addcar';
import EditCar from './Editcar';

export default function Carlist() {

    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });


    useEffect(() => fetchData(), [])

    const fetchData = () => {
        fetch('http://carrestapi.herokuapp.com/cars')
            .then(res => res.json())
            .then(data => setCars(data._embedded.cars))

    }

    const saveCar = (car) => {
        fetch('http://carrestapi.herokuapp.com/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
            .then(res => fetchData())
            .catch(err => console.error(err))
    }

    const updateCar = (car, params) => {
        fetch(params, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    const deleteCar = (params) => {
        if (window.confirm('Are you sure?')) {
            fetch(params.value, { method: 'DELETE' })
                .then(res => fetchData())
                .catch(err => console.error(err))
            setOpen(true)
        }
    }
    
    const columns = [
        { headerName: "Brand", field: "brand", sortable: true, filter: true, },
        { headerName: "Model", field: "model", sortable: true, filter: true, width: 150 },
        { headerName: "Color", field: "color", sortable: true, filter: true, width: 100 },
        { headerName: "Fuel", field: "fuel", sortable: true, filter: true, width: 100 },
        { headerName: "Year", field: "year", sortable: true, filter: true, width: 100 },
        { headerName: "Price", field: "price", sortable: true, filter: true, width: 100 },
        {
            headerName: "", width: 100,
            cellRendererFramework: (params) => <EditCar updateCar={updateCar} car={params.data} />
        },
        {
            headerName: "", field: "_links.self.href", width: 100,
            cellRendererFramework: (params) =>
                <Button variant="danger" size="sm" onClick={() => deleteCar(params)}>Delete</Button>
            
        }
    ]

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Container className="ag-theme-material" style={{ height: '1500px', width: '70%', margin: 'auto' }}>
            <Addcar saveCar={saveCar} />
            <AgGridReact
                columnDefs={columns}
                rowData={cars}>
            </AgGridReact>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Record deleted successfully!
                </Alert>
            </Snackbar>
        </Container>
    )
}