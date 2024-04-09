import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { TextField, Button, Typography } from '@mui/material';
import RoleService from '../Service/RoleService';
import { useNavigate } from 'react-router-dom';


const AddRole = observer(() => {
    const [roleData, setRoleData] = useState({
        name: '', // ערך מוגדר כברירת מחדל
        // description: ''
    });

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRoleData({
            ...roleData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        console.log("addrole:", token)
        // console.log(roleData)
        try {
            await RoleService.postRole(roleData, token);
            console.log('Role added successfully!');
            navigate('/')
        } catch (error) {
            console.error('Error adding role:', error);
        }
    };

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Add Role
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    name="name"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={roleData.name}
                    onChange={handleInputChange}
                    style={{ marginBottom: '16px' }}
                />
                {/* <TextField
                    name="description"
                    label="Description"
                    variant="outlined"
                    fullWidth
                    value={roleData.description}
                    onChange={handleInputChange}
                    style={{ marginBottom: '16px' }}
                /> */}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"

                >
                    Add
                </Button>
            </form>
        </div>
    );
});

export default AddRole;
