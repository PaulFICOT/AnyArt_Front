import { BrowserRouter } from 'react-router-dom';

import Navigation from './Navigation';
import Navigator from './Navigator';

/**
 * The main component
 */
function App() {
	return (
		<BrowserRouter>
			<Navigation />
			<Navigator />
		</BrowserRouter>
	);
}

export default App;
