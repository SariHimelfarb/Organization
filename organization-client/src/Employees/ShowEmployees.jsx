
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import * as xlsx from 'xlsx';
import { saveAs } from "file-saver";
import { useNavigate } from 'react-router-dom';

import EmployeeService from "../Service/EmployeeService";
import Row from "./Row";
import AddEmployeeDialog from "./AddEmployee";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button, TextField } from "@mui/material";
import GetAppIcon from '@mui/icons-material/GetApp';
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { ExitToApp, AddCircleOutline, GetApp, Search } from "@mui/icons-material";

const Employees = observer(() => {
  const [rows, setRows] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const employeesData = await EmployeeService.getEmployee();
      setRows(employeesData);
      setLoading(false);
    };
    fetchData();
  }, [rows]);

  const filteredData = rows.filter((employee) =>
    Object.values(employee).some((value) =>
    typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleOpenAddMemberDialog = () => {
    setIsAddDialogOpen(true);
  };

  const handleCloseAddMemberDialog = () => {
    setIsAddDialogOpen(false);
  };

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    const filteredRows = rows.filter((row) => {
      return (
        row.identity.toString().includes(value) ||
        (row.firstName && row.firstName.toLowerCase().includes(value.toLowerCase())) ||
        (row.lastName && row.lastName.toLowerCase().includes(value.toLowerCase())) ||
        (row.StartOfWork && row.StartOfWork.includes(value))
      );
    });
    console.log("filter rows:", filteredRows)
    console.log("rows:", rows)
    console.log("filter rows:", filteredRows)

    setFilteredRows(filteredRows);
  };

  const handleDownloadExcelClick = () => {
    const data = [
      ['Identity', 'First Name', 'Last Name', 'Start Of Work', 'Date Of Birth', 'Gender'],
      ...filteredRows.map(row => [
        row.identity,
        row.firstName,
        row.lastName,
        row.startOfWork,
        row.dateOfBirth,
        row.gender
      ])
    ];

    const sheet = xlsx.utils.aoa_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, sheet, "Employees");

    const excelBuffer = xlsx.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "employees.xlsx");
  };

  const handleAddRoleClick = () => {
    navigate('/add-role');
  };

  const handleLogout = () => {
    console.log("showemployee:", localStorage.getItem('token'))
    localStorage.removeItem('token');
    // navigate('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AppBar position="static" sx={{ background: '#757575' }}>
        <Toolbar>
          {token && (
            <IconButton color="inherit" onClick={handleLogout}>
              <ExitToApp />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Employee Management
          </Typography>
          {token ? (
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircleOutline />}
              onClick={handleAddRoleClick}
              sx={{ mr: 2, bgcolor: '#9c27b0', color: '#ffffff' }}
            >
              Add Role
            </Button>
          ) : (
            <Button color="inherit" onClick={() => navigate('/login')} sx={{ mr: 2 }}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Toolbar />

      <div style={{ marginBottom: '10px' }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchInputChange}
          InputProps={{
            endAdornment: (
              <IconButton>
                <Search />
              </IconButton>
            ),
          }}
        />
      </div>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead sx={{ backgroundColor: '#757575' }}>
            <TableRow>
              <TableCell />
              <TableCell style={{ fontWeight: 'bold', color: '#ffffff' }}>ID</TableCell>
              <TableCell align="right" style={{ fontWeight: 'bold', color: '#ffffff' }}>Name</TableCell>
              <TableCell align="right" style={{ fontWeight: 'bold', color: '#ffffff' }}>Last Name</TableCell>
              <TableCell align="right" style={{ fontWeight: 'bold', color: '#ffffff' }}>Date Of Start Working</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData .map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleOpenAddMemberDialog}
        sx={{ mt: 2, mb: 2, bgcolor: '#9c27b0', color: '#ffffff' }}
      >
        Add Employee
      </Button>

      <AddEmployeeDialog open={isAddDialogOpen} onClose={handleCloseAddMemberDialog} />

      <Button
        variant="contained"
        startIcon={<GetAppIcon />}
        onClick={handleDownloadExcelClick}
        download
        sx={{ mr: 2, bgcolor: '#9c27b0', color: '#ffffff' }}
      >
        Download Excel
      </Button>
    </div>
  );
});

export default Employees;
