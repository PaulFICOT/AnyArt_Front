import { Switch, Route } from 'react-router-dom';

import Creation from './Creation';

export default function Navigator() {
	return (
		<Switch>
			<Route>
				<Creation />
			</Route>
		</Switch>
	);
}
