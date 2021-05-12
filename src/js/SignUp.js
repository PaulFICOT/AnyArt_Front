import { Component } from 'react';
import 'uikit/dist/css/uikit.min.css'

export default class SignUp extends Component {
    state = {
        user: {
            firstName: '',
            lastName: '',
            country: '',
            birthDate: '',
            description: '',
            email: '',
            username: '',
            password: '',
            repassword: '',
        },
        countries: [],
    }

    componentDidMount() {
		this.getCountries();
	}

    getCountries() {
        return fetch('http://localhost:8080/api/countries')
            .then(response => response.json())
            .then(countries => this.setState({ countries }));
    }

    checkForm() {
        let isValid = true;

        document.querySelectorAll("input").forEach(input => {
            if (!input.value) {
                isValid = false;
                this.setValidationInput(input, false);
            }
        })

        document.querySelectorAll("select").forEach(select => {
            if (!select.value) {
                isValid = false;
                this.setValidationInput(select, false);
            }
        })

        if (this.state.password !== this.state.repassword) {
            this.setValidationInput(document.querySelector("input[id=repassword]"), false);
            isValid = false;
        }

        return isValid && this.checkAge(document.querySelector("input[id=birthdate]"));
    }

    checkAge(input) {
        let age = Math.abs(new Date(Date.now() - new Date(input.value).getTime()).getUTCFullYear() - 1970);
        if (age < 18) {
            this.setValidationInput(input, false);
            return false;
        }

        return true;
    }

    checkEmail(input) {
        if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(input.value)) {
            this.setValidationInput(input, false)
            return false;
        }

        return true;
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!this.checkForm()) {
            return false;
        }

        fetch(`http://localhost:8080/api/users`, {
            method: 'POST', body: JSON.stringify(this.state.user)
        });
    }

    setValidationInput(input, isValid) {
        if (isValid) {
            input.classList.remove("uk-form-danger");
            input.classList.add("uk-form-success");
        } else {
            input.classList.remove("uk-form-success");
            input.classList.add("uk-form-danger");
        }
    }

    checkEmptyInput(input) {
        this.setValidationInput(input, input.value !== "");
    }

    handleFirstNameChange(event) {
        this.checkEmptyInput(event.target);
        this.setState({ user: { ...this.state.user, firstName: event.target.value } });
    }

    handleLastNameChange(event) {
        this.checkEmptyInput(event.target);
        this.setState({ user: { ...this.state.user, lastName: event.target.value } });
    }

    handleCountryChange(event) {
        this.checkEmptyInput(event.target);
        this.setState({ user: { ...this.state.user, country: event.target.value } });
    }

    handleUserNameChange(event) {
        this.checkEmptyInput(event.target);
        this.setState({ user: { ...this.state.user, username: event.target.value } });
    }

    handleEmailChange(event) {
        this.checkEmptyInput(event.target);
        this.checkEmail(event.target);
        this.setState({ user: { ...this.state.user, email: event.target.value } });
    }

    handleDescriptionChange(event) {
        this.checkEmptyInput(event.target);
        this.setState({ user: { ...this.state.user, description: event.target.value } });
    }

    handleBirthDateChange(event) {
        this.checkEmptyInput(event.target);
        this.checkAge(event.target);
        this.setState({ user: { ...this.state.user, birthDate: event.target.value } });
    }

    handlePasswordChange(event) {
        this.checkEmptyInput(event.target);
        this.setState({ user: { ...this.state.user, password: event.target.value } });
    }

    handleRePasswordChange(event) {
        this.checkEmptyInput(event.target);
        this.setState({ user: { ...this.state.user, repassword: event.target.value } });
    }

	render() {
		return (
			<div className="uk-container uk-container-xsmall">
				<header>
					<h1 className="uk-text-center">Sign UP</h1>
				</header>
                <form onSubmit={event =>this.handleSubmit(event)}>
                    <label htmlFor="firstname">Firstname</label>
                    <input className="uk-input" type="text" id="firstname" onChange={e =>this.handleFirstNameChange(e)} value={this.state.user.birthDatefirstName} />
                    <label htmlFor="lastname">Lastname</label>
                    <input className="uk-input" type="text" id="lastname" onChange={e =>this.handleLastNameChange(e)} value={this.state.user.lastName} />

                    <label htmlFor="countries-select">Country</label>
                    <select
                        name="countries"
                        id="countries-select"
                        className="uk-select"
                        value={this.state.user.country}
                        onChange={e =>this.handleCountryChange(e)}
                    >
                        <option value="">--Please choose a country--</option>
                        {this.state.countries.map(country => (
                            <option key={country.country_id} value={country.country_id}>{country.country}</option>
					    ))}
                    </select>

                    <label htmlFor="username">Username</label>
                    <input className="uk-input" type="text" id="username" onChange={e =>this.handleUserNameChange(e)} value={this.state.user.username} />
                    <label htmlFor="email">E-mail</label>
                    <input className="uk-input" type="email" id="email" onChange={e =>this.handleEmailChange(e)} value={this.state.user.email} />
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        rows="4"
                        onChange={e =>this.handleDescriptionChange(e)}
                        value={this.state.user.description}
                        className="uk-textarea"
				    ></textarea>
                    <label htmlFor="birthdate">Birthdate</label>
                    <input className="uk-input" type="date" id="birthdate" onChange={e =>this.handleBirthDateChange(e)} value={this.state.user.birthDate}  />
                    <label htmlFor="password">Password</label>
                    <input className="uk-input" type="password" id="password" onChange={e =>this.handlePasswordChange(e)} value={this.state.user.password} />
                    <label htmlFor="repassword">Re-password</label>
                    <input className="uk-input" type="password" id="repassword" onChange={e =>this.handleRePasswordChange(e)} value={this.state.user.repassword} />
                    <button className="uk-button uk-button-primary uk-width-1-1" type="submit">Register</button>
                </form>
			</div>
		);
	}
}
