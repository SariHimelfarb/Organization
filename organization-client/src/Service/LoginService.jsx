import axios from "axios";

class LoginService{

    async login(username, password) {
        try {
            const response = await axios.post('https://localhost:7035/api/Auth', {
                userName: username,
                password: password
            });
            return response.data;
        } catch (error) {
            throw new Error('Login failed');
        }
    } 
}

export default new LoginService();