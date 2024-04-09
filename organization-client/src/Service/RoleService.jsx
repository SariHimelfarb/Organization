import { observable, action, makeObservable } from 'mobx';
import axios from 'axios';

class RoleService {
    roles = [];

    constructor() {
        makeObservable(this, {
            roles: observable,
            postRole: action,
            getRole: action,
            fetchRole: action,
        });
    }

    async getRole() {
        try {
            const response = await axios.get("https://localhost:7035/api/Role");
            this.fetchRole(response.data); // Call action to update members
        } catch (error) {
            console.error("Error fetching role:", error);
        }
        return this.roles;
    }

    // Action to update members
    fetchRole(roles) {
        this.roles = roles;
    }


    async postRole(r, token) {
        console.log(token)
        const headers = {
            Authorization: `Bearer ${token}` // Add token to Authorization header
        };

        try {
            const response = await axios.post("https://localhost:7035/api/Role", r, { headers }); // Send request with token
            this.fetchRole(response.data); // Update local roles with response data
            console.log('Role added successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error adding role:', error);
            throw error; // Rethrow the error to handle it in the calling component
        }
    }
}

export default new RoleService();
