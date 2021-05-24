import React, { useRef, useContext } from 'react';
import ModalPortal from '../ModalPortal';
import 'uikit/dist/css/uikit.min.css'
import UIkit from 'uikit';
import AuthContext from '../../Authentification/AuthContext';
import AuthService from '../../Authentification/AuthService';
import HttpClient from '../../HttpRequests/HttpClient';

export default function ChangePassword() {
    const oldpasswordInput = useRef();
    const newpasswordInput = useRef();
    const renewpasswordInput = useRef();
    const isLogin = useContext(AuthContext).isLogin;
    const httpClient = new HttpClient();

    function checkForm() {
        let isValid = true;
        let errors_messages = [];

        document.querySelectorAll("#password_form input").forEach(input => {
            if (!input.value) {
                errors_messages.push(input.name + " is missing.");
                isValid = false;
            }
        });

        if (newpasswordInput.current.value !== renewpasswordInput.current.value) {
            errors_messages.push("New password and new re-password are not the same.");
            isValid = false;
        }

        if (!isValid) {
            let html_return = "<ul>";
            errors_messages.forEach(error => {
                html_return += "<li>" + error + "</li>"
            })
            html_return += "</ul>";

            UIkit.notification({
                message: html_return,
                status: 'danger',
                pos: 'top-right',
                timeout: 5000
            });
        }

        return isValid;
    }


    function handleSubmit(event) {
        event.preventDefault();

        if (!isLogin) {
            return false;
        }

        if (!checkForm()) {
            return false;
        }

        httpClient.post('users/' + AuthService.getCurrentUser().user_id + '/password', {
            old_password: oldpasswordInput.current.value,
            new_password: newpasswordInput.current.value,
        }).then(response => {
            return response.json().then(data => {
                if (response.ok) {
                    UIkit.modal("#change_password").hide();
                }

                UIkit.notification({
                    message: data.message,
                    status: (response.ok) ? 'success' : 'danger',
                    pos: 'top-right',
                    timeout: 5000
                });
                return true;
            });
        });
    }

    return (
        <ModalPortal id="change_password">
            <div className="uk-modal-dialog">
                <button className="uk-modal-close-default" type="button" data-uk-close></button>
                <form id="password_form" onSubmit={(event) => {handleSubmit(event)}}>
                    <div className="uk-modal-header">
                        <h2 className="uk-modal-title">Change password</h2>
                    </div>
                    <div className="uk-modal-body">
                        <label htmlFor="password">Old password</label>
                        <input name="Old password" className="uk-input" type="password" id="old_password" ref={ oldpasswordInput } />
                        <label htmlFor="password">New password</label>
                        <input name="New password" className="uk-input" type="password" id="new_password" ref={ newpasswordInput } />
                        <label htmlFor="repassword">New re-password</label>
                        <input name="New re-password" className="uk-input" type="password" id="new_repassword" ref={ renewpasswordInput } />
                    </div>
                    <div className="uk-modal-footer uk-text-right">
                        <button className="uk-button uk-modal-close uk-margin-small-right cancel" type="button">Cancel</button>
                        <button className="uk-button submit" type="submit">Change</button>
                    </div>
                </form>
            </div>
        </ModalPortal>
    );
}
