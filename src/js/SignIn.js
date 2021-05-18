import React, { useRef, useContext } from 'react';
import AuthService from "./Authentification/AuthService";
import ModalPortal from './ModalPortal';
import 'uikit/dist/css/uikit.min.css'
import AuthContext from './Authentification/AuthContext';

export default function SignIn() {
    const emailInput = useRef();
    const passwordInput = useRef();
    const loginContext = useContext(AuthContext);

    function handleSubmit(event) {
        event.preventDefault();
        const email = emailInput.current.value;
        const password = passwordInput.current.value;

        if (!email) {
            return;
        }

        if (!password) {
            return;
        }

        AuthService.login(email, password).then(response => {
            loginContext.setLogin(true);
        });
    }

    return (
        <ModalPortal id="signin">
            <div className="uk-modal-dialog">
                <button className="uk-modal-close-default" type="button" data-uk-close></button>
                <form onSubmit={(event) => {handleSubmit(event)}}>
                    <div className="uk-modal-header">
                        <h2 className="uk-modal-title">Sign IN</h2>
                    </div>
                    <div className="uk-modal-body">
                            <label htmlFor="email">E-mail</label>
                            <input className="uk-input" type="email" id="email" ref={ emailInput } />
                            <label htmlFor="password">Password</label>
                            <input className="uk-input" type="password" id="password" ref={ passwordInput } />
                    </div>
                    <div className="uk-modal-footer uk-text-right">
                        <button className="uk-button uk-modal-close uk-margin-small-right cancel" type="button">Cancel</button>
                        <button className="uk-button submit" type="submit">Sign in</button>
                    </div>
                </form>
            </div>
        </ModalPortal>
    );
}
