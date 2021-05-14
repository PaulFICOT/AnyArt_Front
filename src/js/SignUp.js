import ModalPortal from './ModalPortal';
import React, { useState, useEffect, useRef } from 'react';
import 'uikit/dist/css/uikit.min.css'

export default function SignUp() {
    const [countries, setCountries] = useState([]);
    const userInput = useRef();

    useEffect(getCountries, [setCountries]);

    function getCountries() {
        return fetch('http://localhost:8080/api/countries')
            .then(response => response.json())
            .then(countries => setCountries(countries));
    }

    function checkForm() {
        let isValid = true;

        document.querySelectorAll("input").forEach(input => {
            if (!input.value) {
                isValid = false;
                setValidationInput(input, false);
            }
        })

        document.querySelectorAll("select").forEach(select => {
            if (!select.value) {
                isValid = false;
                setValidationInput(select, false);
            }
        })

        if (userInput.password !== userInput.repassword) {
            setValidationInput(document.querySelector("input[id=repassword]"), false);
            isValid = false;
        }

        if (!checkEmail(userInput.email)) {
            isValid = false;
        }

        return isValid && checkAge(document.querySelector("input[id=birthdate]"));
    }

    function checkAge(input) {
        let age = Math.abs(new Date(Date.now() - new Date(input.value).getTime()).getUTCFullYear() - 1970);
        if (age < 18) {
            setValidationInput(input, false);
            return false;
        }

        return true;
    }

    function checkEmail(input) {
        if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(input.value)) {
            setValidationInput(input, false)
            return false;
        }

        return true;
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!checkForm()) {
            return false;
        }

        fetch(`http://localhost:8080/api/users`, {
            method: 'POST', body: JSON.stringify(userInput)
        });
    }

    function setValidationInput(input, isValid) {
        if (isValid) {
            input.classList.remove("uk-form-danger");
            input.classList.add("uk-form-success");
        } else {
            input.classList.remove("uk-form-success");
            input.classList.add("uk-form-danger");
        }
    }

    return (
        <ModalPortal id="signup">
            <div className="uk-modal-dialog">
                <button className="uk-modal-close-default" type="button" data-uk-close></button>
                <div className="uk-modal-header">
                    <h2 className="uk-modal-title">Sign UP</h2>
                </div>
                <div className="uk-modal-body">
                <form onSubmit={event =>handleSubmit(event)}>
                    <label htmlFor="firstname">Firstname</label>
                    <input className="uk-input" type="text" id="firstname" ref={ userInput.firstname }  />
                    <label htmlFor="lastname">Lastname</label>
                    <input className="uk-input" type="text" id="lastname" ref={ userInput.lastname }  />

                    <label htmlFor="countries-select">Country</label>
                    <select
                        name="countries"
                        id="countries-select"
                        className="uk-select"
                        ref={ userInput.country }
                    >
                        <option value="">--Please choose a country--</option>
                        {countries.map(country => (
                            <option key={country.country_id} value={country.country_id}>{country.country}</option>
                        ))}
                    </select>

                    <label htmlFor="username">Username</label>
                    <input className="uk-input" type="text" id="username" ref={ userInput.username } />
                    <label htmlFor="email">E-mail</label>
                    <input className="uk-input" type="email" id="email" ref={ userInput.email } />
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        rows="4"
                        ref={ userInput.description }
                        className="uk-textarea"
                    ></textarea>
                    <label htmlFor="birthdate">Birthdate</label>
                    <input className="uk-input" type="date" id="birthdate" ref={ userInput.birthdate }  />
                    <label htmlFor="password">Password</label>
                    <input className="uk-input" type="password" id="password" ref={ userInput.password } />
                    <label htmlFor="repassword">Re-password</label>
                    <input className="uk-input" type="password" id="repassword" ref={ userInput.repassword } />
                </form>
                </div>
                <div className="uk-modal-footer uk-text-right">
                    <button className="uk-button uk-modal-close uk-margin-small-right cancel" type="button">Cancel</button>
                    <button className="uk-button submit" type="submit">Register</button>
                </div>
            </div>
        </ModalPortal>
    );
}
