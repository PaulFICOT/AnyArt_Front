import Logo from './Logo';
import Thumbnail from './Thumbnail';
import { Link, NavLink } from 'react-router-dom';
import 'src/css/Navigation.css';

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
							<input className="uk-input uk-form-width-small" type="text" placeholder="Input"/>
							<button className="uk-button uk-button-default">Button</button>
						</form>
					</li>
					<li className="uk-navbar-item">
						<Link to="/add" style={{ textDecoration: 'none' }}>
							<button className="uk-button uk-button-default">Post</button>
						</Link>
					</li>
					<li>
						<div className="uk-width-small avatar uk-margin-small-right uk-logo">
							<Thumbnail src={'images/user_avatar.png'} rounded/>
						</div>
					</li>
				</ul>
			</div>
		</nav>
	);
}
