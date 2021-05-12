import React, { Component } from 'react';
import 'uikit/dist/css/uikit.min.css'

export default class SignIn extends Component {
    emailInput = React.createRef();
    passwordInput = React.createRef();

    handleSubmit(event) {
        event.preventDefault();
        const email = this.emailInput.current.value;
        const password = this.passwordInput.current.value;

        if (!email) {
            return;
        }

        if (!password) {
            return;
        }

        fetch(`http://localhost:8080/api/signin`, {
            method: 'POST', body: JSON.stringify({
                email, password
            })
        });
    }

    render() {
        return (
            <div className="uk-container uk-container-xsmall">
				<header>
					<h1 className="uk-text-center">Sign IN</h1>
				</header>
                <form onSubmit={event => this.handleSubmit(event)}>
                    <label htmlFor="email">E-mail</label>
                    <input className="uk-input" type="email" id="email" ref={ this.emailInput } />
                    <label htmlFor="password">Password</label>
                    <input className="uk-input" type="password" id="password" ref={ this.passwordInput } />
                    <button className="uk-button uk-button-primary uk-width-1-1" type="submit">Sign in</button>
                </form>
            </div>
        );
    }
}
