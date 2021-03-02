const axios = require('axios');
const keys = require('../config/keys');

const urlRoot = keys.urlRoot;

class Lib {
    completeTask = async (id, token) => {
        try {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
            var res = await axios.put(`${urlRoot}/api/task/${id}/complete`);
            console.log(res);
            return true
        }
        catch (err) {
            console.log('ERROR', err);
            return false;
        }
    }

    getTasks = async (token) => {
        let tasks = [];

        try {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
            var res = await axios.get(`${urlRoot}/api/task`);
            tasks = res.data;
        }
        catch (err) {
            console.log('ERROR', err);
        }

        return tasks;
    }

    login = async (email, password) => {
        let success = false;
        let loginInfo = null;
    
        try {
            var res = await axios.post(`${urlRoot}/api/login`, {
                email,
                password
            });
            success = true;
            loginInfo = res.data;
        }
        catch (err) {
            console.log('ERROR', err);
            success = false;
        }

        return {
            success,
            loginInfo
        };
    }

    signup = async (email, password) => {
        let success = false;
    
        try {
            const res = await axios.post(`${urlRoot}/api/user`, {
                email,
                password
            });
            success = true;
        }
        catch (err) {
            console.log('ERROR', err);
            success = false;
        }

        return {
            success,
        };
    }

    newTask = async (task, token) => {
        let success = false;

        try {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
            var res = await axios.post(`${urlRoot}/api/task`, {
                description: task.description
            });
            success = true;
        }
        catch (err) {
            console.log('ERROR', err);
            success = false;
        }

        return {
            success,
        };
    }
}

module.exports = Lib;