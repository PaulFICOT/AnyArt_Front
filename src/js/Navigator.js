import { Switch, Route } from 'react-router-dom';

import Post from './Post';
import Home from './Home';
import Upload from './Upload';

export default function Navigator() {
	return (
		<Switch>
			<Route path="/post">
				<Post postId="1" />
			</Route>
			<Route path="/upload">
				<Upload />
			</Route>
			<Route path="/">
				<Home />
			</Route>
		</Switch>
	);
}
