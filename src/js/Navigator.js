import { Switch, Route } from 'react-router-dom';

import Post from './Post';
import Home from './Home';

export default function Navigator() {
	return (
		<Switch>
			<Route path="/post">
				<Post postId="1" />
			</Route>
			<Route path="/">
				<Home />
			</Route>
		</Switch>
	);
}
