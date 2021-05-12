import Logo from './Logo';
import { Link, NavLink } from 'react-router-dom';

export default function Navigation() {
	return (
		<div>
			<Link to="/" style={{ textDecoration: 'none' }}>
				<Logo />
			</Link>
		</div>
	);
}
