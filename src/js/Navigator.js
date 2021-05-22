import { Switch, Route } from 'react-router-dom';
import Creation from './Creation';
import Profil from './Profil';
import Home from './Home';

export default function Navigator() {
	return (
		<Switch>
			<Route path="/creation"><Creation /></Route>
			<Route path="/profils/:id"><Profil /></Route>
			<Route path="/"><Home /></Route>
		</Switch>
	);
}
