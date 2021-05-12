import { Switch, Route } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';

export default function Navigator() {
	return <Switch>
			<Route path="/signup"><SignUp/></Route>
			<Route path="/signin"><SignIn/></Route>
	</Switch>;
}
