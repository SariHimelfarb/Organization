import { observable, action, makeObservable } from 'mobx';
import axios from 'axios';

class PositionService {
    positions = [];

    constructor() {
        makeObservable(this, {
            positions: observable,
            postPosition: action,
            getPosition: action,
            fetchPosition: action,
        });
    }


    async getPosition() {
        try {
            const response = await axios.get("https://localhost:7035/api/Position");
            this.fetchPosition(response.data); // Call action to update members
        } catch (error) {
            console.error("Error fetching position:", error);
        }
        return this.positions;
    }

    // Action to update members
    fetchPosition(positions) {
        this.positions = positions;
    }

    async postPosition(p) {
        try {
            const response = await axios.post("https://localhost:7035/api/Position", p);
            this.fetchPosition(response.data); // Update local positions with response data
            console.log('Position added successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error adding position:', error);
            throw error; // Rethrow the error to handle it in the calling component
        }
    }
}

export default new PositionService();
