const axios = require('axios');
const keys = require('./config/keys');

const urlRoot = keys.urlRoot;

class AuthLib {
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

    newAdmin = async (email, password, token) => {
        let success = false;
        let signupInfo = null;

        try {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
            var res = await axios.post(`${urlRoot}/api/admin`, {
                email,
                password
            });
            success = true;
            signupInfo = res.data;
        }
        catch (err) {
            console.log('ERROR', err);
            success = false;
        }

        return {
            success,
            signupInfo
        };
    }

    fetchUsers = async (token) => {
        try {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
            var res = await axios.get(`${urlRoot}/api/user`);
            return res.data;
        }
        catch (err) {
            console.log('ERROR', err.message);
            return [];
        }

    }
}

module.exports = AuthLib;