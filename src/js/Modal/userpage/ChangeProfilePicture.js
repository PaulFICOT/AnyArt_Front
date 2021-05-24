import React, { useRef, useContext } from 'react';
import ModalPortal from '../ModalPortal';
import 'uikit/dist/css/uikit.min.css';
import AuthContext from '../../Authentification/AuthContext';
import UploadAreaProfilePicture from '../../Component/UploadAreaProfilePicture';
import Thumbnail from '../../Component/Thumbnail';
import UIkit from 'uikit';
import ImageRequests from '../../HttpRequests/ImageRequest';
import AuthService from '../../Authentification/AuthService';

export default function ChangePassword({ setUser }) {
    const profile_picture = useRef(null);
    let file_upload = null;
    const contextAuth = useContext(AuthContext);

    function setFile(file) {
        file_upload = file;
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!contextAuth.isLogin) {
            return false;
        }

        if (!file_upload) {
            UIkit.notification({
                message: 'Profile picture is missing.',
                status: 'danger',
                pos: 'top-right',
                timeout: 5000
            });
        }

        const loggedUser = AuthService.getCurrentUser();
        ImageRequests.upload(
			{ user_id: loggedUser.user_id },
			[file_upload]
		).then(response => {
            return response.json().then(data => {
                if (response.ok) {
                    contextAuth.setRefreshNav(!contextAuth.refreshNav);
                    setUser(data.user_profile);
                    AuthService.setCurrentUser(data.user);
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
        <ModalPortal id="change_picture">
            <div className="uk-modal-dialog">
                <button className="uk-modal-close-default" type="button" data-uk-close></button>
                <form id="picture_form" onSubmit={(event) => {handleSubmit(event)}}>
                    <div className="uk-modal-header">
                        <h2 className="uk-modal-title">Change profile picture</h2>
                    </div>
                    <div className="uk-modal-body">
                        <UploadAreaProfilePicture
							img={profile_picture}
							setFile={setFile}
						/>
                        <span>Preview :</span>
                        <div className="preview">
                            <Thumbnail width="200px" height="200px" reference={profile_picture} rounded />
                        </div>
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
