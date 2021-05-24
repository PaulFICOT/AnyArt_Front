import Thumbnail from './Component/Thumbnail';
import PostList from './PostList';
import AuthService from './Authentification/AuthService';
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Page from './Page';
import HttpClient from './HttpRequests/HttpClient';
import AuthContext from './Authentification/AuthContext';
import ChangeInformation from './ChangeInformation';
import ChangePassword from './ChangePassword';
import ChangeProfilePicture from './ChangeProfilePicture';
import 'src/css/userpage.css';

export default function Profil() {
	const [user, setUser] = useState([]);
    const [posts, setPosts] = useState([]);
    const [isOwnPage, setOwnPage] = useState(false);
    const [isFollowed, setFollowed] = useState(false);
    const { id } = useParams();
    const isLogin = useContext(AuthContext).isLogin;

    function getData() {
        const current_user = AuthService.getCurrentUser() ?? {user_id: -1};
        const httpClient = new HttpClient();
        setOwnPage(current_user.user_id === id);

        if (current_user.user_id !== id) {
            httpClient.get(`users/${id}/${current_user.user_id}`).then(data => {
                setFollowed(data.is_followed);
            });
        } else setFollowed(false);

        httpClient.get(`users/profile/${id}`).then(data => {
            setUser(data.user ?? []);
        });

        httpClient.get(`posts/thumbnails/${id}`).then(data => {
            setPosts(data.thumbnails ?? []);
        });

    };

    useEffect(getData, [setPosts, setUser, setFollowed, id, isLogin, isFollowed])

    function setFollow() {
        const current_user = AuthService.getCurrentUser() ?? {user_id: -1};
        const httpClient = new HttpClient();

        httpClient.post(`users/${id}/${current_user.user_id}`, { mode: (isFollowed) ? 'remove' : 'add' })
        .then(response => response.json())
        .then(data => {
            setFollowed(data.is_followed);
        });
    }

	return (
        <>
            <div className="uk-flex" id="user_profil" data-uk-grid>
                <div className="uk-width-medium uk-margin-medium-left avatar uk-logo">
                    <Thumbnail
                        src={(user.profile_pic) ? HttpClient.imageUrl(user.profile_pic) : ''}
                        rounded
                    />
                </div>
                <div className="uk-flex-middle uk-flex-middle uk-flex">
                    <div>
                        <h2 className='username' >{user.username}</h2>
                        <p className='uk-text-meta'>{user.profile_desc}</p>
                    </div>
                </div>
                <div className='uk-flex uk-flex-bottom uk-flex uk-flex-1 uk-margin-large-bottom counters'>
                    <span className='uk-margin-right'><i className="far fa-thumbs-up uk-margin-small-right"></i>{user.Likes}</span>
                    <span className='uk-margin-right'><i className="far fa-eye uk-margin-small-right"></i>{user.Views ?? "0"}</span>
                    <span className='uk-margin-right'><i className="far fa-user uk-margin-small-right"></i>{user.Followers}</span>
                </div>
                {isLogin && <div className="icons uk-margin-medium-right uk-flex uk-flex-middle">
                    {user.donation_link && <a target="_blank" rel="noreferrer" className="icons_clickable" href={`https://paypal.me/${user.donation_link}`}><i className="fas fa-gift uk-margin-right"></i></a>}
                    {!isOwnPage && <button className="uk-button uk-button-link icons_clickable" key={isFollowed ? 'minus' : 'plus'} onClick={ () => setFollow() } style={{textDecoration: 'none'}}><i className={'fas fa-user-' + (isFollowed ? 'minus' : 'plus') + ' uk-margin-right'} onClick={ () => setFollow() }></i></button>}
                    <a className="icons_clickable" href={`mailto:${user.mail}`}><i className="fas fa-envelope uk-margin-right"></i></a>
                    <div>
                        {isOwnPage && <div><i className="fas fa-cog"></i></div>}
                    </div>
                    <div data-uk-dropdown="mode:click">
                        <ul className="uk-nav uk-dropdown-nav">
                            <li><a href="#change_information" uk-toggle="target: #change_information">Change information</a></li>
                            <ChangeInformation setUser={setUser} user={user} />
                            <li><a href="#change_password" uk-toggle="target: #change_password">Change the password</a></li>
                            <ChangePassword />
                            <li><a href="#change_picture" uk-toggle="target: #change_picture">Change profile picture</a></li>
                            <ChangeProfilePicture setUser={setUser} />
                        </ul>
                    </div>
                </div>}
            </div>
            <Page>
                <PostList posts={posts}/>
            </Page>
        </>
	);
}
