import React, { useState } from 'react';
import { observer } from "mobx-react";
import EmployeeService from '../Service/EmployeeService';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    FormHelperText, 
} from '@mui/material';

const AddEmployeeDialog = observer(({ open, onClose }) => {
    const [employeeData, setEmployeeData] = useState({
        identity: '',
        firstName: '',
        lastName: '',
        startOfWork: '',
        dateOfBirth: '',
        gender: ''
    });
    const [formErrors, setFormErrors] = useState({});

    const onSubmit = async () => {
        try {
            await EmployeeService.postEmployee(employeeData);
            console.log('Employee added successfully:', employeeData);
            finish();
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    const finish = () => {
        setEmployeeData({
            identity: '',
            firstName: '',
            lastName: '',
            startOfWork: '',
            dateOfBirth: '',
            gender: ''
        });
        setFormErrors({}); // Clear form errors when canceling
        onClose();
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEmployeeData(prevState => ({
            ...prevState,
            [name]: value
        }));

        setFormErrors(prevErrors => ({
            ...prevErrors,
            [name]: '' // Clear error message when value changes
        }));
    };

    const handleValidation = () => {
        const errors = {};
        if (!employeeData.identity || !/^\d{9}$/.test(employeeData.identity)) {
            errors.identity = 'Invalid identity number';
        }
        if (!employeeData.firstName) {
            errors.firstName = 'First Name is required';
        }
        if (!employeeData.lastName) {
            errors.lastName = 'Last Name is required';
        }
        if (!employeeData.startOfWork) {
            errors.startOfWork = 'Start of Work is required';
        }
        if (!employeeData.dateOfBirth) {
            errors.dateOfBirth = 'Date of Birth is required';
        }
        if (employeeData.gender != 0 && employeeData.gender != 1) {
            errors.gender = 'Gender is required';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = handleValidation();
        if (isValid) {
            onSubmit();
        }
    };

    return (
        <Dialog open={open}>
            <DialogTitle>Add Employee</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Identity"
                        type="text"
                        name="identity"
                        value={employeeData.identity}
                        onChange={handleChange}
                        fullWidth
                        error={!!formErrors.identity}
                        helperText={formErrors.identity || ''}
                    />
                    <TextField
                        margin="dense"
                        label="First Name"
                        type="text"
                        name="firstName"
                        value={employeeData.firstName}
                        onChange={handleChange}
                        fullWidth
                        error={!!formErrors.firstName}
                        helperText={formErrors.firstName || ''}
                    />
                    <TextField
                        margin="dense"
                        label="Last Name"
                        type="text"
                        name="lastName"
                        value={employeeData.lastName}
                        onChange={handleChange}
                        fullWidth
                        error={!!formErrors.lastName}
                        helperText={formErrors.lastName || ''}
                    />
                    <TextField
                        margin="dense"
                        label="Start of Work"
                        type="date"
                        name="startOfWork"
                        value={employeeData.startOfWork}
                        onChange={handleChange}
                        fullWidth
                        error={!!formErrors.startOfWork}
                        helperText={formErrors.startOfWork || ''}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Date of Birth"
                        type="date"
                        name="dateOfBirth"
                        value={employeeData.dateOfBirth}
                        onChange={handleChange}
                        fullWidth
                        error={!!formErrors.dateOfBirth}
                        helperText={formErrors.dateOfBirth || ''}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <FormControl fullWidth error={!!formErrors.gender}>
                        <InputLabel id="gender-label">Gender</InputLabel>
                        <Select
                            labelId="gender-label"
                            id="gender"
                            name="gender"
                            value={employeeData.gender}
                            onChange={handleChange}
                            fullWidth
                        >
                            <MenuItem value={0}>Male</MenuItem>
                            <MenuItem value={1}>Female</MenuItem>
                        </Select>
                        <FormHelperText>{formErrors.gender || ''}</FormHelperText>
                    </FormControl>
                    <DialogActions>
                        <Button onClick={finish}>Cancel</Button>
                        <Button type="submit">Add</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
});

export default AddEmployeeDialog;
