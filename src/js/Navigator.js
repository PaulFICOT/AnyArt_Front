import { Switch, Route, Redirect } from 'react-router-dom';
import Post from './Post';
import Profil from './Profil';
import Home from './Home';
import Upload from './Upload';
import AuthContext from './Authentification/AuthContext';
import { useContext } from 'react';

/**
 * Component that defines all routes with their component to display
 */
export default function Navigator() {
	const loginContext = useContext(AuthContext);
	return (
		<Switch>
			<Route path="/post/:postId">
				<Post />
			</Route>
			<Route path="/upload">
				{loginContext.isLogin ? <Upload /> : <Redirect to="/" />}
			</Route>
			<Route path="/profils/:id">
				<Profil />
			</Route>
			<Route path="/">
				<Home />
			</Route>
		</Switch>
	);
}
