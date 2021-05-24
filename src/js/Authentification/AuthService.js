import HttpClient from '../HttpRequests/HttpClient';
import UIkit from 'uikit';

const httpClient = new HttpClient();

/**
 * Register an new user
 * @param {*} new_user The information user to create
 * @returns The back-end response
 */
const register = (new_user) => {
    return httpClient.post('users', new_user);
};


/**
 * Login an user
 * @param {string} email The user's email
 * @param {string} password The user's password
 * @returns The back-end response
 * Check if the user has put the correct information and logged in if it is correct
 */
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

/**
 * Logout a user
 * Remove the token et the user information from local storage
 */
const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

/**
 * Get information about the currently logged in user
 * @returns User information
 */
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

/**
 * Set information about the currently logged in user
 * @param {*} user User information to set
 */
const setCurrentUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

/**
 * Get token about the currently logged in user
 * @returns The token
 */
const getCurrentToken = () => {
    return localStorage.getItem("token");
};

/**
 * Check if the token is the correct token for the logged in user
 * @returns True if it's correct otherwise False
 */
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
