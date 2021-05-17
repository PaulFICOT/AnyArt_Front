import React, { useContext } from 'react';
import AuthService from "./Authentification/AuthService";
import ModalPortal from './ModalPortal';
import 'uikit/dist/css/uikit.min.css'
import UIkit from 'uikit';
import AuthContext from './Authentification/AuthContext';

export default function LogOut() {
    const loginContext = useContext(AuthContext);

    function handleButton(event) {
        event.preventDefault();
        AuthService.logout();
        UIkit.modal('#logout').hide();
        loginContext.setLogin(false);
    }

    return (
        <ModalPortal id="logout">
            <div className="uk-modal-dialog">
                <button className="uk-modal-close-default" type="button" data-uk-close></button>
                <div className="uk-modal-header">
                    <h2 className="uk-modal-title">Log OUT</h2>
                </div>
                <div className="uk-modal-body">
                    <p>Are you sure you want to log out ?</p>
                </div>
                <div className="uk-modal-footer uk-text-right">
                    <button className="uk-button uk-modal-close uk-margin-small-right cancel" type="button">Cancel</button>
                    <button className="uk-button submit" type="submit" onClick={(event) => {handleButton(event)}}>Log out</button>
                </div>
            </div>
        </ModalPortal>
    );
}
