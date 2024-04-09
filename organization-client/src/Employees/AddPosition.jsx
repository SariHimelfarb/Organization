import React, { useState, useEffect } from 'react';
import { observer } from "mobx-react";
import PositionService from '../Service/PositionService';
import RoleService from '../Service/RoleService';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const AddPositionDialog = observer(({ employee, employeeId, open, onClose }) => {
    const [positionData, setPositionData] = useState({
        roleId: '',
        enterDate: '',
        isAdmin: '',
        employeeId: employeeId
    });

    const [roles, setRoles] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const rolesData = await RoleService.getRole();
            setRoles(rolesData);
        };

        fetchData();
    }, []);

    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPositionData({ ...positionData, [name]: value });
    };

    const handleAddPosition = async () => {
        try {
            await PositionService.postPosition(positionData);
            console.log('Position added successfully:', positionData);
            finish();
        } catch (error) {
            console.error('Error adding position:', error);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!positionData.roleId) {
            newErrors.roleId = 'Role is required';
        }
        if (!positionData.enterDate) {
            newErrors.enterDate = 'Enter Date is required';
        }

        if (positionData.enterDate < employee.startOfWork) {
            newErrors.enterDate = 'Enter Date must be after start';
        }

        console.log(positionData.isAdmin);
        if (positionData.isAdmin === '') {
            newErrors.isAdmin = 'Is Admin is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            handleAddPosition();
        }
    };

    const finish = () => {
        setPositionData(
            {
                roleId: '',
                enterDate: '',
                isAdmin: '',
                employeeId: employeeId
            }
        )
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Position</DialogTitle>
            <DialogContent>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                        labelId="role-label"
                        id="role-select"
                        name="roleId"
                        value={positionData.roleId}
                        onChange={handleInputChange}
                        label="Role"
                        error={!!errors.roleId}
                    >
                        {roles.map((role) => (
                            <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
                        ))}
                    </Select>
                    {errors.roleId && <span style={{ color: 'red' }}>{errors.roleId}</span>}
                </FormControl>
                <TextField
                    margin="dense"
                    id="enterDate"
                    name="enterDate"
                    label="Enter Date"
                    type="date"
                    value={positionData.enterDate}
                    onChange={handleInputChange}
                    fullWidth
                    error={!!errors.enterDate}
                    helperText={errors.enterDate}
                />
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="isAdmin-label">Is Admin</InputLabel>
                    <Select
                        labelId="isAdmin-label"
                        id="isAdmin-select"
                        name="isAdmin"
                        value={positionData.isAdmin}
                        onChange={handleInputChange}
                        label="Is Admin"
                        error={!!errors.isAdmin}
                    >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                    </Select>
                    {errors.isAdmin && <span style={{ color: 'red' }}>{errors.isAdmin}</span>}
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={finish}>Cancel</Button>
                <Button onClick={handleSubmit}>Add</Button>
            </DialogActions>
        </Dialog>
    );
});

export default AddPositionDialog;
