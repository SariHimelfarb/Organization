//react
import React, { useState } from 'react';
import { observer } from "mobx-react"
//jsx
import EmployeeService from '../Service/EmployeeService';
//mui
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


const EditEmployeeDialog = observer(({ employee, employeeId, open, onClose }) => {


    const [employeeData, setEmployeeData] = useState({
        identity: employee.identity,
        firstName: employee.firstName,
        lastName: employee.lastName,
        startOfWork: convertToDateFormat(employee.startOfWork),
        dateOfBirth: convertToDateFormat(employee.dateOfBirth),
        gender: employee.gender
    });

    const [formErrors, setFormErrors] = useState({});

    //מכיוון שבשרת התאריך שמור כסטרינג נצרכת המרה
    function convertToDateFormat(isoDate) {
        const date = new Date(isoDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    }

    const handleInputChange = (event) => {

        const { name, value } = event.target;
        setEmployeeData({ ...employeeData, [name]: value });
    };


    const handleEditEmployee = async () => {

        try {
            await EmployeeService.putEmployee(employeeId, employeeData);
            console.log('Employee editing successfully:', employeeData);
            onClose();

        } catch (error) {
            console.error('Error editing employee:', error);
        }
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
            handleEditEmployee();
        }
    };

    const canceling = () => {
        setEmployeeData({
            identity: employee.identity,
            firstName: employee.firstName,
            lastName: employee.lastName,
            startOfWork: convertToDateFormat(employee.startOfWork),
            dateOfBirth: convertToDateFormat(employee.dateOfBirth),
            gender: employee.gender
        });
        setFormErrors({}); // Clear form errors when canceling
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Identity"
                    type="text"
                    name="identity"
                    value={employeeData.identity}
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                        onChange={handleInputChange}
                        fullWidth
                    >
                        <MenuItem value={0}>Male</MenuItem>
                        <MenuItem value={1}>Female</MenuItem>
                    </Select>
                    <FormHelperText>{formErrors.gender || ''}</FormHelperText>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={canceling}>Cancel</Button>
                <Button onClick={handleSubmit}>Edit</Button>
            </DialogActions>
        </Dialog>
    );
});


export default EditEmployeeDialog;


