import AuthService from '../Authentification/AuthService';
const { REACT_APP_BACKEND_DOMAIN, REACT_APP_BACKEND_PORT } = process.env;

export default class HttpClient {
	#baseUrl;

	constructor(route = '', useApi = true) {
		this.#baseUrl = `http://${REACT_APP_BACKEND_DOMAIN}:${REACT_APP_BACKEND_PORT}${
			useApi ? '/api' : ''
		}${route !== '' ? `/${route}` : ''}`;
	}

	buildUrl(route) {
		return this.#baseUrl + (route.charAt(0) === '/' ? '' : '/') + route;
	}

	get(route, params) {
		const url = new URL(this.buildUrl(route));
		url.search = new URLSearchParams(params).toString();
		return fetch(url.toString(), {}).then(response => response.json());
	}

	post(route, params, secured) {
		const url = new URL(this.buildUrl(route));
		return fetch(url.toString(), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: secured ? AuthService.getCurrentToken() : '',
			},
			body: JSON.stringify(params),
		});
	}

	upload(route, params, files) {
		const url = new URL(this.buildUrl(route));
		const formData = new FormData();
		formData.append('data', JSON.stringify(params));
		files.forEach((x, i) => formData.append(i, x));

		return fetch(url.toString(), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
			},
			body: formData,
		});
	}

	delete(route) {
		const url = new URL(this.buildUrl(route));
		return fetch(url.toString(), {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
			},
		});
	}

	static imageUrl(imageId) {
		return `http://${REACT_APP_BACKEND_DOMAIN}:${REACT_APP_BACKEND_PORT}/image/${imageId}`;
	}
}
