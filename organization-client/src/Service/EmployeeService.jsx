import { observable, action, makeObservable } from 'mobx';
import axios from 'axios';

class EmployeeService {
    employees = [];

    constructor() {
        makeObservable(this, {
            employees: observable,
            postEmployee: action,
            getEmployee: action,
            fetchEmployees: action,
            deleteEmployee: action,
            putEmployee: action,
        });
    }

    async getEmployee() {
        try {
            const response = await axios.get("https://localhost:7035/api/Employee");
            this.fetchEmployees(response.data); // Call action to update employees
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
        return this.employees;
    }

    // Action to update employees
    fetchEmployees(employees) {
        this.employees = employees;
    }

    async postEmployee(employee) {
        try {
            const response = await axios.post("https://localhost:7035/api/Employee", employee);
            this.fetchEmployees(response.data); 
            console.log('Employee added successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error adding employee:', error);
            throw error;
        }
    }

    async putEmployee(id, updatedEmployee) {
        try {
            const response = await axios.put(`https://localhost:7035/api/Employee/${id}`, updatedEmployee);
            this.fetchEmployees(response.data); 
            console.log('Employee updated successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error updating employee:', error);
            throw error;
        }
    }

    async deleteEmployee(id) {
        try {
            await axios.delete(`https://localhost:7035/api/Employee/${id}`);
            this.employees = this.employees.filter(employee => employee.id !== id);
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    }
}

export default new EmployeeService();
