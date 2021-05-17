import { decodeToken } from "react-jwt";
import HttpClient from '../HttpRequests/HttpClient';

const httpClient = new HttpClient();

const register = (new_user) => {
    return httpClient.post('users', new_user);
};

const login = (email, password) => {
    return httpClient.post('api/signin', {
        email, password
    }).then(response => response.json())
    .then(data => {
        localStorage.setItem('token', JSON.stringify(data));
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
