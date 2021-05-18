import { decodeToken } from "react-jwt";
import HttpClient from '../HttpRequests/HttpClient';
import UIkit from 'uikit';

const httpClient = new HttpClient();

const register = (new_user) => {
    return httpClient.post('users', new_user);
};

const login = (email, password) => {
    return httpClient.post('signin', {
        email, password
    }).then(response => {
        if (response.ok) {
            return response.json().then(data => {
                localStorage.setItem('token', data.token);
                return true;
            });
        } else {
            return response.json().then(data => {
                UIkit.notification({
                    message: data.message,
                    status: 'danger',
                    pos: 'top-right',
                    timeout: 5000
                });
                return false;
            });
        }
    });
};

const logout = () => {
    localStorage.removeItem("token");
};

const getCurrentUser = () => {
    return decodeToken(localStorage.getItem("token")).user;
};

const auth_functions = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default auth_functions;
