import 'src/css/Navigation.css';
import { Link } from 'react-router-dom';
import Thumbnail from './Component/Thumbnail';
import Logo from './Logo';
import SignIn from './SignIn';
import SignUp from './SignUp';
import LogOut from './LogOut';
import AuthComponent from './Authentification/AuthComponent';
import AuthService from './Authentification/AuthService';
import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HttpClient from './HttpRequests/HttpClient';
import AuthContext from './Authentification/AuthContext';

export default function Navigation() {
	const [user, setUser] = useState([]);
	const contextAuth = useContext(AuthContext);

	function getDataUser() {
		if (contextAuth.isLogin) {
			setUser(AuthService.getCurrentUser());
		}
    }

	useEffect(getDataUser, [setUser, contextAuth.refreshNav, contextAuth.isLogin]);

	return (
		<nav className="navigation" data-uk-navbar>
			<div className="uk-navbar-left">
				<ul className="uk-navbar-nav">
					<li>
						<Link to="/" style={{ textDecoration: 'none' }}>
							<Logo />
						</Link>
					</li>
				</ul>
			</div>

			<div className="uk-navbar-right">
				<ul className="uk-navbar-nav">
					<li className="uk-navbar-item">
						<form>
							<input
								className="uk-input uk-form-width-small"
								type="text"
								placeholder="Input"
							/>
							<button className="uk-button uk-button-default">Button</button>
						</form>
					</li>
					<AuthComponent login="true">
						<li className="uk-navbar-item">
							<Link to="/upload" style={{ textDecoration: 'none' }}>
								<button className="uk-button uk-button-default">Post</button>
							</Link>
						</li>
						<li className="uk-navbar-item">
							<div className="bell">
								<FontAwesomeIcon icon="bell" />
							</div>
						</li>
					</AuthComponent>
					<li>
						<div className="uk-width-small avatar uk-margin-small-right uk-logo">
							<Thumbnail
								src={(user.profile_pic && contextAuth.isLogin) ? HttpClient.imageUrl(user.profile_pic) : '/images/user_avatar.png'}
								rounded
								version={Math.random()}
							/>
							<div data-uk-dropdown="mode:click">
								<ul className="uk-nav uk-dropdown-nav">
									<AuthComponent login="true">
										<li>
											<Link to={`/profils/${user.user_id}`} style={{ textDecoration: 'none' }}>
												Profil
											</Link>
										</li>
										<li>
											<a href="#logout" uk-toggle="target: #logout">
												Logout
											</a>
										</li>
										<LogOut />
									</AuthComponent>
									<AuthComponent login="false">
										<li>
											<a href="#signin" uk-toggle="target: #signin">
												Login
											</a>
										</li>
										<SignIn />
										<li>
											<a href="#signup" uk-toggle="target: #signup">
												Register
											</a>
										</li>
										<SignUp />
									</AuthComponent>
								</ul>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</nav>
	);
}
