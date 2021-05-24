import 'src/css/Navigation.css';
import { Link } from 'react-router-dom';
import Thumbnail from './Component/Thumbnail';
import Logo from './Logo';
import SignIn from './SignIn';
import SignUp from './SignUp';
import LogOut from './LogOut';
import AuthComponent from './Authentification/AuthComponent';
import AuthService from './Authentification/AuthService';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HttpClient from './HttpRequests/HttpClient';

export default function Navigation() {
	const current_user = (AuthService.getCurrentUser()) ? AuthService.getCurrentUser() : { user_id : -1 };
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
								src={(current_user.profile_pic) ? HttpClient.imageUrl(current_user.profile_pic) : ''}
								rounded
							/>
							<div data-uk-dropdown="mode:click">
								<ul className="uk-nav uk-dropdown-nav">
									<AuthComponent login="true">
										<li>
											<Link to={`/profils/${current_user.user_id}`} style={{ textDecoration: 'none' }}>
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
