import { Switch, Route } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';

import Creation from './Creation';
import Home from './Home';

export default function Navigator() {
	return (
		<Switch>
			<Route path="/signup"><SignUp/></Route>
			<Route path="/signin"><SignIn/></Route>
			<Route path="/creation"><Creation /></Route>
			<Route path="/"><Home /></Route>
		</Switch>
	);
}
