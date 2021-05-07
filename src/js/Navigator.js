import { Switch, Route } from 'react-router-dom';
import SignUp from './SignUp';

export default function Navigator() {
	return <Switch>
			<Route path="/signup"><SignUp/></Route>
	</Switch>;
}
