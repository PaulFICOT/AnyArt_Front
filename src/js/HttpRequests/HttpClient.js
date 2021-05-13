const { REACT_APP_BACKEND_DOMAIN, REACT_APP_BACKEND_PORT } = process.env;

export default class HttpClient {
	#baseUrl;

	constructor() {
		this.#baseUrl = `http://${REACT_APP_BACKEND_DOMAIN}:${REACT_APP_BACKEND_PORT}/api`;
	}

	buildUrl(route) {
		return this.#baseUrl + (route.charAt(0) === '/' ? '' : '/') + route;
	}

	get(route, params) {
		const url = new URL(this.buildUrl(route));
		url.search = new URLSearchParams(params).toString();
		return fetch(url.toString(), {}).then(response => response.json());
	}

	post(route, params) {
		const url = new URL(route, this.#baseUrl);
		return fetch(url.toString(), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(params),
		});
	}
}
