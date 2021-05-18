import { decodeToken } from "react-jwt";
import HttpClient from '../HttpRequests/HttpClient';
import UIkit from 'uikit';

const httpClient = new HttpClient();

const register = (new_user) => {
    return httpClient.post('api/users', new_user);
};

const login = (email, password) => {
    return httpClient.post('api/signin', {
        email, password
    }).then(response => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return response.json().then(data => {
                localStorage.setItem('token', JSON.stringify(data));
                return true;
            });
        } else {
            return response.text().then(text => {
                UIkit.notification({
                    message: text,
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
