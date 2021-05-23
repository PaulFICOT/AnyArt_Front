import React, { useRef, useContext } from 'react';
import ModalPortal from './ModalPortal';
import 'uikit/dist/css/uikit.min.css'
import AuthContext from './Authentification/AuthContext'

export default function ChangePassword() {
    const profilePictureInput = useRef();
    const isLogin = useContext(AuthContext).isLogin;

    function handleSubmit(event) {
        event.preventDefault();

        if (!isLogin) {
            return false;
        }

        console.log(profilePictureInput);
    }

    return (
        <ModalPortal id="change_picture">
            <div className="uk-modal-dialog">
                <button className="uk-modal-close-default" type="button" data-uk-close></button>
                <form id="picture_form" onSubmit={(event) => {handleSubmit(event)}}>
                    <div className="uk-modal-header">
                        <h2 className="uk-modal-title">Change profile picture</h2>
                    </div>
                    <div className="uk-modal-body">
                        <label htmlFor="picture">Profile picture</label>
                        <input name="Profile picture" className="uk-input" type="file" id="picture" ref={ profilePictureInput } />
                        <button class="uk-button uk-button-default" type="button" tabindex="-1">Select</button>
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
