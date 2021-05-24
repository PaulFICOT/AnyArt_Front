import React, { useRef, useState, useEffect, useContext } from 'react';
import ModalPortal from './ModalPortal';
import 'uikit/dist/css/uikit.min.css'
import UIkit from 'uikit';
import AuthContext from './Authentification/AuthContext';
import AuthService from './Authentification/AuthService';
import CountriesRequest from './HttpRequests/CountriesRequests';
import HttpClient from './HttpRequests/HttpClient';

export default function ChangeInformation({ setUser, user }) {
    const [countries, setCountries] = useState([]);
    const lastnameInput = useRef();
    const firstnameInput = useRef();
    const usernameInput = useRef();
    const emailInput = useRef();
    const birthdateInput = useRef();
    const descInput = useRef();
    const countryInput = useRef();
    const donationLinkInput = useRef();
    const isLogin = useContext(AuthContext).isLogin;
    const httpClient = new HttpClient();

    useEffect(getCountries, [setCountries, user, isLogin]);

    function getCountries() {
        let mounted = true;
        CountriesRequest.getAll().then(countries => {
            if (mounted) {
                setCountries(countries)
            }
        });

        return () => mounted = false;
    }

    function checkForm() {
        let isValid = true;
        let errors_messages = [];

        document.querySelectorAll("#information_form input[class~='required']").forEach(input => {
            if (!input.value) {
                errors_messages.push(input.name + " is missing.");
                isValid = false;
            }
        });

        document.querySelectorAll("#information_form select[class~='required']").forEach(select => {
            if (!select.value) {
                errors_messages.push(select.name + " is missing.");
                isValid = false;
            }
        });

        if (!checkAge(document.querySelector("input[id=birthdate]"))) {
            errors_messages.push("You must be at least 18 years old.");
            isValid = false;
        }

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

    function checkAge(input) {
        let age = Math.abs(new Date(Date.now() - new Date(input.value).getTime()).getUTCFullYear() - 1970);
        if (age < 18) {
            return false;
        }

        return true;
    }


    function handleSubmit(event) {
        event.preventDefault();

        if (!isLogin) {
            return false;
        }

        if (!checkForm()) {
            return false;
        }

        httpClient.post('users/' + AuthService.getCurrentUser().user_id, {
            lastname: lastnameInput.current.value,
            firstname: firstnameInput.current.value,
            email: emailInput.current.value,
            birthdate: birthdateInput.current.value,
            username: usernameInput.current.value,
            description: descInput.current.value,
            country: countryInput.current.value,
            donation_link: donationLinkInput.current.value,
        }).then(response => {
            return response.json().then(data => {
                if (response.ok) {
                    setUser(data.user_profile);
                    AuthService.setCurrentUser(data.user);
                }

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

    function setDefaultValue(field) {
        if (!isLogin) {
            return "";
        }
        return AuthService.getCurrentUser()[field];
    }

    return (
        <ModalPortal id="change_information">
            <div className="uk-modal-dialog">
                <button className="uk-modal-close-default" type="button" data-uk-close></button>
                <form id="information_form" onSubmit={(event) => {handleSubmit(event)}}>
                    <div className="uk-modal-header">
                        <h2 className="uk-modal-title">Change information</h2>
                    </div>
                    <div className="uk-modal-body">
                        <label htmlFor="firstname">Firstname</label>
                        <input name="Firstname" className="uk-input required" type="text" id="firstname" ref={ firstnameInput } defaultValue={ setDefaultValue('firstname') } />
                        <label htmlFor="lastname">Lastname</label>
                        <input name="Lastname" className="uk-input required" type="text" id="lastname" ref={ lastnameInput } defaultValue={ setDefaultValue('lastname') }/>

                        <label htmlFor="countries-select">Country</label>
                        <select
                            name="Countries"
                            id="countries-select"
                            className="uk-select required"
                            ref={ countryInput }
                            defaultValue={ setDefaultValue('country_id') }
                        >
                            <option value="">--Please choose a country--</option>
                            {countries.map(country => (
                                <option key={country.country_id} value={country.country_id}>{country.country}</option>
                            ))}
                        </select>

                        <label htmlFor="username">Username</label>
                        <input name="Username" className="uk-input required" type="text" id="username" ref={ usernameInput } defaultValue={ setDefaultValue('username') }/>
                        <label htmlFor="email">E-mail</label>
                        <input name="E-mail" className="uk-input required" type="mail" id="email" ref={ emailInput } defaultValue={ setDefaultValue('mail') } />
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            rows="4"
                            ref={ descInput }
                            className="uk-textarea required"
                            name="Description"
                            defaultValue={ setDefaultValue('profile_desc') }
                        ></textarea>
                        <label htmlFor="birthdate">Birthdate</label>
                        <input name="Birthdate" className="uk-input required" type="date" id="birthdate" ref={ birthdateInput }  defaultValue={ setDefaultValue('birth_date') } />
                        <label htmlFor="donation">Paypal ID</label>
                        <input name="Donation" className="uk-input" type="text" id="donation" ref={ donationLinkInput } defaultValue={ setDefaultValue('donation_link') }/>
                        <span>Fill this field to display a donation button in your profile</span>
                    </div>
                    <div className="uk-modal-footer uk-text-right">
                        <button className="uk-button uk-modal-close uk-margin-small-right cancel" type="button">Cancel</button>
                        <button className="uk-button submit" type="submit">Change</button>
                    </div>
                </form>
            </div>
        </ModalPortal>
    );
}
