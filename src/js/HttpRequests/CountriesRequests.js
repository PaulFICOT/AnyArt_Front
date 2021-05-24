import HttpClient from './HttpClient';

const httpClient = new HttpClient();

/**
 * Class that allows to get countries information
 */
export default class CountriesRequest {
	/**
	 * Get all countries
	 */
	static getAll() {
		return httpClient.get('countries');
	}
}
