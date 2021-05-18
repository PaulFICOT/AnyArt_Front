import { Switch, Route } from 'react-router-dom';
import Creation from './Creation';
import Home from './Home';

export default function Navigator() {
	return (
		<Switch>
			<Route path="/creation"><Creation /></Route>
			<Route path="/"><Home /></Route>
		</Switch>
	);
}
