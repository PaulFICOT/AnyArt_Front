import 'src/css/Navigation.css';
import { Link } from 'react-router-dom';
import Thumbnail from './Thumbnail';
import Logo from './Logo';
import SignIn from './SignIn';
import SignUp from './SignUp';
import LogOut from './LogOut';
import AuthComponent from './Authentification/AuthComponent';
import React from 'react';

export default function Navigation() {
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
								placeholder="Type here..."
							/>
							<button className="uk-button uk-button-default">Search</button>
						</form>
					</li>
					<AuthComponent login="true">
						<li className="uk-navbar-item">
							<Link to="/add" style={{ textDecoration: 'none' }}>
								<button className="uk-button uk-button-default">Post</button>
							</Link>
						</li>
						<li className="uk-navbar-item">
							<div className="bell"><i className="fas fa-bell"></i></div>
						</li>
					</AuthComponent>
					<li>
						<div className="uk-width-small avatar uk-margin-small-right uk-logo">
							<Thumbnail src={'2LowviVHZ-E'} rounded />
							<div data-uk-dropdown="mode:click">
								<ul className="uk-nav uk-dropdown-nav">
									<AuthComponent login="true">
										<li><a href="#logout" uk-toggle="target: #logout">Logout</a></li>
										<LogOut />
									</AuthComponent>
									<AuthComponent login="false">
										<li><a href="#signin" uk-toggle="target: #signin">Login</a></li>
										<SignIn />
										<li><a href="#signup" uk-toggle="target: #signup">Register</a></li>
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
