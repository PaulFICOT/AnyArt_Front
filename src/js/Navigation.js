import 'src/css/Navigation.css';
import { Link } from 'react-router-dom';
import Thumbnail from './Component/Thumbnail';
import Logo from './Logo';
import SignIn from './SignIn';
import SignUp from './SignUp';
import LogOut from './LogOut';
import AuthComponent from './Authentification/AuthComponent';
import React, { useState, useEffect, useContext } from 'react';
import Notification from './Component/Notification';
import AuthContext from './Authentification/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HttpClient from './HttpRequests/HttpClient';
import AuthService from './Authentification/AuthService';

export default function Navigation() {
	const [notifs, setNotifs] = useState([]);
	const [notifs_not_seen, setNotifsNotSeen] = useState([]);
	const isLogin = useContext(AuthContext).isLogin;

	function fetchNotifs() {
		if (!isLogin) {
			return;
		}

		let mounted = true;
		const httpClient = new HttpClient();
		const current_user = AuthService.getCurrentUser();
		httpClient.get(`notifications/${current_user.user_id}`).then(response => {
			if (mounted) {
				setNotifs(response.notifications);
				let list_notifs_not_seen = [];
				response.notifications.forEach(notif => {
					if (notif.is_read === "0") {
						list_notifs_not_seen.push(notif);
					}
				});
				setNotifsNotSeen(list_notifs_not_seen);
			}
		});

		return () => (mounted = false);
	}

	useEffect(fetchNotifs, [setNotifs, isLogin]);

	function removeNotifsBadge() {
		if (notifs_not_seen.length === 0) {
			return;
		}

		const httpClient = new HttpClient();
		httpClient.post('notifications', {
			notification_ids: notifs_not_seen.map(notif => notif.id_notification),
		}).then(response => {
			if (response.ok) {
				setNotifsNotSeen([]);
			}
		});
	}

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
							<Link to="/add" style={{ textDecoration: 'none' }}>
								<button className="uk-button uk-button-default">Post</button>
							</Link>
						</li>
						<li className="uk-navbar-item">
							<div className="bell uk-inline" onClick={() => removeNotifsBadge()}>
								<FontAwesomeIcon icon="bell" />
								<div className="uk-overlay uk-position-bottom-left">
									{notifs_not_seen.length !== 0 && <span className="uk-badge uk-label-danger">{notifs_not_seen.length}</span>}
								</div>
							</div>
							<div className="dropdown-notifs" data-uk-dropdown="mode:click">
								<ul className="uk-nav uk-dropdown-nav">
									{notifs.map(notif => (
										<li key={notif.id_notification}>
											<Notification notif={notif} />
										</li>
									))}
								</ul>
							</div>
						</li>
					</AuthComponent>
					<li>
						<div className="uk-width-small avatar uk-logo">
							<Thumbnail src={'2LowviVHZ-E'} rounded />
							<div data-uk-dropdown="mode:click">
								<ul className="uk-nav uk-dropdown-nav">
									<AuthComponent login="true">
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
