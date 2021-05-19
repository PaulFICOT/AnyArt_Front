import AuthService from "./js/Authentification/AuthService";
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/css/uikit-core.min.css';
import 'uikit/dist/js/uikit.min.js';
import '@fortawesome/fontawesome-free/js/all';
import reportWebVitals from './js/reportWebVitals';
import App from './js/App';
import AuthContext from './js/Authentification/AuthContext';
import './css/index.css';

const AppWrapper = () => {
	const [isLogin, setLogin] = useState(false);

	if (AuthService.getCurrentUser() != null) {
		AuthService.verifToken().then(response => {
			setLogin(response);
		});
	}


	return (
		<AuthContext.Provider value={{ isLogin, setLogin }}>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</AuthContext.Provider>
	)
}

ReactDOM.render(
	<AppWrapper />,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
