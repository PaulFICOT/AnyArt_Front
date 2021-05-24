import ModalPortal from '../ModalPortal';
import React, { useState, useEffect, useRef } from 'react';
import AuthService from "../../Authentification/AuthService";
import CountriesRequest from '../../HttpRequests/CountriesRequests';
import 'uikit/dist/css/uikit.min.css'
import UIkit from 'uikit';

/**
 * Component that shows a modal to register
 */
export default function SignUp() {
    const [countries, setCountries] = useState([]);
    const firstnameInput = useRef();
    const lastnameInput = useRef();
    const countryInput = useRef();
    const usernameInput = useRef();
    const emailInput = useRef();
    const descInput = useRef();
    const birthdateInput = useRef();
    const passwordInput = useRef();
    const repasswordInput = useRef();

    useEffect(getCountries, [setCountries]);

    /**
     * Get all countries for the form
     */
    function getCountries() {
        let mounted = true;
        CountriesRequest.getAll().then(countries => {
            if (mounted) {
                setCountries(countries);
            }
        });

        return () => mounted = false;
    }

    /**
     * Check if the form is correctly completed
     * @returns True if the form is correct otherwise False
     */
    function checkForm() {
        let isValid = true;
        let errors_messages = [];

        // Check all input
        document.querySelectorAll("#signup_form input").forEach(input => {
            if (!input.value) {
                errors_messages.push(input.name + "is missing.");
                isValid = false;
            }
        })

        // Check all select
        document.querySelectorAll("#signup_form select").forEach(select => {
            if (!select.value) {
                errors_messages.push(select.name + "is missing.");
                isValid = false;
            }
        })

        // Check if the password and the re password are the same
        if (passwordInput.current.value !== repasswordInput.current.value) {
            errors_messages.push("Password and Re-password are not the same.");
            isValid = false;
        }

        // Check if the user is 18 years or older
        if (!checkAge(document.querySelector("input[id=birthdate]"))) {
            errors_messages.push("You must be at least 18 years old.");
            isValid = false;
        }

        // Show all information about the form
        if (!isValid) {
            let html_return = "<ul>";
            errors_messages.forEach(error => {
                html_return += "<li>" + error + "</li>"
            })
            html_return += "</ul>";

            UIkit.notification({
                message: html_return,
                status: 'danger',
                pos: 'top-right',
                timeout: 5000
            });
        }

        return isValid;
    }

    /**
     * Check if the user is 18 years or older
     * @param {*} input Input form
     * @returns True if user age >=18 otherwise False
     */
    function checkAge(input) {
        let age = Math.abs(new Date(Date.now() - new Date(input.value).getTime()).getUTCFullYear() - 1970);
        if (age < 18) {
            return false;
        }

        return true;
    }

    /**
     * Check the form and if everything is correct, register the new user
     */
    function handleSubmit(event) {
        event.preventDefault();

        if (!checkForm()) {
            return false;
        }

        AuthService.register({
            lastName: lastnameInput.current.value,
            firstName: firstnameInput.current.value,
            email: emailInput.current.value,
            password: passwordInput.current.value,
            birthDate: birthdateInput.current.value,
            username: usernameInput.current.value,
            description: descInput.current.value,
            country: countryInput.current.value,
        }).then(response => {
            if (response.ok) {
                UIkit.modal("#signup").hide();
            }
            return response.json().then(data => {
                UIkit.notification({
                    message: data.message,
                    status: (response.ok) ? 'success' : 'danger',
                    pos: 'top-right',
                    timeout: 5000
                });
                return true;
            });
        });
    }

    return (
        <ModalPortal id="signup">
            <div className="uk-modal-dialog">
                <button className="uk-modal-close-default" type="button" data-uk-close></button>
                <form id="signup_form" onSubmit={(event) => {handleSubmit(event)}}>
                    <div className="uk-modal-header">
                        <h2 className="uk-modal-title">Sign UP</h2>
                    </div>
                    <div className="uk-modal-body">
                        <label htmlFor="firstname">Firstname</label>
                        <input name="Firstname" className="uk-input" type="text" id="firstname" ref={ firstnameInput }  />
                        <label htmlFor="lastname">Lastname</label>
                        <input name="Lastname" className="uk-input" type="text" id="lastname" ref={ lastnameInput }  />

                        <label htmlFor="countries-select">Country</label>
                        <select
                            name="Countries"
                            id="countries-select"
                            className="uk-select"
                            ref={ countryInput }
                        >
                            <option value="">--Please choose a country--</option>
                            {countries.map(country => (
                                <option key={country.country_id} value={country.country_id}>{country.country}</option>
                            ))}
                        </select>

                        <label htmlFor="username">Username</label>
                        <input name="Username" className="uk-input" type="text" id="username" ref={ usernameInput } />
                        <label htmlFor="email">E-mail</label>
                        <input name="E-mail" className="uk-input" type="email" id="email" ref={ emailInput } />
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            rows="4"
                            ref={ descInput }
                            className="uk-textarea"
                            name="Description"
                        ></textarea>
                        <label htmlFor="birthdate">Birthdate</label>
                        <input name="Birthdate" className="uk-input" type="date" id="birthdate" ref={ birthdateInput }  />
                        <label htmlFor="password">Password</label>
                        <input name="Password" className="uk-input" type="password" id="password" ref={ passwordInput } />
                        <label htmlFor="repassword">Re-password</label>
                        <input name="Re-password" className="uk-input" type="password" id="repassword" ref={ repasswordInput } />
                    </div>
                    <div className="uk-modal-footer uk-text-right">
                        <button className="uk-button uk-modal-close uk-margin-small-right cancel" type="button">Cancel</button>
                        <button className="uk-button submit" type="submit">Register</button>
                    </div>
                </form>
            </div>
        </ModalPortal>
    );
}
