import axios from 'axios';

export default class Lib {

    static newTask = async (task) => {
        var res = await axios.post('/api/new_task', task);
        return res.data;
    }

    static getTasks = async () => {
        var res = await axios.get(`/api/task`);
        return res.data.tasks;
    }

    static completeTask = async (id) => {
        var res = await axios.post(`/api/task/${id}/complete`);
        return res.data;
    }

    static signup = async (email, password) => {
        var res = await axios.post('/api/signup', { email, password });
        return res.data.success;
    }

    static login = async (email, password) => {
        var res = await axios.post('/api/login', { email, password });
        if (res.data.success) {
            const expiresAt = Number(res.data.expiresIn) + new Date().getTime();
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('expiresAt', expiresAt);
            localStorage.setItem('userEmail', res.data.user.email);
            return res.data;
        }

        return { success: false }
    }

    static logout = async () => {
        await axios.get('/api/logout');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('expiresAt');
        localStorage.removeItem('userEmail');
        return;
    }

    static isAuthenticated = () => {
        var now = new Date().getTime();
        var exp = Number(localStorage.getItem('expiresAt'));
        return now < exp;
    }

    static getUserEmail = () => {
        if (Lib.isAuthenticated()) {
            return localStorage.getItem('userEmail')
        } else {
            return null;
        }
    }
}