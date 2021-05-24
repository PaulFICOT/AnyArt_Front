import AuthService from '../Authentification/AuthService';
const { REACT_APP_BACKEND_DOMAIN, REACT_APP_BACKEND_PORT } = process.env;

/**
 * Class that allows to make http request for the back-end
 */
export default class HttpClient {
	#baseUrl;

	constructor(route = '', useApi = true) {
		this.#baseUrl = `http://${REACT_APP_BACKEND_DOMAIN}:${REACT_APP_BACKEND_PORT}${
			useApi ? '/api' : ''
		}${route !== '' ? `/${route}` : ''}`;
	}

	/**
	 * Build the api url with the route
	 */
	buildUrl(route) {
		return this.#baseUrl + (route.charAt(0) === '/' ? '' : '/') + route;
	}

	/**
	 * Make get request for the back-end
	 * @param {*} route The route of this request
	 * @param {*} params The parameters of this request
	 * @returns The request
	 */
	get(route, params) {
		const url = new URL(this.buildUrl(route));
		url.search = new URLSearchParams(params).toString();
		return fetch(url.toString(), {}).then(response => response.json());
	}

	/**
	 * Make post request for the back-end
	 * @param {*} route The route of this request
	 * @param {*} params The parameters of this request
	 * @param {*} secured if the request is secured
	 * @returns The request
	 */
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

	/**
	 * Make upload file request for the back-end
	 * @param {*} route The route of this request
	 * @param {*} params The parameters of this request
	 * @param {*} files The files to upload
	 * @returns The request
	 */
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

	/**
	 * Make delete request for the back-end
	 * @param {*} route The route of this request
	 * @returns The request
	 */
	delete(route) {
		const url = new URL(this.buildUrl(route));
		return fetch(url.toString(), {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
			},
		});
	}

	/**
	 * Get the image url by the image Id
	 * @param {*} imageId The id of the image
	 * @returns The url of the image
	 */
	static imageUrl(imageId) {
		return `http://${REACT_APP_BACKEND_DOMAIN}:${REACT_APP_BACKEND_PORT}/image/${imageId}`;
	}
}
