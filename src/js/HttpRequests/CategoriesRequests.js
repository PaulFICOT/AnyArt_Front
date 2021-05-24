import HttpClient from './HttpClient';

const httpClient = new HttpClient();

export default class CategoriesRequests {
	static getAll() {
		return httpClient.get('categories');
	}
}
