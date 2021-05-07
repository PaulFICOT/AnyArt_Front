import { Switch, Route } from 'react-router-dom';

import Viewer from './Viewer';

export default function Navigator() {
	return (
		<Switch>
			<Route>
				<Viewer />
			</Route>
		</Switch>
	);
}
