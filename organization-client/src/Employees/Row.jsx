import React, { useState } from "react";
import { observer } from "mobx-react";
import EmployeeService from "../Service/EmployeeService";
import EditEmployeeDialog from "./EditEmployee";
import AddPositionDialog from "./AddPosition";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ViewListIcon from '@mui/icons-material/ViewList';
import Swal from 'sweetalert2';

const Row = observer((props) => {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [openAddPositionDialog, setOpenAddPositionDialog] = useState(false);
  const [openEditEmployeeDialog, setOpenEditEmployeeDialog] = useState(false);

  const handleOpenEditEmployeeDialog = () => {
    setOpenEditEmployeeDialog(true);
  };

  const handleCloseEditEmployeeDialog = () => {
    setOpenEditEmployeeDialog(false);
  };

  const handleOpenAddPositionDialog = () => {
    setOpenAddPositionDialog(true);
  };

  const handleCloseAddPositionDialog = () => {
    setOpenAddPositionDialog(false);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure you want to delete this member?',
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await EmployeeService.deleteEmployee(id);
          Swal.fire(
            'Deleted!',
            'The member has been deleted.',
            'success'
          );
        } catch (error) {
          console.error('Error deleting Member:', error);
          Swal.fire(
            'Error!',
            'An error occurred while deleting the member.',
            'error'
          );
        }
      }
    });
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <KeyboardArrowUpIcon />
            ) : (
              <ViewListIcon />
            )}
          </IconButton>
          <IconButton aria-label="delete" size="small" onClick={() => handleDelete(row.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="edit" size="small" onClick={handleOpenEditEmployeeDialog}>
            <EditIcon />
          </IconButton>
          <EditEmployeeDialog employee={row} employeeId={row.id} open={openEditEmployeeDialog} onClose={handleCloseEditEmployeeDialog} />
        </TableCell>
        <TableCell component="th" scope="row">{row.identity}</TableCell>
        <TableCell align="right">{row.firstName}</TableCell>
        <TableCell align="right">{row.lastName}</TableCell>
        <TableCell align="right">{new Date(row.startOfWork).toLocaleDateString()}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div" style={{ color: '#757575' }}>
                Positions
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>Role</TableCell>
                    <TableCell align="left" style={{ fontWeight: 'bold' }}>Admin</TableCell>
                    <TableCell align="right" style={{ fontWeight: 'bold' }}>Date of Entry into Office</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.position.map((positionRow, index) => (
                    <TableRow key={index}>
                      <TableCell>{positionRow.role.name}</TableCell>
                      <TableCell align="left">{positionRow.isAdmin ? 'true' : 'false'}</TableCell>
                      <TableCell align="right">{new Date(positionRow.enterDate).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            <Button variant="outlined" startIcon={<AddCircleOutlineIcon />} onClick={handleOpenAddPositionDialog} style={{ color: '#9c27b0' }}>
              Add Position
            </Button>
            <AddPositionDialog employee={row} employeeId={row.id} open={openAddPositionDialog} onClose={handleCloseAddPositionDialog} />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
});

export default Row;
