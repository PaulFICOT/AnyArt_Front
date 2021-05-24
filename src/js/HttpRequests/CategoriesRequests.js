import HttpClient from './HttpClient';

const httpClient = new HttpClient();

/**
 * Class that allows to get categories information
 */
export default class CategoriesRequests {
	/**
	 * Get all categories
	 */
	static getAll() {
		return httpClient.get('categories');
	}
}
