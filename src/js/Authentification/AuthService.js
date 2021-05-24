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
                localStorage.setItem('user', JSON.stringify(data.user));
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
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const setCurrentUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

const getCurrentToken = () => {
    return localStorage.getItem("token");
};

const verifToken = () => {
    return httpClient.post('users/verif', {
        id: getCurrentUser().user_id,
        token: getCurrentToken(),
    }).then(response => response.json()).then(data => data.login);
}

const auth_functions = {
    register,
    login,
    logout,
    getCurrentUser,
    setCurrentUser,
    getCurrentToken,
    verifToken,
};

export default auth_functions;
